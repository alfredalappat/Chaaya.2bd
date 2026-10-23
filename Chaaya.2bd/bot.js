// ===== EDIT THIS FILE to change what the chat partner says =====
const R = a => a[Math.floor(Math.random() * a.length)];
const between = (a, b) => a + Math.floor(Math.random() * (b - a + 1));

// Sometimes sent first when the chat starts
const OPENERS = [
  "oi", "hi", "hello", "hey", "hii", "hy", "hellooy", "hy", "hyy",
  "hlo", "hloo", "hlooo", "helo", "helloo", "hellooo", "helloooo",
  "heyy", "heyyy", "heyyyy", "hiii", "hiiii", "hiiiii",
  "hiiiiii", "hiiiiiii", "hiiiiiiii", "hoy", "hoi", "hoii", "hoiii",
  "oii", "oiii", "oiiii", "hie", "hiee", "hieee",
  "hi hi", "hii hii", "hey hi", "hey hii", "hello hi",
  "hii da", "hiii da", "hii bro", "heyy bro",
  "rahul", "meenu", "akhil", "arjun", "amal", "abhinav",
  "hiii", "hiiii", "heyyy", "hlooo",
  "adarsh", "adithyan", "akhilesh", "albin", "alan", "alwin",
  "hiiiiii", "hyyyy", "hellooo", "hiiiii",
  "amaldev", "aneesh", "anand", "anirudh", "aravind", "aswin",
  "hiii", "oiii", "heyyyy", "hlooo",
  "athul", "avinash", "ajay", "ajith", "akhilraj", "abhijith",
  "hii", "hiiii", "hieee", "helloooo",
  "abhiram", "abin", "achu", "arjunraj", "ashwin", "basil",
  "hyyy", "hyyyyy", "hiiiiiii", "heyyy",
  "bijoy", "bibin", "bimal", "dhanush", "deepak", "devan",
  "hlo", "hloo", "hiii", "oiii",
  "devaraj", "dileep", "dinesh", "don", "ebin", "easwar",
  "hiiii", "heyyyy", "hiiiii", "hoyyy",
  "edwin", "fahad", "farhan", "favas", "febin", "gokul",
  "hiii", "hlooo", "hellooo", "hiee",
  "govind", "hari", "harikrishnan", "harish", "hariharan",
  "hii", "hiiiiii", "heyyy", "oiii",
  "jithin", "jishnu", "jithesh", "joel", "jomon", "joseph",
  "hlooo", "hyyyy", "hiiii", "helloooo",
  "jovin", "karthik", "kiran", "krishna", "mahesh", "manu",
  "heyy", "hiiiii", "hoiii", "hieee",
  "mithun", "mithilesh", "midhun", "nandu", "naveen", "nithin",
  "hiii", "hiiii", "hellooo", "hyy",
  "nikhil", "nivin", "rahulraj", "raj", "rajesh", "ranjith",
  "oii", "hlo", "heyyyy", "hiiiiii",
  "rohan", "rohit", "sachin", "sajin", "sandeep", "sarath",
  "hiiii", "hiii", "hlooo", "heyyy",
  "sreehari", "sreerag", "sreejith", "sujith", "suman",
  "hyyyy", "hiiiiiii", "oiiii", "hellooo",
  "suryadev", "sujay", "sandev", "shyam", "sharath", "shibil",
  "hii", "hieee", "hiiiiii", "heyyyy",
  "shahin", "shanu", "sharon", "siddharth", "sooraj",
  "hlooo", "hiii", "hoiii", "hyyyyy",
  "sreenath", "sreeram", "sreevinay", "tony", "vishnu",
  "hiiii", "helloooo", "hiiiii", "heyyy",
  "vishal", "vivek", "vishakh", "vipin", "vaisakh", "varun",
  "hiii", "hiiiiii", "oiii", "hlooo",
  "unni", "akhilmon", "amaljith", "anandhu", "aneesh", "anoop",
  "hyy", "heyyyy", "hiiii", "hieee",
  "anoob", "aslam", "basheer", "faizal", "hisham", "irshad",
  "hiiiiii", "hlooo", "hellooo", "oiii",
  "jasim", "jaseem", "muhammed", "muneer", "naufal", "nihal",
  "heyyy", "hiiii", "hyyyy", "hoiii",
  "rashid", "salman", "shameer", "shamil", "shiyas", "suhail",
  "hlo", "hlooo", "hiiiiii", "helloooo",
  "yaseen", "zayan", "zain", "abinash", "akhilkrishna", "devadath",
  "hiiii", "heyyy", "hieee", "oiiii",
  "vivekanand", "aromal", "akhildev", "amalraj", "arun", "jayan",
  "hyyyy", "hiiiiiii", "hellooo", "hlooo",
  "pranav", "praveen", "prithviraj", "sanjay", "vimal",
  "hiiiii", "hiiii", "heyyyy", "oiii",
  "meenu", "anu", "arya", "achu", "amalya", "anjana", "anagha", "athira",
  "hlooo", "hiiiiii", "heyyy", "helloooo",
  "aswathy", "aparna"
];

