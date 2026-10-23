// ===== EDIT THIS FILE to change what the chat partner says =====
const R = a => a[Math.floor(Math.random() * a.length)];
const between = (a, b) => a + Math.floor(Math.random() * (b - a + 1));

// Sometimes sent first when the chat starts
const OPENERS = ["oi","hi", "hello", "hey", "hii", "hy","hellooy","hy","hyy","?","hiii","hoi","helooo","hiiiiiiiii","hoy",];

// Normal replies, in GROUPS. Each [ ... ] is one group of the same message written in different ways.
// The bot picks a random group, then one random line from inside it.
// A group is never used twice in the same chat.
// IMPORTANT: every group needs a comma after its closing ]
// These groups are now the FALLBACK: used when the bot does not understand what the person wrote.
const MESSAGES = [
  ["neme","name","ur name","your name","Name","namee??","yourr Namw","Namm?"],
  ["boy aano?", "girl aano?", "aan aano penn aano?", "male aano female aano?","boy or girl","girl aano","lady or boy","boooy aano"],
  ["from?", "frm?", "naatilevidya?","evideya sthalam?","naattil evideya?","from?", "frm?", "naatilevidya?", "native evideya?", "evideya sthalam?", "eth naada?", "evide ninna?"],
  ["padikaano?", "padikkuvaano?", "studentaano?","working aano"],
  ["first time aano ivide?", "ivide aadyam aano?"],
  ["strangers aayi chat cheyyarundo?"],
  ["ivide kore neram aayo?", "ivide aareyenkilum kittiyo?"],

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

// Safety: a broken group (missing comma etc.) is skipped instead of crashing the server
const GROUPS = MESSAGES.filter(Array.isArray)
  .map(g => g.filter(x => typeof x === 'string' && x))
  .filter(g => g.length);
if (GROUPS.length !== MESSAGES.length) console.warn('bot.js: a group in MESSAGES is broken, check the commas');


// =====================================================================
// RETRIEVAL DATASET: what people send (q) and what the bot can answer (a)
// ---------------------------------------------------------------------
// q = many ways people write the same thing (spelling mistakes are also caught automatically,
//     and repeated letters are ignored, so "helloooo" = "hello", "sukhamaano" = "sukhamano").
// a = replies. The bot picks one at random and does not repeat a reply in the same chat.
// In replies you can use these words in { }, they are filled in per chat so the bot stays consistent:
//   {name} {age} {place} {gender} (boy/girl) {gm} (aan/penn) {g1} (m/f) {job} {height}
// To teach the bot something new, copy one line, change the q and a. Every entry needs a comma at the end.
// =====================================================================
const DATASET = [
  // ---- greetings ----
  { q: ["hi","hello","hey","hii","hlo","hloo","helo","hy","hyy","oi","oy","hoy","hai","hola","heyy","hi da","hello da","hey da","hi bro","hi chechi","hi chetta","namaskaram","ഹായ്","ഹലോ"],
    a: ["hi","hello","hii","hey","oi","hy da","hai","hello da"] },
  { q: ["good morning","gm","gud morning","good mrng","suprabhatham","subhaprabhatham"],
    a: ["gm da","good morning","gm, ninakko?","gm"] },
  { q: ["good afternoon","ga","gud afternoon"],
    a: ["ga da","good afternoon","ga, kazhicho?"] },
  { q: ["good evening","ge","gud evening","good eve"],
    a: ["ge da","good evening","ge, entha vishesham?"] },
  { q: ["good night","gn","gud night","gud nyt","good nyt","shubharathri","shubha rathri","sleep","urangan pokunnu","urakkam varunnu","urakkam vannu"],
    a: ["gn da","good night","gn, sleep well","gn, pinne kaanam"] },

  // ---- how are you / what's up ----
  { q: ["how are you","hru","how r u","how are u","how u","hw r u","how are you doing","hows u","sukhamano","sugamano","sukhano","sugham aano","sukhamaano","sukhalle","sugalle","sukhalle da","entha vishesham","enthokke vishesham","enthokke und vishesham","vishesham","vishesham entha","സുഖമാണോ"],
    a: ["sukham, nee?","sukhamanu da, ninakko?","good da, you?","kuzhappamilla, ninakko?","sugham, ninte vishesham?","all good, nee?","poyikondirikkunnu, ninakko?"] },
  { q: ["what are you doing","what r u doing","wat doing","wyd","whats up","what's up","wassup","wats up","sup","whatsup","entha cheyyunne","enthaa cheyyunne","ntha cheyyunne","enth cheyyunne","enthu cheyyunnu","enthu cheyyuva","entha cheyyuva","entha cheyyunnath","entha paripaadi","enthaa paripaadi","enthokke paripaadi","paripaadi","paripadi","ntha paripadi","enthokke und","enthokkeya","entha plan","free aano","free ano","busy aano","busy ano"],
    a: ["onnum illa, chumma irikkunnu","chumma irikkunnu, nee?","tv kanunnu","phone nokki irikkunnu","onnumilla da, ninakko?","chumma bore adich irikkunnu","chat cheyyunnu, nee?","vere pani onnum illa","free aanu, nee?"] },

  // ---- name ----
  { q: ["name","ur name","your name","nm","neme","namee","name pls","name plz","pls name","name entha","name enthaa","name ntha","ninte name","nte name","peru","peru entha","peru ntha","pere","ninte peru","ninte peru entha","nte peru","ente peru enthaa","what is your name","whats ur name","what's your name","wat is ur name","your goodname","ur goodname","പേര് എന്താ","പേര്"],
    a: ["{name}","{name} da","{name}, ninte?","name {name}, ninte?","{name} aanu, nee?"] },
  { q: ["who are you","aaranu","aaraa","aaru","ningal aaru","nee aaru","aara","aaranu nee"],
    a: ["{name}, nee?","njan {name}","{name} aanu, ninte peru?"] },
  { q: ["my name is","name is","ente peru","enikku peru","ente peru aanu","ente name"],
    a: ["nice name","aah ok, nalla peru","ok da","kollam peru","oh ok"] },

  // ---- boy / girl / asl ----
  { q: ["boy or girl","boy aano girl aano","boy aano","girl aano","boy ano","girl ano","aan aano penn aano","aan aano","penn aano","aano penno","male or female","m or f","m/f","mf","gender","gender entha","gender enthaa","lady aano","ladyano","are you boy or girl","are u boy or girl","are you a girl","are you a boy","are u a girl","are u a boy","nee boy aano","nee girl aano","nee penn aano","nee aan aano","boy or girl aano","boy / girl"],
    a: ["{gender} aanu","{gender} da","{gender}, ninte?","{gm}, nee?","{gender} aanu, nee?"] },
  { q: ["asl","a s l","asl pls","asl plz","age sex location","a/s/l","asl?"],
    a: ["{age} {g1} {place}","{age}/{g1}/{place}","{age} {gender} {place}, you?"] },

  // ---- age ----
  { q: ["age","ur age","your age","how old are you","how old r u","how old are u","what is your age","whats ur age","age entha","age enthaa","age ethra","age ethraya","age ethrayaa","eth age","enth age","praayam","praayam ethra","praayam entha","ninte praayam","vayas","vayass","vayass ethra","vayassu ethra","ethra vayassa","ethra vayassaayi","ethra vayas","പ്രായം എത്ര"],
    a: ["{age}","{age} aanu","{age} da, ninte?","{age}, ninakko?","{age} aayi"] },

  // ---- place ----
  { q: ["from","frm","where are you from","where r u from","wr r u from","where from","where do you live","where do u live","place","ur place","your place","place ethaa","place entha","location","loc","ur location","your location","evideya","evideyaa","evideyanu","evideya sthalam","evideya naadu","eth naadu","eth naada","eth district","district","district ethaa","district entha","naadu","sthalam","sthalam evideya","naatil evideya","naattil evideya","naatilevidya","native","native evideya","evide ninna","evidenna","evide ninnanu","evide ninnaanu","evide aanu","evide aano","evideya thamasam","evideya thaamasam","veedu evideya","nee evideya","enthu place","എവിടെയാ"],
    a: ["{place}","{place}, ninte?","{place} aanu, nee?","{place} da, ninakko?","{place}, nee evideya?"] },
  { q: ["i am from","im from","ente naadu","njan ... ninnu","njan evide ninnu","ente place","ente sthalam","ente district","ente veedu"],
    a: ["aah ok","ok da, nalla sthalam","ohh, ente aduthu alla","aah kollam","oh nice"] },

  // ---- study / work ----
  { q: ["padikkuvano","padikaano","padikkunnundo","studentano","student aano","student ano","studying or working","working aano","workano","work cheyyunnundo","job undo","job ano","job aano","job indo","what do you do","wat do u do","what do u do","what do you study","occupation","qualification","qualification enthaa","education","edu","padippu","padippu ethra","ninte padippu","entha job","enthu job","job entha","enth job","job enthaa","ethra padikkunne","entha padikkunne","enth padikkunnu","course enthaa","course entha","eth course","evide padikkunne","college evideya","college eth","college evide","evide work cheyyunne","work evide","work enthaa","work entha","enthedukuvaa","enthedukkuva","enthedukuvaa","entha cheyyunnath job"],
    a: ["{job}","{job}, ninte?","{job} da, ninakko?","{job}, nee?"] },
  { q: ["marriage kazhinjo","kalyanam kazhinjo","vivaham kazhinjo","married aano","married ano","engaged aano","marriage ayo","kalyanam ayo"],
    a: ["illa da, ninakko?","illa, ippo vendaa","illa, ninte?","illa, padikkunnu"] },

  // ---- relationship ----
  { q: ["single aano","single ano","single","single aano da","single aanalle","relationship undo","relationship il aano","relationship status","status","committed aano","commited aano","taken aano","bf undo","gf undo","bf indo","gf indo","bf/gf undo","gf/bf undo","bf gf undo","gf bf undo","bf or gf","bf/gf","gf/bf","girlfriend undo","boyfriend undo","girlfriend und","boyfriend und","lover undo","lover und","prem und","premam undo","pranayam undo","mingle aano","ready to mingle"],
    a: ["single aanu","single da, ninte?","illa, single aanu","illa da, nee?","single aanu, nee?","onnum illa, ninakko?","illa, ninakko?"] },

  // ---- chat habits ----
  { q: ["first time aano","first time ano","first time here","ivide aadyam aano","ivide aadyamano","ivide aadyam","aadyam aano","aadyamayito","new aano","new ano","ivide puthiya aano"],
    a: ["aanu da, ninakko?","alla, munpum vannitund","aadyamalla, nee?","ithu aadyam aanu","aanu, nee?"] },
  { q: ["ivide kore neram aayo","ivide kore ayo","ivide ethra neram aayi","ivide ethra nalaayi","kore neram aayo","kore aayo","kore time aayo","kure neram aayo","ethra neram aayi","ivide kore nalayo","ivide kore neram aayo ivide"],
    a: ["illa, ippo vannathe ullu","kurachayi","kore neram aayi, aarum illa","10 min aayi","kurach neram aayi"] },
  { q: ["strangers aayi chat cheyyarundo","stranger chat cheyyarundo","ivide chat cheyyarundo","chat cheyyarundo","regular aano","regular ano","daily varaarundo","daily vararundo","ivide daily varumo","ivide varaarundo","varaarundo","ivide aareyenkilum kittiyo","aareyenkilum kittiyo"],
    a: ["illa, chumma bore adichappo vannatha","kore aayi vannittu","chilappo, nee?","pathivund","kurachokke, nee?","aarum kittiyilla, nee?"] },
  { q: ["enthina vannath","enthina ivide","why are you here","enthina chat cheyyunne","enthina ivide vannath","ivide enthina"],
    a: ["bore adichu, athanu vannath","chumma timepass","chumma vannathaa, nee?","aarengilum kittumo ennu nokkan vannatha"] },
  { q: ["bore","bore aano","bore adikkunno","bore adichu","bore adikkunnu","bore adich","boring"],
    a: ["njanum, athaanu vannath","athe, enikkum bore","same da","enikkum bore aanu"] },
  { q: ["reply","reply tha","reply cheyyu","mindunnille","mindunnilla","mindathe irikkunnath enthaa","mindaathathenth","athu parayu","parayu","enthu parayana"],
    a: ["ivide thanne und","chumma ee irikkunnath","enthu parayanam ennu ariyilla","phone nokkukayayirunnu","parayu, kelkkunnund"] },
  { q: ["pokalle","pokalle da","wait","nilkku","nillu","pokaruth","poyikalayalle"],
    a: ["ivide thanne und","illa da, ivide thanne und","wait cheyyam"] },

  // ---- bye / thanks / sorry ----
  { q: ["bye","by","bye da","tata","ta ta","tc","take care","poyi","njan pokunnu","njan povuka","pokatte","pokunnu","pokuva","ok bye","ok tata","bye bye","bubye"],
    a: ["ok bye","bye da, take care","tata","pinne kaanam, bye","sheri, tc","bye da"] },
  { q: ["thanks","thank you","thnx","thx","tnx","nandi","thank u"],
    a: ["welcome","athinentha","ok da","np"] },
  { q: ["sorry","sry","sorry da","kshamikku"],
    a: ["kuzhappamilla","its ok","sarilla","np da"] },

  // ---- contact / pics / calls ----
  { q: ["insta","instagram","insta id","instagram id","insta undo","insta ille","insta id tharumo","insta handle","ig","ig id","snap","snapchat","snap id","snap undo","whatsapp","whatsapp number","whatsapp no","wa no","wa number","wa","number","number tharumo","number tharamo","number tharuo","number tha","contact","contact no","contact number","mobile number","phone number","ph no","telegram","tg","tg id","telegram id","id tharumo","id tharamo","your id","ur id","id undo"],
    a: ["ippo venda, ivide chat cheyyam","athokke pinne","tharilla da","pinne tharam, ippo chat cheyyam","ividuthanne samsarikkam","insta illa","ath pattilla"] },
  { q: ["pic","photo","pic tharumo","photo tharumo","pic undo","photo undo","send pic","send photo","pic ayakko","photo ayakko","pic ayachu tha","pic tha","photo tha","face reveal","dp","selfie","selfie tharumo"],
    a: ["pic tharilla","pic onnum tharilla da","photo tharilla","vendada","ippo pattilla","pic tharilla, chat cheythal mathi","ividuthanne chat cheyyam"] },
  { q: ["video call","vc","vc varumo","vc cheyyam","vc varo","vc und","video call varumo","call","call varumo","call cheyyam","voice","voice note","voice call","voice tharumo"],
    a: ["call onnum venda","ippo pattilla","vendada, chat cheythal mathi","ath pattilla","ividuthanne chat cheyyam"] },
  { q: ["meet cheyyaamo","meet","meetup","meet up","kaanaamo","kaananam","nere kaanaamo","nere kaanam","meet cheyyan pattumo"],
    a: ["ippo pattilla","kaananamenkil pinne parayam","athinu munpe parichayappedatte","athonnum venda, chat mathi","dooram aanu"] },

  // ---- adult / rude ----
  { q: ["sex","sexting","sex chat","nude","nudes","horny","hookup","hook up","dirty chat","dirty talk"],
    a: ["athonnum venda","athu vendada","ath pattilla","athinu alla vannath","chumma chat cheyyam mathi","vere entha"] },
  { q: ["i love you","love you","luv u","ishtam aanu","ishtamanu","i like you","like you","crush aano","ninne enikku ishtamaayi","njan ninne premikkunnu"],
    a: ["athrakku aayo","ayyo, angane onnum illa","enthokke parayunne","ippo thanne aano","chumma parayalle","chirichu povum"] },
  { q: ["poda","podi","podaa","patti","thendi","myre","myr","mayire","pulle","kunna"],
    a: ["enthina ingane parayunne","vendada ath","manners undo","ok bye","chumma chat cheyyu da"] },
  { q: ["bot","bot aano","bot ano","nee bot aano","ntha bot","robot","ai aano","fake","fake aano","bot alle","are you bot","are you a bot","are u a bot","r u bot","u bot","ur a bot","real aano","real ano","bot aanu"],
    a: ["bot alla da","real aanu","njan real aanu, nee bot aano?","enthina ingane chodikkunne, bot alla","bot alla"] },
  { q: ["height","height ethra","ethra height","uyaram","uyaram ethra","ninte uyaram","bodytype","body type"],
    a: ["{height}","{height}, ninte?","{height} und"] },
  { q: ["weight","weight ethra","ethra weight","bhaaram","bhaaram ethra","salary","salary ethra","income"],
    a: ["athokke enthina chodikkunne","athu parayilla da","ath private aanu"] },

  // ---- language / kerala ----
  { q: ["malayalam ariyamo","malayali aano","malayali ano","malayali","malayalam","malayalee","malayalam ano","mallu","mallu aano","mallu ano","kerala","kerala aano","keralite","keralite aano","malayalam parayamo","malayalam parayum","malayalam samsarikkamo","do you know malayalam"],
    a: ["aanu da, malayali","malayali aanu","mallu aanu, nee?","aanu, ninakko?","malayalam ariyam, english kuracheyullu"] },
  { q: ["tamil","hindi","english","english ariyamo","eng","hindi ariyo","hindi ariyamo","speak english","english only","can you speak english"],
    a: ["english ariyam, pakshe malayalam mathi","malayalam mathi da","malayalam aanu easy","hindi kurachariyam"] },

  // ---- daily life ----
  { q: ["food kazhicho","food kazhichille","kazhicho","kazhichille","kazhichoo","kazhichu","food aayo","food ayo","chor kazhicho","chorano","breakfast kazhicho","lunch kazhicho","dinner kazhicho","dinner kazhichille","entha kazhichath","enthaa kazhichath","what did you eat","did you eat","ate"],
    a: ["kazhichu, nee?","kazhichu da, ninakko?","ippo kazhichu thirichu vannu, nee?","illa, kazhikkanam","chor kazhichu, ninakko?","illa da, vishakkunnu"] },
  { q: ["entha food","favourite food","fav food","ishtapetta bakshanam","ishtamulla food","ishtam entha"],
    a: ["biriyani","porotta beef","biriyani thanne, ninakko?","chicken fry, nee?","mandi, nee?"] },
  { q: ["hobby","hobbies","hobby entha","hobby enthaa","enthaa hobby","ishtapetta hobby","timepass","timepass entha","free time entha cheyyuka","free time enthu cheyyum"],
    a: ["cinema kaanal, music kelkkal","phone nokki irikkal","game kalikkal, nee?","urakkam aanu hobby","chumma timepass, ninakko?","cricket kaanal, nee?"] },
  { q: ["favourite movie","fav movie","ishtapetta cinema","ishtamulla cinema","cinema ishtamano","cinema kaanarundo","movie kaanarundo","movies","fav actor","favourite actor","ishtapetta nadan"],
    a: ["cinema ishtaa, nee?","movie kaanum, pakshe fav onnum illa","lucifer ishtam","manjummel boys ishtam aayi","premam ishtam, nee?","drishyam ishtam, ninakko?"] },
  { q: ["favourite song","fav song","pattu ishtamano","pattu kelkkarundo","music ishtamano","music kelkkarundo","music","songs"],
    a: ["pattu kelkkum","music ishtaa, ninakko?","malayalam songs kelkkum","evideyum pattu kelkkum, nee?"] },
  { q: ["games kalikkarundo","game kalikkarundo","game","gaming","pubg","free fire","bgmi","cricket","football","sports","cricket ishtamano","football ishtamano"],
    a: ["free fire kalikkum, nee?","chila time game kalikkum","game kalikkarund, nee?","cricket kaanum, nee?","football ishtaa, ninakko?"] },
  { q: ["mazha undo","mazha peyyunno","mazha","weather","chood","chood und","hot aano","heat","mazha peyyunnundo"],
    a: ["mazha und evide","mazha illa, nee?","chood aanu da","nalla mazhaya ivide, nee?","mazha peyyunnund"] },
  { q: ["chettan undo","chechi undo","anujan undo","anujathi undo","siblings undo","brother undo","sister undo","sibling undo","kudumbathil aaralle"],
    a: ["undu, oru chechi und","anujathi und","illa, njan mathram","oru chettan und, ninakko?","undu, ninakko?"] },

  // ---- reactions ----
  { q: ["haha","hehe","lol","lmao","hahaha","hihi","chirikkunnu","enthina chirikkunne"],
    a: ["haha","😂","enthina chirikkunnu","lol","hehe"] },
];

// ---------------------------------------------------------------------
// Matching engine (no AI): cleans the text and compares spelling
// ---------------------------------------------------------------------
// lowercase, remove punctuation/emoji, shrink repeated letters ("helloooo" -> "helo"), tidy spaces
const norm = s => String(s || '').toLowerCase().normalize('NFKC')
  .replace(/['\u2019]/g, '')
  .replace(/[^\p{L}\p{M}\p{N}\s]/gu, ' ')
  .replace(/(.)\1+/gu, '$1')
  .replace(/\s+/g, ' ').trim();

// edit distance (how many letters differ)
function lev(a, b) {
  if (a === b) return 0;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev = cur;
  }
  return prev[b.length];
}
const similarity = (a, b) => 1 - lev(a, b) / Math.max(a.length, b.length);

const MIN_SIMILARITY = 0.76;   // 0.76 = about 1 wrong letter in 5. Higher = stricter, lower = more guesses.

// Build the lookup list once when the server starts
const INDEX = [];
const ENTRIES = DATASET.filter(e => e && Array.isArray(e.q) && Array.isArray(e.a))
  .map(e => ({ q: e.q.filter(x => typeof x === 'string'), a: e.a.filter(x => typeof x === 'string' && x) }))
  .filter(e => e.q.length && e.a.length);
ENTRIES.forEach((e, ei) => e.q.forEach(q => { const k = norm(q); if (k) INDEX.push({ k, ei }); }));

// returns the index of the best matching entry, or -1 if nothing is close enough
function findEntry(text) {
  const m = norm(text);
  if (!m) return -1;
  const padded = ' ' + m + ' ';
  let best = -1, bestScore = 0;
  for (const it of INDEX) {
    const k = it.k;
    let score = 0;
    if (k === m) score = 1;
    else if (m.length > 3 && k.length > 3) {
      // the message contains the whole phrase, e.g. "hii how are you da"
      if (padded.includes(' ' + k + ' ')) score = 0.8 + 0.19 * (k.length / m.length);
      // similar spelling, e.g. "sugamano" ~ "sukhamano"
      else if (Math.abs(m.length - k.length) / Math.max(m.length, k.length) <= 1 - MIN_SIMILARITY) {
        const s = similarity(m, k);
        if (s >= MIN_SIMILARITY) score = s;
      }
    }
    if (score > bestScore) { bestScore = score; best = it.ei; }
  }
  return best;
}

// ---------------------------------------------------------------------
// Persona: details the bot keeps the same during one chat
// ---------------------------------------------------------------------
const MALE_NAMES = ["rahul","akhil","arjun","amal","abhinav","adarsh","anand","aravind","aswin","athul","ajay","basil","hari","jithin","kiran","manu","midhun","nandu","nikhil","rohan","sachin","sarath","sreejith","vishnu","vivek","unni","anoop","faizal","hisham","nihal","salman","yaseen","arun","pranav","praveen","sanjay"];
const FEMALE_NAMES = ["meenu","anu","arya","anjana","athira","aswathy","aparna","amrutha","devika","diya","gopika","gayathri","keerthana","kavya","lakshmi","malavika","megha","navya","neha","nimisha","parvathy","pooja"];
const PLACES = [["thrissur","tsr"],["kochi","ekm"],["trivandrum","tvm"],["kollam","klm"],["kottayam","ktm"],["palakkad","pkd"],["kozhikode","kkd"],["malappuram","mlp"],["kannur","knr"],["alappuzha","alp"],["pathanamthitta","pta"],["idukki","idk"],["wayanad","wyd"],["kasaragod","ksd"]];
const JOBS = ["student aanu","degree cheyyunnu","bcom padikkunnu","engineering cheyyunnu","job cheyyunnu","work cheyyunnu","diploma cheyyunnu","pg cheyyunnu","plus two kazhinju, ippo free","nursing padikkunnu"];

function makePersona() {
  const male = Math.random() < 0.5;
  const pl = R(PLACES);
  return {
    gender: male ? 'boy' : 'girl', gm: male ? 'aan' : 'penn', g1: male ? 'm' : 'f',
    name: R(male ? MALE_NAMES : FEMALE_NAMES),
    age: between(19, 24),
    place: Math.random() < 0.5 ? pl[0] : pl[1],
    job: R(JOBS),
    height: male ? between(165, 180) + ' cm' : between(153, 166) + ' cm',
  };
}
const fill = (text, p) => text.replace(/\{(\w+)\}/g, (_, k) => (p[k] !== undefined ? p[k] : ''));


function createBot() {
  const bot = { limit: between(2, 3), n: 0, usedGroups: new Set(), spoke: false, persona: makePersona(), usedLines: new Map() };
  const pickFromGroup = () => {
    const all = GROUPS.map((_, i) => i);
    const fresh = all.filter(i => !bot.usedGroups.has(i));
    const i = R(fresh.length ? fresh : all);    // only repeats a group if every group was already used
    bot.usedGroups.add(i);
    return R(GROUPS[i]);
  };
  // answer from the dataset, never repeating the same line in one chat; null if nothing fits
  const pickFromDataset = text => {
    const ei = findEntry(text);
    if (ei < 0) return null;
    const used = bot.usedLines.get(ei) || new Set();
    const fresh = ENTRIES[ei].a.filter(x => !used.has(x));
    if (!fresh.length) return null;
    const line = R(fresh);
    used.add(line); bot.usedLines.set(ei, used);
    return fill(line, bot.persona);
  };
  // returns { text, leave }
  bot.reply = (userText) => {
    // The bot's very first message is ALWAYS from OPENERS (it does not count towards the limit)
    if (!bot.spoke) { bot.spoke = true; return { text: R(OPENERS), leave: false }; }
    bot.n++;
    const text = pickFromDataset(userText) || pickFromGroup();   // dataset first, random groups as fallback
    return { text, leave: bot.n >= bot.limit };
  };
  bot.opener = () => (Math.random() < 0.55 ? R(OPENERS) : null);
  return bot;
}

// typing delay in ms (human-like)
const typingDelay = text => Math.min(1200 + text.length * 70 + Math.random() * 1500, 6500);

module.exports = { createBot, typingDelay, between };
