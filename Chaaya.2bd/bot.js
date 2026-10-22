// ===== EDIT THIS FILE to change what the chat partner says =====
const R = a => a[Math.floor(Math.random() * a.length)];
const between = (a, b) => a + Math.floor(Math.random() * (b - a + 1));

const OPENERS = ["hi", "hello", "hey there", "hii", "hey, how's it going?"];

// [pattern, [possible answers]]  - first matching rule wins
const RULES = [
  [/\b(hi+|hello|hey+|hai|hlo)\b/i, ["hey! how are you?", "hello :) what's up?", "hii, how's your day going?"]],
  [/how are you|how r u|hru|how're you|sukham/i, ["doing good, you?", "pretty good, just chilling. u?", "all good here! how about you?"]],
  [/\b(name|who are you)\b/i, ["call me whatever you like haha, what about you?", "not telling my name so soon :p what's yours?"]],
  [/\b(age|old are you)\b/i, ["i'm 22, you?", "22. u?"]],
  [/where.*(from|live)|from where|location|place|district/i, ["kerala, you?", "kerala only haha, which district are you in?"]],
  [/thrissur|kochi|ernakulam|trivandrum|kozhikode|calicut|kannur|kollam|palakkad|malappuram|alappuzha|kottayam|idukki|wayanad|kasaragod/i, ["nice, i know that area! how's the weather there?", "oh nice, good food in that place right?"]],
  [/study|college|school|course/i, ["studying and working a bit, it's busy. you?", "just finishing up some stuff, what about you?"]],
  [/work|job|office/i, ["working, but it gets boring sometimes haha. you?", "yeah work is work. what do you do?"]],
  [/movie|film|cinema|mollywood/i, ["i watch a lot of malayalam movies, any recent fav?", "any good one you watched recently?"]],
  [/song|music/i, ["mostly malayalam songs, you?", "i like old melodies and some new stuff too"]],
  [/food|biriyani|eat|hungry|lunch|dinner/i, ["biriyani any day, you?", "parotta and beef for me haha"]],
  [/tea|chaya|coffee/i, ["tea of course, it's literally the app name haha", "chaya all the way"]],
  [/bye|gtg|good ?night|see you|cya/i, ["ok bye, take care!", "bye, nice talking to you"]],
  [/thank/i, ["no problem :)", "anytime!"]],
  [/\b(lol|haha+|hehe+|lmao)\b/i, ["haha yeah", "lol true"]],
];

// Asked when nothing above matches
const FALLBACK_QUESTIONS = [
  "so what do you do for fun?", "which district are you from?", "seen any good movies lately?",
  "tea or coffee?", "what kind of music do you like?", "got any plans for the weekend?",
  "what's the best food you had recently?", "do you like travelling?", "are you a morning or night person?",
];
const IMAGE_REPLIES = ["nice pic!", "haha cool, where is this?", "looks good :)"];
const GOODBYES = ["hey i have to go now, bye!", "someone's calling me, gtg. bye!", "sorry got some work, catch you later"];

function createBot() {
  const bot = { limit: between(3, 6), n: 0, used: new Set() };
  const pick = list => {
    const fresh = list.filter(x => !bot.used.has(x));
    const t = R(fresh.length ? fresh : list);
    bot.used.add(t);
    return t;
  };
  // returns { text, leave }
  bot.reply = (text, isImage) => {
    bot.n++;
    if (bot.n >= bot.limit) return { text: R(GOODBYES), leave: true };
    if (isImage) return { text: pick(IMAGE_REPLIES), leave: false };
    for (const [re, answers] of RULES) if (re.test(text)) return { text: pick(answers), leave: false };
    return { text: pick(FALLBACK_QUESTIONS), leave: false };
  };
  bot.opener = () => (Math.random() < 0.55 ? R(OPENERS) : null);
  return bot;
}

// typing delay in ms (human-like)
const typingDelay = text => Math.min(1200 + text.length * 70 + Math.random() * 1500, 6500);

module.exports = { createBot, typingDelay, between };
