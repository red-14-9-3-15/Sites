import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getDatabase, ref, onDisconnect } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

const db = initializeApp({
    apiKey: "AIzaSyD9RhYzJWkQH8gGND8l789vcCbIuoRrAck",
    authDomain: "analytics-30348.firebaseapp.com",
    databaseURL: "https://analytics-30348-default-rtdb.firebaseio.com",
    projectId: "analytics-30348",
    storageBucket: "analytics-30348.firebasestorage.app",
    messagingSenderId: "347909671043",
    appId: "1:347909671043:web:7c137f6cf2b3d353e473b6",
    measurementId: "G-TMSJEDDJCW"
}), dbRef = ref(getDatabase(db), "userStats/user_" + Date.now());

let t0 = Date.now(), samples = [];

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
    onDisconnect(dbRef)
        .set(samples)
        .then(() => console.log("onDisconnect updated"))
        .catch(console.error);
}, 1000);