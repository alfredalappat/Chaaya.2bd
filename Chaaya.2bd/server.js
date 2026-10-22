const ADMIN_KEY = process.env.ADMIN_KEY || 'change-this-key';
const http = require('http'), fs = require('fs'), path = require('path');
const { WebSocketServer } = require('ws');
const { createBot, typingDelay, between } = require('./bot');

const PUB = path.join(__dirname, 'public');
const MIME = { '.html': 'text/html; charset=utf-8', '.txt': 'text/plain', '.xml': 'application/xml', '.svg': 'image/svg+xml', '.js': 'text/javascript', '.css': 'text/css' };
const ROUTES = { '/': 'index.html', '/terms': 'terms.html' };

const server = http.createServer((req, res) => {
  const url = req.url.split('?')[0];
  if (url === '/stats') {
  const key = new URL(req.url, 'http://x').searchParams.get('key');
  if (key !== ADMIN_KEY) { res.writeHead(403); return res.end('Forbidden'); }
  let withBot = 0, withReal = 0;
  clients.forEach(s => { if (s.bot) withBot++; else if (s.partner) withReal++; });
  res.writeHead(200, { 'Content-Type': 'application/json' });
  return res.end(JSON.stringify({
    realUsersConnected: clients.size,
    waitingForMatch: queue.length,
    chattingWithRealPeople: withReal,
    chattingWithBot: withBot,
    shownOnHomeScreen: onlineShown
  }));
}
  const file = path.normalize(path.join(PUB, ROUTES[url] || url));
  if (!file.startsWith(PUB)) { res.writeHead(403); return res.end(); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream', 'X-Content-Type-Options': 'nosniff' });
    res.end(data);
  });
});

const wss = new WebSocketServer({ server, maxPayload: 400 * 1024 });
const clients = new Map(); // ws -> { partner, bot, timers }
let queue = [], onlineShown = between(50, 100);

const send = (ws, o) => ws.readyState === 1 && ws.send(JSON.stringify(o));
const clearTimers = s => { s.timers.forEach(clearTimeout); s.timers = []; };

function leave(ws, notify = true) {
  const s = clients.get(ws); if (!s) return;
  clearTimers(s);
  queue = queue.filter(x => x !== ws);
  const p = s.partner; s.partner = null; s.bot = null;
  if (p) { const ps = clients.get(p); if (ps) { ps.partner = null; if (notify) send(p, { t: 'left' }); } }
}

function join(ws) {
  const s = clients.get(ws); leave(ws);
  const other = queue.shift();
  if (other) {
    clearTimers(clients.get(other));
    s.partner = other; clients.get(other).partner = ws;
    send(ws, { t: 'matched' }); send(other, { t: 'matched' });
    return;
  }
  queue.push(ws);
  send(ws, { t: 'searching' });
  s.timers.push(setTimeout(() => { queue = queue.filter(x => x !== ws); startBot(ws); }, 5000));
}

function say(ws, bot, text, done) {
  const s = clients.get(ws); if (!s) return;
  send(ws, { t: 'typing', on: true });
  s.timers.push(setTimeout(() => {
    if (s.bot !== bot) return;
    send(ws, { t: 'typing', on: false });
    send(ws, { t: 'msg', text });
    done && done();
  }, typingDelay(text)));
}

function startBot(ws) {
  const s = clients.get(ws); if (!s) return;
  const bot = s.bot = createBot();
  send(ws, { t: 'matched' });
  const o = bot.opener();
  if (o) s.timers.push(setTimeout(() => s.bot === bot && say(ws, bot, o), between(800, 2000)));
}

function botRespond(ws, text, isImage) {
  const s = clients.get(ws), bot = s.bot;
  const r = bot.reply(text, isImage);
  s.timers.push(setTimeout(() => {
    if (s.bot !== bot) return;
    say(ws, bot, r.text, () => {
      if (r.leave) s.timers.push(setTimeout(() => { if (s.bot === bot) { s.bot = null; send(ws, { t: 'left' }); } }, between(1500, 3500)));
    });
  }, between(700, 1800)));
}

wss.on('connection', ws => {
  clients.set(ws, { partner: null, bot: null, timers: [] });
  send(ws, { t: 'online', n: onlineShown });
  ws.on('message', raw => {
    let m; try { m = JSON.parse(raw); } catch { return; }
    const s = clients.get(ws);
    if (m.t === 'join') return join(ws);
    if (m.t === 'leave') return leave(ws);
    if (m.t === 'typing' && s.partner) return send(s.partner, { t: 'typing', on: !!m.on });
    if (m.t === 'msg' || m.t === 'img') {
      let out;
      if (m.t === 'msg') { const text = String(m.text || '').slice(0, 500).trim(); if (!text) return; out = { t: 'msg', text }; }
      else {
        const img = String(m.data || '');
        if (!img.startsWith('data:image/jpeg;base64,') || img.length > 300 * 1024) return;
        out = { t: 'img', data: img };
      }
      if (s.partner) send(s.partner, out);
      else if (s.bot) botRespond(ws, out.text || '', m.t === 'img');
    }
  });
  ws.on('close', () => { leave(ws); clients.delete(ws); });
});

// Online counter: random 50-100 + real users, every 5 seconds
setInterval(() => {
  onlineShown = between(50, 100) + clients.size;
  clients.forEach((_, ws) => send(ws, { t: 'online', n: onlineShown }));
}, 5000);

server.listen(process.env.PORT || 3000, () => console.log('Chaaya.2bd running on port ' + (process.env.PORT || 3000)));
