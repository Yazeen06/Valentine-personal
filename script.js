const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");
const timeDisplay = document.getElementById("time");
const result = document.getElementById("result");

/* ---------- TIMER ---------- */
let startTime = Date.now();
const timerInterval = setInterval(() => {
  timeDisplay.textContent = ((Date.now() - startTime) / 1000).toFixed(1);
}, 100);

/* ---------- FLOATING BUTTONS ---------- */
function moveButton(btn) {
  const maxX = window.innerWidth - btn.offsetWidth - 20;
  const maxY = window.innerHeight - btn.offsetHeight - 20;
  btn.style.left = Math.random() * maxX + "px";
  btn.style.top = Math.random() * maxY + "px";
}

window.onload = () => {
  moveButton(yesBtn);
  moveButton(noBtn);
  setInterval(() => moveButton(yesBtn), 1400);
  setInterval(() => moveButton(noBtn), 900);
};

document.addEventListener("mousemove", e => {
  const r = noBtn.getBoundingClientRect();
  const d = Math.hypot(
    e.clientX - (r.left + r.width / 2),
    e.clientY - (r.top + r.height / 2)
  );

  if (d < 120) moveButton(noBtn);
});

/* ---------- NO BUTTON ---------- */
noBtn.onclick = () => {
  result.textContent = "Are you sure? 😏";
};

/* ---------- MEMORY DATA ---------- */
const memories = [
  { src: "assets/images/image11.jpeg", name: "H3 310" },
  { src: "assets/images/image12.jpeg", name: "Maybe consider it as first date" },
  { src: "assets/images/image13.jpeg", name: "Kodai" },
  { src: "assets/images/image14.jpeg", name: "Jr Gopu" },
  { src: "assets/images/image15.jpeg", name: "Jr Gopuu" },
  { src: "assets/images/image16.jpeg", name: "Bharani Bhavan" }
];

/* ---------- MUSIC DATA ---------- */
const songs = [
  { src: "assets/images/audio1.mp3", name: "Our Song 💖" },
  { src: "assets/images/audio2.mp3", name: "Your Fav ✨" },
  // { src: "assets/music/song3.mp3", name: "Mine 🎵" }
];

let currentAudio = null;

/* ---------- YES BUTTON ---------- */
yesBtn.onclick = () => {
  clearInterval(timerInterval);

  yesBtn.remove();
  noBtn.remove();

  const overlay = document.createElement("div");
  overlay.className = "overlay";
  document.body.appendChild(overlay);

  showMenu(overlay, timeDisplay.textContent);

  setTimeout(() => (overlay.style.opacity = "1"), 50);
};

/* ---------- BACK BUTTON ---------- */
function backButton(overlay, timeTaken) {
  const back = document.createElement("button");
  back.className = "back-btn";
  back.textContent = "← Back";

  back.onclick = () => showMenu(overlay, timeTaken);

  return back;
}

/* ========================================================
   MAIN MENU
======================================================== */
function showMenu(overlay, timeTaken) {
  overlay.innerHTML = `
    <div class="menu">
      <h2>She said YES in ${timeTaken}s 💖</h2>

      <div class="menu-grid">

        <div class="menu-card" id="memories">
          <span>💕</span>Memories
        </div>

        <div class="menu-card" id="music">
          <span>🎵</span>Music
        </div>

        <div class="menu-card" id="note">
          <span>💌</span>Love Note
        </div>

        <div class="menu-card" id="game">
          <span>🎮</span>Find ME
        </div>

      </div>
    </div>
  `;

  document.getElementById("memories").onclick = () =>
    showMemories(overlay, timeTaken);

  document.getElementById("music").onclick = () =>
    showMusic(overlay, timeTaken);

  document.getElementById("note").onclick = () =>
    showLoveNote(overlay, timeTaken);

  document.getElementById("game").onclick = () =>
    showGame(overlay, timeTaken);
}

