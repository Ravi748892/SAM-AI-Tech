// Song data
const songs = [
  {
    title: "Midnight Dreams",
    artist: "Luna Eclipse",
    album: "Starlight Sessions",
    duration: "3:45",
    durationSec: 225,
    image: "https://picsum.photos/seed/song1/300/300",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    title: "Ocean Waves",
    artist: "Coastal Vibes",
    album: "Beach Sunset",
    duration: "4:12",
    durationSec: 252,
    image: "https://picsum.photos/seed/song2/300/300",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    title: "Electric Pulse",
    artist: "Neon Circuit",
    album: "Digital Future",
    duration: "3:58",
    durationSec: 238,
    image: "https://picsum.photos/seed/song3/300/300",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  },
  {
    title: "Mountain Echo",
    artist: "Forest Whisper",
    album: "Nature's Call",
    duration: "5:23",
    durationSec: 323,
    image: "https://picsum.photos/seed/song4/300/300",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
  },
  {
    title: "Urban Nights",
    artist: "City Lights",
    album: "Metropolitan",
    duration: "4:01",
    durationSec: 241,
    image: "https://picsum.photos/seed/song5/300/300",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
  }
];

// DOM Elements
const audioPlayer = document.getElementById('audioPlayer');
const playBtn = document.getElementById('playBtn');
const playIcon = document.getElementById('playIcon');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const repeatBtn = document.getElementById('repeatBtn');
const muteBtn = document.getElementById('muteBtn');
const volumeIcon = document.getElementById('volumeIcon');
const progressBar = document.getElementById('progressBar');
const progressFill = document.getElementById('progressFill');
const progressThumb = document.getElementById('progressThumb');
const currentTimeEl = document.getElementById('currentTime');
const totalDurationEl = document.getElementById('totalDuration');
const volumeBar = document.getElementById('volumeBar');
const volumeFill = document.getElementById('volumeFill');
const volumeThumb = document.getElementById('volumeThumb');
const volPercent = document.getElementById('volPercent');
const songTitle = document.getElementById('songTitle');
const artistName = document.getElementById('artistName');
const albumName = document.getElementById('albumName');
const albumImage = document.getElementById('albumImage');
const albumArt = document.getElementById('albumArt');
const bgBlur = document.getElementById('bgBlur');
const likeBtn = document.getElementById('likeBtn');
const playlist = document.getElementById('playlist');
const searchInput = document.getElementById('searchInput');
const songCountEl = document.getElementById('songCount');
const totalPlaylistTimeEl = document.getElementById('totalPlaylistTime');

// State
let currentSongIndex = 0;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;
let isMuted = false;
let volume = 0.7;
let previousVolume = 0.7;
let likedSongs = new Set();
let filteredSongs = [...songs.keys()];

// Initialize
function init() {
  loadSong(currentSongIndex);
  renderPlaylist();
  setVolume(volume);
  updatePlaylistStats();
  setupEventListeners();
}

// Load song
function loadSong(index) {
  const song = songs[index];
  audioPlayer.src = song.audio;
  songTitle.textContent = song.title;
  artistName.textContent = song.artist;
  albumName.textContent = song.album;
  albumImage.src = song.image;
  totalDurationEl.textContent = song.duration;
  bgBlur.style.backgroundImage = `url(${song.image})`;

  // Update like button
  if (likedSongs.has(index)) {
    likeBtn.innerHTML = '<i class="fa-solid fa-heart"></i>';
    likeBtn.classList.add('liked');
  } else {
    likeBtn.innerHTML = '<i class="fa-regular fa-heart"></i>';
    likeBtn.classList.remove('liked');
  }

  updatePlaylistActive();
}

// Play/Pause
function togglePlay() {
  if (isPlaying) pause();
  else play();
}

function play() {
  audioPlayer.play();
  isPlaying = true;
  playIcon.classList.remove('fa-play');
  playIcon.classList.add('fa-pause');
  albumArt.classList.add('playing');
}

function pause() {
  audioPlayer.pause();
  isPlaying = false;
  playIcon.classList.remove('fa-pause');
  playIcon.classList.add('fa-play');
  albumArt.classList.remove('playing');
}

// Next/Previous
function nextSong() {
  if (isShuffle) {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * songs.length);
    } while (newIndex === currentSongIndex && songs.length > 1);
    currentSongIndex = newIndex;
  } else {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
  }
  loadSong(currentSongIndex);
  if (isPlaying) play();
}

function prevSong() {
  if (audioPlayer.currentTime > 3) {
    audioPlayer.currentTime = 0;
  } else {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    if (isPlaying) play();
  }
}

// Progress bar
function updateProgress() {
  const { currentTime, duration } = audioPlayer;
  if (duration) {
    const percent = (currentTime / duration) * 100;
    progressFill.style.width = percent + '%';
    progressThumb.style.left = percent + '%';
    currentTimeEl.textContent = formatTime(currentTime);
  }
}

function setProgress(e) {
  const rect = progressBar.getBoundingClientRect();
  const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  audioPlayer.currentTime = percent * audioPlayer.duration;
}

// Volume
function setVolume(value) {
  volume = Math.max(0, Math.min(1, value));
  audioPlayer.volume = volume;
  volumeFill.style.width = (volume * 100) + '%';
  volumeThumb.style.left = (volume * 100) + '%';
  volPercent.textContent = Math.round(volume * 100) + '%';

  if (volume === 0) {
    volumeIcon.className = 'fa-solid fa-volume-xmark';
    isMuted = true;
  } else if (volume < 0.5) {
    volumeIcon.className = 'fa-solid fa-volume-low';
    isMuted = false;
  } else {
    volumeIcon.className = 'fa-solid fa-volume-high';
    isMuted = false;
  }
}

