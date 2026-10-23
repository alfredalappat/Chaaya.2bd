
// ===== EDIT THIS FILE to change what the chat partner says =====
const R = a => a[Math.floor(Math.random() * a.length)];
const between = (a, b) => a + Math.floor(Math.random() * (b - a + 1));

// Sometimes sent first when the chat starts
const OPENERS = ["oi","boy aano?", "girl aano?", "aan aano penn aano?", "male aano female aano?","hi", "hello", "hey", "hii", "hy","boy aan","hellooy","hy","hyy","?","boy or girl","girl aano","name","ur name","your name","hiii","hoi","Name","namee??","helooo","yourr Namw","Namm?","booy?","lady or boy","hiiiiiiiii","hoy",];

// Normal replies, in GROUPS. Each [ ... ] is one group of the same message written in different ways.
// The bot picks a random group, then one random line from inside it.
// A group is never used twice in the same chat.
const MESSAGES = [
  ["from?", "frm?", "naatilevidya?","evideya sthalam?","naattil evideya?","from?", "frm?", "naatilevidya?", "native evideya?", "evideya sthalam?", "eth naada?", "evide ninna?"],
  ["padikaano?", "padikkuvaano?", "studentaano?","working aano"],
    ["first time aano ivide?", "ivide aadyam aano?",],
    ["strangers aayi chat cheyyarundo?"],
  ["ivide kore neram aayo?", "ethra neramaayi chat cheyyunnu?", "ivide aareyenkilum kittiyo?"],
  ["insta undo?", "instagram use cheyyarundo?", "insta id undo?"],


  [
  "rahul", "meenu", "akhil", "arjun", "amal", "abhinav", "adarsh", "adithyan",
  "akhilesh", "albin", "alan", "alwin", "amaldev", "aneesh", "anand", "anirudh",
  "aravind", "aswin", "athul", "avinash", "ajay", "ajith", "akhilraj", "abhijith",
  "abhiram", "abin", "achu", "arjunraj", "ashwin", "basil", "bijoy", "bibin",
  "bimal", "dhanush", "deepak", "devan", "devaraj", "dileep", "dinesh", "don",
  "ebin", "easwar", "edwin", "fahad", "farhan", "favas", "febin", "gokul",
  "govind", "hari", "harikrishnan", "harish", "hariharan", "jithin", "jishnu",
  "jithesh", "joel", "jomon", "joseph", "jovin", "karthik", "kiran", "krishna",
  "mahesh", "manu", "mithun", "mithilesh", "midhun", "nandu", "naveen", "nithin",
  "nikhil", "nivin", "rahulraj", "raj", "rajesh", "ranjith", "rohan", "rohit",
  "sachin", "sajin", "sandeep", "sarath", "sreehari", "sreerag", "sreejith",
  "sreejith", "sujith", "suman", "suryadev", "sujay", "sandev", "shyam",
  "sharath", "shibil", "shahin", "shanu", "sharon", "siddharth", "sooraj",
  "sreejith", "sreenath", "sreeram", "sreevinay", "sujith", "tony", "vishnu",
  "vishal", "vivek", "vishakh", "vipin", "vaisakh", "varun", "unni", "akhilmon",
  "amaljith", "anandhu", "aneesh", "anoop", "anoob", "aslam", "basheer",
  "faizal", "hisham", "irshad", "jasim", "jaseem", "muhammed", "muneer",
  "naufal", "nihal", "rashid", "salman", "shameer", "shamil", "shiyas",
  "suhail", "yaseen", "zayan", "zain", "abinash", "akhilkrishna", "devadath",
  "sreejith", "vivekanand", "aromal", "akhildev", "amalraj", "arun", "jayan",
  "pranav", "praveen", "prithviraj", "sanjay", "sreejith", "vimal",
  "meenu", "anu", "arya", "achu", "amalya", "anjana", "anagha", "athira",
  "aswathy", "aparna", "amrutha", "anupama", "devika", "diya", "gopika",
  "gayathri", "geethu", "greeshma", "keerthana", "kavya", "lakshmi",
  "malavika", "megha", "navya", "neha", "nimisha", "parvathy", "pooja",
],
[
  "tvm", "klm", "pta", "alp", "ktm", "idk", "ekm",
  "tsr", "pkd", "mlp", "kkd", "wyd", "knr", "ksd",  "TVM", "KLM", "PTA", "ALP", "KTM", "IDK", "EKM",
  "TSR", "PKD", "MLP", "KKD", "WYD", "KNR", "KSD"
],
  [
  "enthedukuvaa?",
  "entha cheyyunne?",
  "entha paripaadi?",
  "evideya?"],

  ["single aano?"],
  ["relationship undo"],
  ["bf/gf undo"],


];


function createBot() {
  const bot = { limit: between(2, 3), n: 0, usedGroups: new Set() };
  const pickFromGroup = () => {
    const all = MESSAGES.map((_, i) => i);
    const fresh = all.filter(i => !bot.usedGroups.has(i));
    const i = R(fresh.length ? fresh : all);    // only repeats a group if every group was already used
    bot.usedGroups.add(i);
    return R(MESSAGES[i]);
  };
  // returns { text, leave }
  bot.reply = () => {
        bot.n++;
    return { text: pickFromGroup(), leave: bot.n >= bot.limit }; 
  };
  bot.opener = () => (Math.random() < 0.55 ? R(OPENERS) : null);
  return bot;
}

// typing delay in ms (human-like)
const typingDelay = text => Math.min(1200 + text.length * 70 + Math.random() * 1500, 6500);

module.exports = { createBot, typingDelay, between };
