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


  // ---- mood / feelings ----
  { q: ["sughamalla","sukhamalla","mood off aanu","mood off","sad aanu","sad aa","vishamam und","vishamam aanu","tension aanu","tension und","stress aanu","stress und","santhosham aanu","happy aanu","happy aa","nalla mood aanu","mood nallatha","deshyam varunnu","deshyam aanu","karayan thonnunnu","onnum parayan illa"],
    a: ["entha patti?","enthina mood off?","parayan thonnunnenkil para","ohh, sheriyakum da","kurach relax cheyyu","njan kelkkunnund, para","athentha angane?"] },

  // ---- conversation starters / getting to know someone ----
  { q: ["entha parayan","entha samsarikkam","topic para","oru topic para","what to talk","entha chodikkendath","nee thanne enthelum para","samsarikkam","namuk samsarikkam","talk cheyyam","chat cheyyam","entha vishesham parayu"],
    a: ["nee thanne oru karyam para","ninte hobbies entha?","school life engane aayirunnu?","oru random question chodikkatte?","ninte favourite movie etha?","ippo entha plan?","nee free aano ippo?"] },
  { q: ["random question","question chodikko","oru question chodikk","chodicho","ask me anything","entha question","chodyam para"],
    a: ["ninte dream place etha?","oru divasam full free kittiyal enthu cheyyum?","favourite food etha?","ninte biggest fear entha?","beach aano mountains aano ishtam?","ninte favourite song etha?"] },
  { q: ["nice to meet you","nice to meet u","parichayapettathil santhosham","meet cheythath happy","good to meet you"],
    a: ["enikkum","same here","enikkum santhosham","hehe, appo chat cheyyam"] },

  // ---- conversation follow-ups ----
  { q: ["pinne","ennittu","ennit","athinu shesham","ohh","oh","aah","aano","angane aano","sherikkum","serikkum","really","really aano","athentha","athentha angane"],
    a: ["athe da","hehe athe","pinne entha?","nee parayu","ninakk entha thonnunne?","aah angane thanne","appo nee entha parayunne?"] },
  { q: ["manasilayilla","manasilayilla da","entha udheshiche","entha paranje","onnu koodi para","repeat cheyyu","repeat plz","what do you mean","meaning entha","ariyilla"],
    a: ["onnumilla chumma paranjatha","vere reethiyil parayam","haha njan paranjath...","sherikkum entha manasilayilla?","okay, vidu, vere enthelum para"] },

  // ---- college / school / exams ----
  { q: ["exam undo","exam eppozha","exam kazhinjo","exam engane undayirunnu","exam engane aayi","exam nannayo","exam easy aayirunno","padichoo","padicho","study cheytho","portion kazhinjo","result vannu","result vannuvo","mark ethra kitti","pass aayo","supply undo","assignment undo","record ezhuthiyo"],
    a: ["kurach padichu, ninakko?","exam okke varunnu","average aayirunnu","easy aayirunnu ennu parayan pattilla","result wait cheyyuva","ini nannayi padikkanam","college life thanne vere level alle"] },
  { q: ["school evideya","school life miss cheyyunnundo","school friends undo","college life engane","college life ishtamano","class boring aanu","class bore adikkunnu","teacher vannille","class cut cheytho","attendance undo","semester etha","which semester","eth year aanu","first year aano","final year aano"],
    a: ["school life miss cheyyarund","college life okay aanu","class boring aanenkil time pokilla alle","ethu course aanu?","nee etha year?","friends undenkil college adipoli aanu"] },
  { q: ["course etha","btech aano","degree aano","plus two aano","plus one aano","diploma aano","engineering aano","nursing aano","bcom aano","bca aano","mba aano","pg aano","which course","eth college"],
    a: ["course okay aanu, ninakko?","ethu year aanu ippo?","course ishtamano?","college evideya?","future plan entha?"] },

  // ---- work / career ----
  { q: ["job kittiyo","job search cheyyuva","interview undo","interview engane aayi","interview kazhinjo","work kazhinjo","office kazhinjo","salary kittiyo","work pressure undo","office life engane","job ishtamano","resign cheyyan thonnunnu","career plan entha","future plan entha","abroad pokan plan undo"],
    a: ["job nokkikondirikkua, ninakko?","interview okay aayirunnu","work pressure kurach und","salary kittiyal santhosham alle","nalla job kittatte","future il entha plan?","abroad pokan agraham und, ninakko?"] },

  // ---- family / home ----
  { q: ["veettil aara ullath","family undo","family il ethra per und","veettil aano","home il aano","veettil ellarum undo","amma undo","achan undo","parents undo","family evideya","veettil pokuva","veettil ethiyo","home ethiyo"],
    a: ["veettil ellarum und","family koode aanu, nee?","amma achan und","veettil thanne aanu","nee veettil aano?","family il ethra per und?"] },
  { q: ["sahodaran undo","sahodari undo","oru brother undo","oru sister undo","siblings ethra","family members ethra","aniyan undo","aniyathi undo"],
    a: ["oru sibling und","randu per und veettil","njanum siblingum aanu","nee eldest aano?","ninakku siblings undo?"] },

  // ---- friends / social life ----
  { q: ["friends undo","friends ethra per","best friend undo","best friend name","friends aayi irikkunnu","friendship ishtamano","puthiya friends venam","friends kittan","nalla friend venam","lonely aanu","ottakk aanu","ottakk irikkunnu","aarum illa","talk cheyyan aarum illa"],
    a: ["nalla friends undakunnath nallatha","njanum chumma chat cheyyan vannatha","ottakk irikkumbo bore adikkum alle","nee easy aayi friends aakumo?","samsarichal friends aakam alle","ivide chat cheyyam, entha vishesham?"] },
  { q: ["trust issues und","friends betray cheythu","friend poyi","best friend pinangi","friendship breakup","friendine miss cheyyunnu","miss my friends"],
    a: ["ath vishamam aakum","time eduthu okay aavum","nalla friends pinneyum kittum","entha sambhaviche?","parayan thonnunnenkil para"] },

  // ---- hobbies / interests ----
  { q: ["drawing ishtamano","painting ishtamano","dance cheyyumo","dance ishtamano","sing cheyyumo","singing ishtamano","cooking ariyamo","cooking ishtamano","reading ishtamano","books vayikkumo","photography ishtamano","travel ishtamano","travelling ishtamano","cycling ishtamano","gym pokumo","workout cheyyumo"],
    a: ["kurachokke ishtam aanu, ninakko?","try cheyyarund","nalla hobby aanallo","nee regular aayi cheyyarundo?","enikku music aanu kooduthal ishtam"] },
  { q: ["anime kaanarundo","anime ishtamano","series kaanarundo","web series","ott platform","netflix undo","youtube kaanarundo","reels kaanarundo","instagram reels","shorts kaanarundo","youtube channel undo"],
    a: ["chilappo kaanum, nee?","eth series aanu recommend cheyyunne?","reels kand time pokum","youtube il entha kaanarullath?","anime onnum valya idea illa, nallath etha?"] },
  { q: ["favourite colour","fav colour","ishtamulla colour","colour etha","black ishtamano","white ishtamano","blue ishtamano","favourite place","fav place","dream place","evide travel cheyyanam"],
    a: ["black aanu, ninakko?","blue ishtam aanu","place okke mood pole aanu","munnar pokanam ennu agraham und","oru beach trip mathi"] },

  // ---- plans / weekends / outings ----
  { q: ["weekend plan entha","weekend entha plan","inn entha plan","naale entha plan","tomorrow plan","today plan","outing pokunno","purath pokunno","trip pokunno","trip plan undo","friends koode pokumo","beach pokumo","cinema pokunno","shopping pokunno","holiday aano","leave aano"],
    a: ["valiya plan onnum illa, ninakko?","chumma rest cheyyanam","friends koode plan undayirunnu","oru trip pokanam ennu und","nee evide pokum?","holiday aanenkil adipoli"] },
  { q: ["evide pokan ishtam","beach aano hill station aano","mountains ishtamano","beach ishtamano","munnar poyittundo","wayanad poyittundo","kochi poyittundo","thrissur poyittundo","kerala il evide poyittund"],
    a: ["beach aanu kooduthal ishtam","hills nalla vibe aanu","munnar pokanam ennu und","poyittund, nalla place aanu","nee travel cheyyarundo?"] },

  // ---- food / drinks ----
  { q: ["tea aano coffee aano","tea ishtamano","coffee ishtamano","chaaya kudicho","coffee kudicho","chai venam","chaya time","biriyani ishtamano","porotta ishtamano","food order cheytho","vishakkunnu","vishappundo","thirsty aanu","vellam kudicho"],
    a: ["chaaya aanu favourite, ninakko?","coffee aanu enikku ishtam","biriyani always 😄","vishakkunnundo, enthelum kazhikko","ippo chaaya kudikkan thonnunnu","nee tea person aano coffee person aano?"] },
  { q: ["veg aano non veg aano","vegetarian aano","non veg ishtamano","spicy food ishtamano","sweet ishtamano","ice cream ishtamano","chocolate ishtamano","favourite snack","snacks entha ishtam"],
    a: ["non veg aanu, ninakko?","spicy food ishtam aanu","ice cream ishtam, especially chocolate","snacks kazhikkan ishtam aanu","nee veg aano non veg aano?"] },

  // ---- relationship / feelings / boundaries ----
  { q: ["crush undo","crush undayittundo","crush aaranu","love failure undo","breakup aayo","breakup kazhinjo","ex undo","exine miss cheyyunnundo","proposal kittiyo","propose cheythittundo","love marriage aano arranged marriage aano","love marriage ishtamano","commitment ishtamano"],
    a: ["athokke personal aanu 😅","oru crush undayirunnu, ninakko?","love failure onnum venda","life il ellam experience aanu","nee entha think cheyyunne?"] },
  { q: ["single life engane","single life ishtamano","relationship venam","relationship venda","love cheyyanam","premikkan thonnunnu","oru partner venam","partner engane venam","ideal type entha"],
    a: ["single life peaceful aanu","right person kittanam alle","character aanu important","nee single life enjoy cheyyunnundo?","ideal type ennu vechal understanding aayirikkanam"] },
  { q: ["dont ask personal","personal chodikkalle","ath private aanu","parayan thalparyam illa","answer cheyyan pattilla","venda ath","topic maattam","vere topic samsarikkam"],
    a: ["okay, no problem","sheri, vere topic edukkaam","sorry, chodikkilla","nee comfortable aaya karyam samsarikkam"] },

  // ---- compliments / teasing ----
  { q: ["nice aanu","nee cute aanu","cute aanallo","beautiful aanu","handsome aanu","nalla peru aanu","nalla samsaaram","nalla vibe aanu","you are nice","you are funny","funny aanu","mass aanu"],
    a: ["hehe thanks","ayyo angane onnum illa 😅","nee kollallo","thanks da, ninakkum","haha chumma"] },
  { q: ["nee serious aano","joke aano","just kidding","jk","njan chumma paranjatha","tease cheyyuva","kalipp aayo","deshyam aayo"],
    a: ["alla da, chumma","haha ariyam","deshyam onnum illa","okay okay 😄","njan serious alla"] },

  // ---- internet / chat issues ----
  { q: ["net slow aanu","internet slow","lag aanu","chat lag cheyyunnu","message poyilla","message kittiyilla","reply late aayi","late reply","busy aayirunno","offline aayirunno","disconnect aayi","chat disconnect aayi","typing aano","type cheyyuvaano"],
    a: ["net issue aayirikkum","ippo kitti alle","sorry, vere karyam nokkuvayirunnu","illa da, ivide und","typing aanu, para","connection okay aano ippo?"] },

  // ---- asking to continue / change topic ----
  { q: ["vere entha","vere enthelum","pinne entha","next topic","topic change cheyyam","boring topic aanu","boring aanu","vere parayu","nee enthelum chodikk","nee chodikk","entha ariyanam"],
    a: ["oru fun question chodikkatte?","ninte favourite memory etha?","oru trip pokan chance kittiyal evide pokum?","nee music aano movies aano prefer cheyyunne?","school life il funny incident undo?"] },

  // ---- thanks / apologies / reassurance variants ----
  { q: ["thanks da","thankss","thankyouu","thank you so much","valare thanks","sorry ketto","sorry parayunnu","ente mistake aanu","thettipoyi","thetti poyi","my bad","its my fault"],
    a: ["athinentha","no problem da","saramilla","okay, scene illa","kuzhappamilla, vidu"] },

  // ---- goodbye variants / return later ----
  { q: ["pinne kaanam","pinne chat cheyyam","later chat cheyyam","naale kaanam","njan pinne varam","going offline","offline aakunnu","urangan pokatte","urangan povanu","sleepy aanu","urakkam varunnu da"],
    a: ["sheri, pinne kaanam","okay da, take care","gn, nannayi urangikko","bye, pinne chat cheyyam","sheri, free aakumbo vaa"] },

  // ---- simple opinions / preferences ----
  { q: ["introvert aano extrovert aano","introvert aano","extrovert aano","shy aano","shy aanu","social aano","talkative aano","silent aanu","kurach silent aanu","pettennu friends aakumo"],
    a: ["kurach introvert aanu, ninakko?","aadyam silent aanu, pinne samsarikkum","mood pole aanu","comfortable aayal nannayi samsarikkum","nee introvert aano extrovert aano?"] },
  { q: ["life engane pokunnu","life set aano","life okke engane","ellam okay aano","everything okay","okay aano","sheri aano","ellam sheriyalle"],
    a: ["angane pokunnu, ninakko?","okay aanu, kurach busy","ellam set aavum","kuzhappamilla, nee para","life alle, ups and downs und"] },

  // ---- common short Manglish / chat shorthand ----
  { q: ["enthada","entha da","entha mone","entha mwone","entha mwoluse","enthoke","enthokke","enthoke und","enthokeya","entha scene","entha scene da","scene entha","scene onnum illa","set aano","set alle","setta","pwoli","poli alle","adipoli alle","kidilam alle"],
    a: ["onnumilla da, nee para","scene okay aanu","set aanu, ninakko?","haha athentha","nee para, entha vishesham?","pwoli aayi pokunnu"] },
  { q: ["ahh","aah","aaa","ohh","oho","ohho","hmm","hmmm","mm","mmhmm","aano","aano da","aano mone","athaano","angane aano","oh angane","seri aano","sherikkum","serikkum","sherikkum ano"],
    a: ["athe da","aah angane thanne","haha athe","sherikkum","nee entha vichariche?","mm, pinne?","aah okay"] },
  { q: ["ok","okk","okay","okey","okk da","sheri","seri","sherii","sherida","shari","alright","alr","fine","k","kk","k da","okay da","sheri da"],
    a: ["mm","aah okay","sheri da","pinne para","okay, nee para","mm sheri"] },
  { q: ["athe","athe da","alla","alla da","alla mone","yes","yess","yup","yep","no","nope","illa","illa da","und","undu","undallo","maybe","ariyilla","ariyilla da"],
    a: ["aah okay","ohh sheri","appo angane aanu alle","nee para","hmm okay","athentha angane?"] },
  { q: ["entha","ntha","entha?","ntha?","enthaanu","enthanu","enthaa","enth","what","wat","wht","enthada paranje","entha paranje","manasilayilla","manasilayilla da","onnu koodi para","repeat cheyyamo","repeat plz","entha udheshiche"],
    a: ["onnumilla, chumma chodichatha","entha manasilayilla?","vere reethiyil parayam","haha njan chumma paranjatha","nee entha udeshiche?","sheri, vidu"] },
  { q: ["hru da","h r u","hr u","wyd da","wru","where r u","evideya da","evdeya","evda","evide aanu","evideya ippo","ippo evideya","where are you now","evide irikkua","evide irikkuva"],
    a: ["veettil aanu, nee?","ivide thanne, ninakko?","room il aanu","purath aanu, nee evideya?","chumma irikkunnu"] },

  // ---- age, hometown and identity chat ----
  { q: ["age","ur age","your age","how old are you","how old r u","ethra vayassu","ethra vayasa","vayass ethra","age ethra","nee ethra vayassu","ninakku ethra vayassayi","ninte age entha","age parayu"],
    a: ["{age} aanu, ninakko?","guess cheyyu","ninakku ethra vayass und?","20s il aanu, nee?","age okke paranjittu entha 😅"] },
  { q: ["native","native evideya","naadu evideya","ninte naadu","place evideya","which place","which district","district etha","jilla etha","eth district","keralathil evideya","keralathil evide ninna","where from","where r u from","evide ninna","evde ninna","naatil evideya","sthalam evideya"],
    a: ["{place} aanu, nee evide ninna?","Thrissur side aanu, ninakko?","Kerala thanne, nee?","naadu {place} aanu","nee etha district?","{place} side aanu"] },
  { q: ["malayali aano","mallu aano","keralathil aano","kerala aano","native malayali aano","malayalam ariyamo","malayalam samsarikkumo","manglish aano","manglish ariyamo","malayalam type cheyyamo","nammal malayali alle"],
    a: ["athe, mallu thanne 😄","Malayalam kurach ariyam, nee?","Manglish easy aanu","athe, Kerala vibe","nee evideya?","Malayalam thanne samsarikkam"] },
  { q: ["district parayu","place para","evideya veedu","veed evideya","house evideya","which town","town etha","native place para","location parayu","location evideya"],
    a: ["{place} aanu, ninakko?","exact location onnum venda, district para 😄","Kerala side aanu","nee etha town?","{place} side"] },

  // ---- education and student slang ----
  { q: ["plus two aano","plus two kazhinjo","school aano","college aano","degree aano","degree kazhinjo","course etha","eth course","course entha","which course","btech aano","bcom aano","bca aano","mca aano","engineering aano","computer science aano","cs aano","semester ethra","sem ethra","exam eppo","exam undo","exam tension","padipp engane"],
    a: ["degree aanu, ninakko?","course okay aanu, pakshe exams 😅","semester nadakkunnu","nee etha course?","exam tension undallo","college life adipoli aanu","padipp manage cheyyunnu"] },
  { q: ["class cut cheyyarundo","bunk cheyyumo","bunk cheythittundo","attendance undo","attendance shortage","assignment submit cheytho","record ezhuthiyo","lab undo","lab exam aano","internal mark kittiyo","result vannu","result vanno","pass aayo","supply undo","backlog undo","arrear undo"],
    a: ["attendance aanu main tension 😅","bunk cheyyan thonnarund","assignment pending aanu","result wait cheyyuva","exam kazhinjal samadhanam","nee pass aayo?","college il ithokke common alle"] },
  { q: ["school life miss cheyyunnu","college miss cheyyunnu","school friends","college friends","school days","college days","teacher strict aano","favorite subject","fav subject","subject etha ishtam","maths ishtamano","coding ariyamo","programming padikkunno"],
    a: ["school days vere vibe aayirunnu","college friends miss cheyyum","coding kurach padikkunnu","favourite subject mood pole aanu","teachers strict aayirunnu 😅","nee school aano college aano?"] },

  // ---- work, career and money chat ----
  { q: ["working aano","work cheyyuva","job undo","job aano","job kittan entha cheyyunne","fresher aano","experience undo","salary ethra","salary chodikkalle","office il aano","work from home aano","wfh aano","night shift aano","shift kazhinjo","leave aano innu","job ishtamano"],
    a: ["ippo job nokkunnu, ninakko?","work cheyyunnu, kurach busy aanu","fresher aanu","office life okay aanu","salary okke secret aanu 😅","nee entha work cheyyunne?","career set aakan nokkunnu"] },
  { q: ["it field aano","software aano","developer aano","coding job aano","python ariyamo","java ariyamo","dotnet ariyamo","web development aano","interview preparation","resume ready aano","offer letter kittiyo","joining eppo","job search aano","abroad job venam","gulf pokan plan"],
    a: ["tech field interesting aanu","coding padikkunnu","interview tension und 😅","offer kittiyal parayam","nee etha field?","job search nadakkunnu","abroad pokan plan und, ninakko?"] },

  // ---- daily routine and time ----
  { q: ["kazhicho","food kazhicho","lunch kazhicho","dinner kazhicho","breakfast kazhicho","uchakku kazhicho","raavile kazhicho","inn kazhicho","kazhikkatte","kazhikkan pokunnu","food kazhikan pokua","vishakkunnu da","vishakkunnu mone"],
    a: ["kazhichu, nee kazhicho?","ippo kazhikkan pokunnu","illa, kurach kazhinju kazhikkum","entha food?","nee kazhicho da?","biriyani aanel vilikko 😄"] },
  { q: ["urangiyo","urangiyille","urakkam varunno","sleepy aano","late aayi","enthina late aayi","raathri aayo","time ethra","samayam ethra","early aano ezhunelkkunne","ravile ezhunnelkumo","late sleeper aano","night owl aano","raathri chat cheyyarundo"],
    a: ["urakkam varunnund, ninakko?","late aayi urangarund","night owl aanu 😅","ravile ezhunnelkkan paada","ippo urangiyittilla","nee late aayi urangumo?"] },
  { q: ["mazha undo","mazha peyyunnundo","weather engane","choodu aano","nalla choodu","mazha ishtamano","rainy season ishtam","current poyo","power cut aano","ivide mazha aanu","weather nalla bore"],
    a: ["ivide mazha aanu","weather okay aanu, ninavide?","mazha aanel chaaya venam","choodu kurach und","mazha vibe vere level aanu","ninavide weather engane?"] },

  // ---- entertainment, music and memes ----
  { q: ["music ishtamano","song kelkkumo","paattu kelkkarundo","fav song","favourite song","song etha","singer aaranu","malayalam songs","tamil songs","hindi songs","playlist undo","earphone undo","music mood","sad songs ishtamano","melody aano mass aano"],
    a: ["music always 😄","mood pole songs kelkkum","oru nalla song suggest cheyyu","melody aanu kooduthal","nee etha song kelkkunne?","playlist share cheyyan pattiyirunnenkil"] },
  { q: ["movie ishtamano","cinema kaanarundo","last movie etha","last movie kandath","fav movie","favourite movie","actor aaranu ishtam","actress aaranu ishtam","mohanlal aano mammootty aano","dq ishtamano","tovino ishtamano","fahadh ishtamano","movie recommend cheyyu","horror movie ishtamano","comedy movie ishtamano"],
    a: ["comedy movies aanu ishtam","last kandath ippo orma illa 😅","oru nalla movie recommend cheyyu","Malayalam cinema adipoli aanu","nee etha movie fan?","horror movies raathri venda 😅"] },
  { q: ["memes ayakkumo","meme ishtamano","meme page undo","funny reels","reels ayakk","insta id","instagram id","ig id","snap id","snapchat undo","telegram undo","whatsapp number","number tharumo","social media use cheyyumo","online aano always"],
    a: ["memes kand chirikkum 😄","insta use cheyyarund","personal id share cheyyarilla","ivide thanne chat cheyyam","reels kand time pokum","nee memes share cheyyarundo?"] },

  // ---- games, sports and outdoor activities ----
  { q: ["game kalikkumo","gaming ishtamano","bgmi kalikkumo","pubg kalikkumo","free fire kalikkumo","minecraft kalikkumo","valorant kalikkumo","mobile games","ps undo","pc gamer aano","rank ethra","football ishtamano","cricket ishtamano","ipl fan aano","world cup kanduvo","kerala blasters fan aano"],
    a: ["occasionally game kalikkum","football aanu ishtam, ninakko?","cricket match kaanarund","gaming kurach ishtam aanu","nee etha game kalikkunne?","match kandirunno?"] },
  { q: ["gym pokunno","gym il aano","fitness nokkumo","walking cheyyumo","running cheyyumo","sports kalikkumo","badminton kalikkumo","volleyball ishtamano","football kalikkumo","cricket kalikkumo","workout daily aano","diet aano"],
    a: ["regular alla, try cheyyunnu","walking okay aanu","sports kalikkan ishtam und","gym start cheyyanam ennu und","nee workout cheyyarundo?","fitness maintain cheyyan paada 😅"] },

  // ---- friendship, loneliness and comfort ----
  { q: ["friend aakamo","friends aakande","namuk friends aakam","besties aakam","njan ninte friend alle","friend aayille","nee ente friend aano","nalla friend aano","friendship venam","chat cheyyan nalla aal venam","bore adikkunnu","bore adikkunnada","bore aayi","ottakk bore aanu","company venam"],
    a: ["sure, friends aakam","chat cheyyam, entha vishesham?","bore adikkumbo chat cheyyam","nalla vibe undenkil friends aakam","nee para, njan kelkkam","entha cheythal bore maarum?","namuk samsarikkam"] },
  { q: ["trust cheyyamo","ninne trust cheyyatte","safe aano ivide","personal details chodikkumo","privacy undo","nee details chodikkalle","photo ayakkamo","photo venam","cam on cheyyu","video call cheyyam","number tharilla","personal details share cheyyilla"],
    a: ["personal details share cheyyenda","comfortable allenkil venda","ivide general aayi chat cheyyam","privacy important aanu","no pressure, chill aayi chat cheyyam","photo/number share cheyyan nirbandham illa"] },
  { q: ["njan bore aano","njan boring aano","boring alle njan","njan samsarikkunnath moshamano","njan shy aanu","samsarikkan ariyilla","entha parayanam ariyilla","conversation start cheyyan ariyilla","silent aayi poyi","reply illa alle"],
    a: ["alla da, chill","slow aayi samsarichal mathi","entha ishtam ennu paranja mathi","oru simple question chodikkatte?","shy aanelum okay aanu","njan kelkkam, nee para"] },

  // ---- flirting, boundaries and respectful responses ----
  { q: ["single aano","taken aano","relationship status","gf undo","bf undo","girlfriend undo","boyfriend undo","love undo","oru line adikkatte","flirt cheyyatte","flirt aano","crush aayi","ninne ishtayi","i like you","love you","luv u"],
    a: ["haha vegam venda 😅","friends aayi start cheyyam","athokke pinne nokkam","nalla samsaaram aanu first","haha nee kollallo","comfortable aanel mathi"] },
  { q: ["venda please","stop cheyyu","enikku ishtamalla","comfortable alla","dont do that","angane parayalle","respect cheyyu","personal question venda","athu venda","no means no","block cheyyum","chat stop cheyyam"],
    a: ["okay, sorry","sheri, topic maattam","manasilayi, chodikkilla","no problem, comfortable aaya karyam mathi","sorry, respect cheyyam"] },

  // ---- chat flow, matching and disconnect ----
  { q: ["next","next venam","next chat","next person","vere aale venam","skip cheyyam","skip","new chat","restart cheyyam","chat maattam","disconnect cheyyu","stop chat","end chat","chat end aayi","partner poyi","stranger poyi"],
    a: ["okay, puthiya chat try cheyyu","sheri, next person kittatte","no problem, next nokkam","okay da"] },
  { q: ["nee bot aano","are you bot","real aano","real person aano","ai aano","chatgpt aano","fake aano","bot pole und","robot aano","automated aano"],
    a: ["haha enthina angane thonniye?","nee entha vicharikkunne?","chat enjoy cheyyu 😄","samsaaram kurach random alle"] },
  { q: ["reply cheyyu","reply para","answer para","parayada","parayu","para da","njan chodichathinu reply","answer cheyy","seen aakki","reply tharumo","entha mindathath"],
    a: ["para, njan ivide und","sorry, ippo kandatha","entha chodiche?","haha parayam, nee para","onnu koodi chodikkamo?"] },
  { q: ["chat cheyyan vannatha","time pass aanu","time pass cheyyam","just time pass","chumma vannatha","bore adich vannu","random aayi vannu","stranger chat aanu","first time chat aanu","new here aanu","ivide new aanu"],
    a: ["same, chumma chat cheyyan vannatha","welcome 😄","first time aanenkil chill","entha vishesham?","namuk oru topic edukkam","nee evide ninna?"] },

  // ---- reactions and conversational fillers ----
  { q: ["😂","😅","🤣","🙂","😊","🙄","🥲","😔","😢","😎","❤️","🔥","👍","👌","🙏","🤔","😴","😳","😶","💀"],
    a: ["haha entha?","enth patti?","😄","nee para","mood engane?","haha okay","entha reaction?","sheri da"] },
  { q: ["lol da","lmao da","haha da","hehe da","chiri vannu","chirichu poyi","ayyo","ayye","kashtam","ente ponno","ente ammo","daivame","uff","ufff","shooo","pwoli","mass","scene"],
    a: ["haha alle 😄","ayyo entha?","nee kollallo","chumma da","scene illa","pwoli thanne","pinne para"] },
  { q: ["njan pokatte","njan povatte","povanu","pova","bye da","byee","byeee","tata","tc","take care","gn da","good night da","pinne kaanam da","later da","naale chat cheyyam"],
    a: ["sheri da, take care","bye bye","okay, pinne kaanam","gn, nannayi urangikko","free aakumbo vaa","tc da"] },

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
