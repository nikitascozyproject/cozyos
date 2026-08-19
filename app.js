import { auth, db } from "./firebase.js";

import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const app=document.getElementById("app");

const tracks=[
"Morning Light",
"Soft Breeze",
"Cozy Corners",
"Little Moments",
"Quiet Afternoon",
"Gentle Rain",
"Slow Sunday",
"Tiny Lanterns",
"Peaceful Steps",
"Home Glow"
];

onAuthStateChanged(auth,user=>{
  if(user){
    renderDashboard(user);
  }else{
    renderLogin();
  }
});

function renderLogin(){

app.innerHTML=`
<div class="card">

<h1>☁️ CozyOS</h1>
<p class="small">Turn today's gameplay into content.</p>

<input id="email" placeholder="Email">

<input id="password" type="password" placeholder="Password">

<div class="row">
<button id="signup">Create Account</button>
<button id="login">Log In</button>
</div>

</div>`;

signup.onclick=()=>createUserWithEmailAndPassword(auth,email.value,password.value).catch(e=>alert(e.message));

login.onclick=()=>signInWithEmailAndPassword(auth,email.value,password.value).catch(e=>alert(e.message));

}

function renderDashboard(user){

app.innerHTML=`
<div class="card">

<div class="row">

<div>
<h1>Good evening ☁️</h1>
<div class="small">${user.email}</div>
</div>

<button id="logout">Logout</button>

</div>

</div>

<div class="card">

<h2>Start Today's Session</h2>

<input id="game" placeholder="Game name">

<button id="createSession">Create Session</button>

</div>

<div class="card">

<h2>Recent Sessions</h2>

<div id="sessions"></div>

</div>

<div class="card">

<div class="row">

<h2>Music Vault</h2>

<span class="pill">Unused first</span>

</div>

<div id="music"></div>

</div>`;

logout.onclick=()=>signOut(auth);

const used=new Set(JSON.parse(localStorage.getItem("usedTracks")||"[]"));

function renderMusic(){

music.innerHTML="";

tracks.forEach(track=>{

const row=document.createElement("div");
row.className="track";

const name=document.createElement("span");
name.textContent=track;

const button=document.createElement("button");

const isUsed=used.has(track);

button.textContent=isUsed?"Used":"Unused";

if(isUsed) button.classList.add("used");

button.onclick=()=>{

if(used.has(track)){

used.delete(track);

}else{

used.add(track);

}

localStorage.setItem("usedTracks",JSON.stringify([...used]));

renderMusic();

};

row.append(name,button);

music.appendChild(row);

});

}

renderMusic();

createSession.onclick=async()=>{

if(!game.value.trim()) return;

await addDoc(collection(db,"users",user.uid,"sessions"),{

game:game.value,
date:new Date().toLocaleDateString(),
created:Date.now()

});

game.value="";

};

const q=query(collection(db,"users",user.uid,"sessions"),orderBy("created","desc"));

onSnapshot(q,snap=>{

sessions.innerHTML="";

snap.docs.forEach(doc=>{

const s=doc.data();

const div=document.createElement("div");

div.className="session";

div.innerHTML=`
<div>
<strong>${s.game}</strong>
<div class="small">${s.date}</div>
</div>

<span>Open</span>`;

sessions.appendChild(div);

});

});

}