function toggleMute() {
  if (isMuted) {
    setVolume(previousVolume || 0.7);
  } else {
    previousVolume = volume;
    setVolume(0);
  }
}

function handleVolumeClick(e) {
  const rect = volumeBar.getBoundingClientRect();
  const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  setVolume(percent);
}

// Shuffle/Repeat
function toggleShuffle() {
  isShuffle = !isShuffle;
  shuffleBtn.classList.toggle('active', isShuffle);
}

function toggleRepeat() {
  isRepeat = !isRepeat;
  repeatBtn.classList.toggle('active', isRepeat);
  audioPlayer.loop = isRepeat;
}

// Like
function toggleLike() {
  if (likedSongs.has(currentSongIndex)) {
    likedSongs.delete(currentSongIndex);
    likeBtn.innerHTML = '<i class="fa-regular fa-heart"></i>';
    likeBtn.classList.remove('liked');
  } else {
    likedSongs.add(currentSongIndex);
    likeBtn.innerHTML = '<i class="fa-solid fa-heart"></i>';
    likeBtn.classList.add('liked');
  }
}

// Playlist
function renderPlaylist() {
  playlist.innerHTML = '';
  filteredSongs.forEach((songIndex) => {
    const song = songs[songIndex];
    const item = document.createElement('div');
    item.className = 'playlist-item' + (songIndex === currentSongIndex ? ' active' : '');
    item.dataset.index = songIndex;
    item.innerHTML = `
      <span class="playlist-item-number">${songIndex + 1}</span>
      <img src="${song.image}" alt="${song.title}">
      <div class="playlist-item-info">
        <div class="playlist-item-title">${song.title}</div>
        <div class="playlist-item-artist">${song.artist} &bull; ${song.album}</div>
      </div>
      <div class="playlist-item-duration">${song.duration}</div>
    `;
    playlist.appendChild(item);
  });
}

function updatePlaylistActive() {
  document.querySelectorAll('.playlist-item').forEach((item) => {
    const idx = parseInt(item.dataset.index);
    item.classList.toggle('active', idx === currentSongIndex);
  });
}

function playSongFromPlaylist(e) {
  const item = e.target.closest('.playlist-item');
  if (item) {
    const index = parseInt(item.dataset.index);
    currentSongIndex = index;
    loadSong(currentSongIndex);
    play();
  }
}

// Search
function handleSearch(e) {
  const query = e.target.value.toLowerCase().trim();
  if (query === '') {
    filteredSongs = [...songs.keys()];
  } else {
    filteredSongs = songs
      .map((song, i) => ({ song, i }))
      .filter(({ song }) =>
        song.title.toLowerCase().includes(query) ||
        song.artist.toLowerCase().includes(query) ||
        song.album.toLowerCase().includes(query)
      )
      .map(({ i }) => i);
  }
  renderPlaylist();
  updatePlaylistStats();
}

// Stats
function updatePlaylistStats() {
  const count = filteredSongs.length;
  songCountEl.textContent = `${count} Song${count !== 1 ? 's' : ''}`;
  const totalSec = filteredSongs.reduce((sum, i) => sum + songs[i].durationSec, 0);
  const mins = Math.floor(totalSec / 60);
  const secs = totalSec % 60;
  totalPlaylistTimeEl.textContent = `${mins}:${secs.toString().padStart(2, '0')} total`;
}

// Utility
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Event Listeners
function setupEventListeners() {
  playBtn.addEventListener('click', togglePlay);
  prevBtn.addEventListener('click', prevSong);
  nextBtn.addEventListener('click', nextSong);
  shuffleBtn.addEventListener('click', toggleShuffle);
  repeatBtn.addEventListener('click', toggleRepeat);
  muteBtn.addEventListener('click', toggleMute);
  likeBtn.addEventListener('click', toggleLike);
  playlist.addEventListener('click', playSongFromPlaylist);
  searchInput.addEventListener('input', handleSearch);

  progressBar.addEventListener('click', setProgress);
  volumeBar.addEventListener('click', handleVolumeClick);

  audioPlayer.addEventListener('timeupdate', updateProgress);
  audioPlayer.addEventListener('ended', () => {
    if (!isRepeat) nextSong();
  });

  // Keyboard controls
  document.addEventListener('keydown', (e) => {
    // Don't trigger shortcuts when typing in search
    if (document.activeElement === searchInput) return;

    if (e.code === 'Space') {
      e.preventDefault();
      togglePlay();
    } else if (e.code === 'ArrowRight') {
      nextSong();
    } else if (e.code === 'ArrowLeft') {
      prevSong();
    } else if (e.code === 'ArrowUp') {
      e.preventDefault();
      setVolume(volume + 0.1);
    } else if (e.code === 'ArrowDown') {
      e.preventDefault();
      setVolume(volume - 0.1);
    } else if (e.code === 'KeyM') {
      toggleMute();
    }
  });

  // Drag progress
  let isDraggingProgress = false;
  progressBar.addEventListener('mousedown', (e) => {
    isDraggingProgress = true;
    setProgress(e);
  });
  document.addEventListener('mousemove', (e) => {
    if (isDraggingProgress) setProgress(e);
  });
  document.addEventListener('mouseup', () => {
    isDraggingProgress = false;
  });

  // Drag volume
  let isDraggingVolume = false;
  volumeBar.addEventListener('mousedown', (e) => {
    isDraggingVolume = true;
    handleVolumeClick(e);
  });
  document.addEventListener('mousemove', (e) => {
    if (isDraggingVolume) handleVolumeClick(e);
  });
  document.addEventListener('mouseup', () => {
    isDraggingVolume = false;
  });
}

// Start
init();