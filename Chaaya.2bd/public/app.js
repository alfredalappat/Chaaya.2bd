const $ = id => document.getElementById(id);
let ws, state = 'idle', typingTimer, lastTyping = 0, toastTimer;

function toast(t){const e=$('toast');e.textContent=t;e.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>e.hidden=true,2200)}
function fitChat(){
  const chat=$('chat'),vv=window.visualViewport;
  if(chat.hidden||!vv){chat.style.height='';return}
  chat.style.height=vv.height+'px';window.scrollTo(0,0);scrollDown();
}
function showView(v){$('landing').hidden=v!=='landing';$('chat').hidden=v!=='chat';window.scrollTo(0,0);fitChat()}
if(window.visualViewport){visualViewport.addEventListener('resize',fitChat);visualViewport.addEventListener('scroll',fitChat)}
function setReady(on){['msgInput','sendBtn','photoBtn'].forEach(i=>$(i).disabled=!on);if(on)$('msgInput').focus()}
function setState(s,label){state=s;$('status').textContent=label;$('status').classList.toggle('live',s==='chatting');setReady(s==='chatting')}

const box=$('messages');
function scrollDown(){box.scrollTop=box.scrollHeight}
function add(cls,text){const d=document.createElement('div');d.className='msg '+cls;d.textContent=text;box.appendChild(d);scrollDown()}
function addPhoto(cls,src){
  const d=document.createElement('div');d.className='msg photo '+cls;
  const sq=document.createElement('div');sq.className='sq';
  const im=document.createElement('img');im.src=src;im.alt='Shared photo';
  sq.appendChild(im);d.appendChild(sq);box.appendChild(d);scrollDown();
}
function clearChat(){box.innerHTML='';$('typing').hidden=true}

function connect(cb){
  if(ws&&ws.readyState===1)return cb&&cb();
  ws=new WebSocket((location.protocol==='https:'?'wss://':'ws://')+location.host);
  ws.onopen=()=>cb&&cb();
  ws.onmessage=e=>{
    const m=JSON.parse(e.data);
    if(m.t==='online'){$('onlineLanding').textContent=m.n}
    else if(m.t==='searching'){setState('searching','Looking for someone…');add('sys','Looking for a stranger…')}
    else if(m.t==='matched'){clearChat();setState('chatting','Connected');add('sys','You are connected. Say hi! 👋')}
    else if(m.t==='msg'){$('typing').hidden=true;add('them',m.text)}
    else if(m.t==='img'&&m.data.startsWith('data:image/jpeg;base64,')){addPhoto('them',m.data)}
    else if(m.t==='typing'){$('typing').hidden=!m.on;scrollDown()}
    else if(m.t==='left'){$('typing').hidden=true;setState('ended','Disconnected');add('sys','Stranger has left. Tap Next to find someone new.')}
  };
  ws.onclose=()=>{if(!$('chat').hidden){setState('ended','Connection lost');add('sys','Connection lost. Tap Next to reconnect.')}else setTimeout(()=>connect(),2000)};
}
const tx=o=>ws&&ws.readyState===1&&ws.send(JSON.stringify(o));

function findNext(){clearChat();setState('searching','Looking for someone…');connect(()=>tx({t:'join'}))}
function goHome(){tx({t:'leave'});setState('idle','');showView('landing')}

// Landing
$('ageCheck').onchange=()=>{if($('ageCheck').checked)$('ageWarn').hidden=true};
$('startText').onclick=()=>{
  if(!$('ageCheck').checked){$('ageWarn').hidden=false;return}
  history.pushState({v:'chat'},'');showView('chat');findNext();
};
$('startVideo').onclick=()=>toast('Video chat is coming soon! 🎥');

// Phone back button: chat -> home
history.replaceState({v:'home'},'');
window.addEventListener('popstate',()=>{if(!$('chat').hidden)goHome()});
$('stopBtn').onclick=()=>{if(history.state&&history.state.v==='chat')history.back();else goHome()};
$('nextBtn').onclick=findNext;

// Sending keeps the keyboard open
function sendMsg(){
  const t=$('msgInput').value.trim();
  if(t&&state==='chatting'){tx({t:'msg',text:t});add('me',t);$('msgInput').value=''}
  $('msgInput').focus();
}
$('msgInput').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();sendMsg()}});
$('sendBtn').addEventListener('click',sendMsg);
$('sendBtn').addEventListener('mousedown',e=>e.preventDefault());
$('sendBtn').addEventListener('touchstart',e=>{e.preventDefault();sendMsg()},{passive:false});
$('msgInput').oninput=()=>{
  if(state!=='chatting'||Date.now()-lastTyping<1500)return;
  lastTyping=Date.now();tx({t:'typing',on:true});
  clearTimeout(typingTimer);typingTimer=setTimeout(()=>tx({t:'typing',on:false}),2000);
};

// Photo: center-crop to a square before sending
$('photoBtn').onclick=()=>$('file').click();
$('file').onchange=e=>{
  const f=e.target.files[0];e.target.value='';
  if(!f||!f.type.startsWith('image/'))return;
  const img=new Image(),url=URL.createObjectURL(f);
  img.onload=()=>{
    const s=Math.min(img.width,img.height),S=480,c=document.createElement('canvas');
    c.width=c.height=S;
    c.getContext('2d').drawImage(img,(img.width-s)/2,(img.height-s)/2,s,s,0,0,S,S);
    const data=c.toDataURL('image/jpeg',.8);URL.revokeObjectURL(url);
    if(state==='chatting'){tx({t:'img',data});addPhoto('me',data)}
  };
  img.onerror=()=>toast('Could not read that photo');
  img.src=url;
};

connect(); // loads the live online counter