// Normal replies, in GROUPS. Each [ ... ] is one group of the same message written in different ways.
// The bot picks a random group, then one random line from inside it.
// A group is never used twice in the same chat.
// IMPORTANT: every group needs a comma after its closing ]
const MESSAGES = [
  ["neme","name","ur name","your name","Name","namee??","yourr Namw","Namm?"],
  ["B or g","boy aano?", "girl aano?", "aan aano penn aano?", "male aano female aano?","boy or girl","girl aano","lady or boy","boooy aano","B or g", "boy aano?", "girl aano?", "aan aano penn aano?", "male aano female aano?", "boy or girl?", "girl aano?", "lady aano?", "nee boy aano?"],
  ["from?", "frm?", "naatilevidya?","evideya sthalam?","naattil evideya?","from?", "frm?", "naatilevidya?", "native evideya?", "evideya sthalam?", "eth naada?", "evide ninna?"],
  ["padikaano?", "padikkuvaano?", "studentaano?","working aano"],
  ["first time", "ivide first aano"],
[
  "tvm", "alp", "ktm", "idk", "ekm",
  "tsr", "pkd", "mlp", "kkd", "wyd", "knr", "ksd",  "TVM", "KLM", "ALP", "IDK", "EKM",
  "TSR", "PKD", "MLP", "KKD", "WYD", "KNR", "KSD"
],
  [
  "enthedukuvaa?",
  "entha cheyyunne?",
  "entha paripaadi?",
  "evideya?"],

  ["single aano?"],
  [" Mood anno"],
  ["roleplay?"],
  ["Age"],
  ["Penn anno"],
  ["Tft?","Pft?"],
  ["Bdsm"],
  ["Lesb anno"],
  ["Boi annu skip akkiko"],
  ["Enna ond"],
  ["Gadiye😁"],
  ["Macchu"],
  ["bestie undo?","friend aayalo?"],
["mazha undo avide"]
,
["Fav mallu actress aara"],
["insta id","tele id"]

];

// Safety: a broken group (missing comma etc.) is skipped instead of crashing the server
const GROUPS = MESSAGES.filter(Array.isArray)
  .map(g => g.filter(x => typeof x === 'string' && x))
  .filter(g => g.length);
if (GROUPS.length !== MESSAGES.length) console.warn('bot.js: a group in MESSAGES is broken, check the commas');

function createBot() {
  const bot = { limit: between(2, 3), n: 0, usedGroups: new Set(), spoke: false };
  const pickFromGroup = () => {
    const all = GROUPS.map((_, i) => i);
    const fresh = all.filter(i => !bot.usedGroups.has(i));
    const i = R(fresh.length ? fresh : all);    // only repeats a group if every group was already used
    bot.usedGroups.add(i);
    return R(GROUPS[i]);
  };
  // returns { text, leave }
  bot.reply = () => {
    // The bot's very first message is ALWAYS from OPENERS (it does not count towards the limit)
    if (!bot.spoke) { bot.spoke = true; return { text: R(OPENERS), leave: false }; }
    bot.n++;
    return { text: pickFromGroup(), leave: bot.n >= bot.limit };
  };
  bot.opener = () => (Math.random() < 0.55 ? R(OPENERS) : null);
  return bot;
}

// typing delay in ms (human-like)
const typingDelay = text => Math.min(1200 + text.length * 70 + Math.random() * 1500, 6500);

module.exports = { createBot, typingDelay, between };
