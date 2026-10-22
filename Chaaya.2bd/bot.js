// ===== EDIT THIS FILE to change what the chat partner says =====
// The bot picks messages from these lists at random. Add, remove or edit any line.
const R = a => a[Math.floor(Math.random() * a.length)];
const between = (a, b) => a + Math.floor(Math.random() * (b - a + 1));

// Sometimes sent first when the chat starts
const OPENERS = ["hi", "hello", "hey there", "hii", "hey, how's it going?"];

// Normal replies: one is picked at random each time (no repeats inside a chat)
const MESSAGES = [
  "hey! how are you?",
  "what's up?",
  "so what do you do for fun?",
  "which district are you from?",
  "haha nice",
  "oh really?",
  "seen any good movies lately?",
  "tea or coffee?",
  "what kind of music do you like?",
  "got any plans for the weekend?",
  "same here haha",
  "that's cool",
  "what's the best food you had recently?",
  "do you like travelling?",
  "are you a morning or night person?",
  "lol true",
];

// The last message before the bot leaves
const GOODBYES = ["hey i have to go now, bye!", "someone's calling me, gtg. bye!", "sorry got some work, catch you later"];

function createBot() {
  const bot = { limit: between(3, 4), n: 0, used: new Set() };
  const pick = list => {
    const fresh = list.filter(x => !bot.used.has(x));
    const t = R(fresh.length ? fresh : list);
    bot.used.add(t);
    return t;
  };
  // returns { text, leave }
  bot.reply = () => {
    bot.n++;
    if (bot.n >= bot.limit) return { text: R(GOODBYES), leave: true };
    return { text: pick(MESSAGES), leave: false };
  };
  bot.opener = () => (Math.random() < 0.55 ? R(OPENERS) : null);
  return bot;
}

// typing delay in ms (human-like)
const typingDelay = text => Math.min(1200 + text.length * 70 + Math.random() * 1500, 6500);

module.exports = { createBot, typingDelay, between };
