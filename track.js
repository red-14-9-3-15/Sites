import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  onDisconnect
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

const app = initializeApp({
    apiKey: "AIzaSyD9RhYzJWkQH8gGND8l789vcCbIuoRrAck",
    authDomain: "analytics-30348.firebaseapp.com",
    databaseURL: "https://analytics-30348-default-rtdb.firebaseio.com",
    projectId: "analytics-30348",
    storageBucket: "analytics-30348.firebasestorage.app",
    messagingSenderId: "347909671043",
    appId: "1:347909671043:web:7c137f6cf2b3d353e473b6",
    measurementId: "G-TMSJEDDJCW"
});
const db = getDatabase(app);

const now = new Date();
const ts = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}+${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
const pageId = window.location.pathname.split("/").filter(Boolean).pop().split(".")[0];
const statsRef = ref(db, `userStats/user_${ts}_${pageId}`);
let t0 = Date.now();
const samples = [];

// (1) initial onDisconnect registration:
// onDisconnect(statsRef).set([])

const scrollPct = () => {
    const h = document.documentElement, b = document.body,
        st = h.scrollTop || b.scrollTop,
        sh = (h.scrollHeight || b.scrollHeight) - h.clientHeight;
    return sh > 0 ? st / sh * 100 : 0;
};

setInterval(() => {
    const now = Date.now();
    samples.push({
      elapsed: now - t0,
      timestamp: new Date().toISOString(),
      vw: innerWidth,
      vh: innerHeight,
      scrollPercent: scrollPct()
    });
    set(statsRef, samples)       // LIVE
      .catch(console.error);
  }, 1000);
