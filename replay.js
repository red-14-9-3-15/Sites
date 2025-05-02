import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";

// — your Firebase config —
const firebaseConfig = {
    apiKey: "AIzaSyD9RhYzJWkQH8gGND8l789vcCbIuoRrAck",
    authDomain: "analytics-30348.firebaseapp.com",
    databaseURL: "https://analytics-30348-default-rtdb.firebaseio.com",
    projectId: "analytics-30348",
    storageBucket: "analytics-30348.firebasestorage.app",
    messagingSenderId: "347909671043",
    appId: "1:347909671043:web:7c137f6cf2b3d353e473b6",
    measurementId: "G-TMSJEDDJCW"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const userRef = ref(db, 'userStats/user_1746229705369');

let userStats = [];
let height = 0;
let time = 0;
let currentY = 0;
let targetY = 0;
let startTime = null;
const duration = 1000; // ms per segment

// 1) Fetch once, convert to array if needed
async function loadUserStats() {
    const snap = await get(userRef);
    if (!snap.exists()) throw new Error('No userStats found');
    const val = snap.val();
    userStats = Array.isArray(val) ? val : Object.values(val);
}

// 2) Kick off animation when both DOM + data are ready
window.addEventListener('load', async () => {
    try {
        await loadUserStats();
        height = document.documentElement.scrollHeight;
        nextTarget();
        requestAnimationFrame(animateScroll);
    } catch (e) {
        console.error(e);
    }
});

function nextTarget() {
    if (time == 0) {
        console.log("Animation started; " + userStats.length + " seconds");
    }
    if (time < userStats.length) {
        targetY = (userStats[time].scrollPercent / 100) * height;
        startTime = null;
        time += 1;
    }
    else {
        console.log("Animation complete");
    }
}

function animateScroll(timestamp) {
    if (startTime === null) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const newY = currentY + (targetY - currentY) * progress;
    window.scrollTo(0, newY);

    if (progress < 1) {
        requestAnimationFrame(animateScroll);
    } else {
        currentY = targetY;
        if (time < userStats.length) {
            setTimeout(() => {
                nextTarget();
                requestAnimationFrame(animateScroll);
            }, 100);
        }
    }
}