/* ========================================================
   MEMORIES SECTION
======================================================== */
function showMemories(overlay, timeTaken) {
  overlay.innerHTML = "";

  const back = backButton(overlay, timeTaken);

  const playlist = document.createElement("div");
  playlist.className = "playlist";

  memories.forEach(m => {
    const track = document.createElement("div");
    track.className = "track";

    track.innerHTML = `
      <img src="${m.src}">
      <p>${m.name}</p>
      <span class="play-icon">▶</span>
    `;

    track.onclick = () => showPhoto(m.src);

    playlist.appendChild(track);
  });

  /* Extra box after memories */
  const noteBox = document.createElement("div");
  noteBox.className = "track";
  noteBox.innerHTML = `
      <p> Sorry Gopusee I have this much pictures of you </p>
  `;

  playlist.appendChild(noteBox);

  overlay.appendChild(back);
  overlay.appendChild(playlist);
}

/* ---------- PHOTO POPUP ---------- */
function showPhoto(src) {
  const popup = document.createElement("div");
  popup.className = "photo-popup";

  popup.innerHTML = `
    <span class="close-btn">&times;</span>
    <img src="${src}">
  `;

  popup.querySelector(".close-btn").onclick = () => popup.remove();

  popup.onclick = e => {
    if (e.target === popup) popup.remove();
  };

  document.body.appendChild(popup);
}

/* ========================================================
   MUSIC SECTION
======================================================== */
function showMusic(overlay, timeTaken) {
  overlay.innerHTML = "";

  const back = backButton(overlay, timeTaken);

  const list = document.createElement("div");
  list.className = "playlist";

  songs.forEach(song => {
    const track = document.createElement("div");
    track.className = "track";

    track.innerHTML = `
      <p>${song.name}</p>
      <span class="play-icon">▶</span>
    `;

    track.onclick = () => playSong(song.src);

    list.appendChild(track);
  });

  /* STOP BUTTON */
  const stopBtn = document.createElement("button");
  stopBtn.className = "back-btn";
  stopBtn.textContent = "⏹ Stop Music";

  stopBtn.onclick = () => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
  };

  overlay.appendChild(back);
  overlay.appendChild(list);
  overlay.appendChild(stopBtn);
}

function playSong(src) {
  if (currentAudio) {
    currentAudio.pause();
  }

  currentAudio = new Audio(src);
  currentAudio.play();
}

/* ========================================================
   LOVE NOTE SECTION
======================================================== */
function showLoveNote(overlay, timeTaken) {
  overlay.innerHTML = "";

  const back = backButton(overlay, timeTaken);

  const box = document.createElement("div");
  box.className = "playlist";

  box.innerHTML = `
    <div class="track">
      <p style="line-height:1.6">
        Pardon me for my bad grammar,<br>
        I dont know how i became this dependent on you,I dont have a 60LPA job or good looks you dream about,<br>
        Yet i'm always chasing you.<br>
        I know i'm the one who always delivers cringe romantic dialogues,touchy touchy person,immature,ugly guy,<br>
        but this guy loves gopika mohan a lotttt<br>

        I'm not the type of guy you want but i'll try my best to be the best version of myself.,<br>
        
        After all these blah blah blah things I assure you i'll be there for you whenever you need me.<br>
        Last but the least "I love you gopuseeeeee".<br>

        Happy Valentine's Day my beautiful Valentine ".<br>
      </p>
    </div>
  `;

  overlay.appendChild(back);
  overlay.appendChild(box);
}

/* ========================================================
   GAME SECTION (UNCHANGED)
======================================================== */
function showGame(overlay, timeTaken) {
  overlay.innerHTML = "";

  const back = backButton(overlay, timeTaken);

  const game = document.createElement("div");
  game.className = "game-container";

  const img = document.createElement("img");
  img.src = "assets/images/bro.jpeg";
  img.className = "game-image";

  const grid = document.createElement("div");
  grid.className = "card-grid";

  const message = document.createElement("div");
  message.className = "game-text";

  let clicks = 0;

  for (let i = 0; i < 64; i++) {
    const card = document.createElement("div");
    card.className = "card";

    card.onclick = () => {
      if (card.classList.contains("revealed")) return;

      card.classList.add("revealed");
      clicks++;

      if (clicks === 10) {
        img.style.opacity = "1";
        message.textContent = "Happy Valeninte's Day Gopusee";
      }
    };

    grid.appendChild(card);
  }

  game.appendChild(img);
  game.appendChild(grid);

  overlay.appendChild(back);
  overlay.appendChild(game);

  const hint = document.createElement("p");
  hint.className = "game-hint";
  hint.innerText = "Click on the boxes… you will see some magic ✨";

  overlay.appendChild(hint);
  overlay.appendChild(message);
}
