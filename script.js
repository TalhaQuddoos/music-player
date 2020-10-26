const image = document.querySelector('img')
const title = document.getElementById('title')
const author = document.getElementById('author')
const audio = document.querySelector("audio")
const prevBtn = document.getElementById("prev")
const playBtn = document.getElementById("play")
const nextBtn = document.getElementById("next")
const durationEl = document.getElementById("duration")
const currentTimeEl = document.getElementById("current-time")
const progress = document.getElementById("progress")
const progressContainer = document.getElementById('progress-container')
const playList = [
	{
		name: 'kafirun',
		displayName: 'Surah Al Kafirun',
		artist: 'Sheikh Mishary Rasheed Al-Afasy'
	},
	{
		name: 'ikhlas',
		displayName: 'Surah Al Ikhlas',
		artist: 'Sheikh Mishary Rasheed Al-Afasy'
	},
	{
		name: 'falaq',
		displayName: 'Surah Al Falaq',
		artist: 'Sheikh Mishary Rasheed Al-Afasy'
	},
	{
		name: 'naas',
		displayName: 'Suran An Naas',
		artist: 'Sheikh Mishary Rasheed Al-Afasy'
	}
]

let isPlaying = false;

function playAudio() {
	isPlaying = true;
	playBtn.classList.replace('fa-play', 'fa-pause')
	playBtn.setAttribute('title', 'Pause')
	audio.play()
}


function pauseAudio() {
	isPlaying = false;
	playBtn.classList.replace('fa-pause', 'fa-play')
	playBtn.setAttribute('title', 'Play')
	audio.pause()
}


playBtn.addEventListener('click', () => { (isPlaying ? pauseAudio() : playAudio()) });


function loadAudio(audioObj) {
	image.src = `img/${audioObj.name}.jpg`
	audio.src = `music/${audioObj.name}.mp3`
	title.textContent = audioObj.displayName;
	author.textContent = audioObj.artist;
}


let audioIndex = 0;

loadAudio(playList[audioIndex]);


function prevAudio() {
	audioIndex--;
	if(audioIndex < 0) {
		audioIndex = playList.length - 1;
	}
	loadAudio(playList[audioIndex])
	playAudio()
}

function nextAudio() {
	audioIndex++;
	if(audioIndex >= playList.length) {
		audioIndex = 0;
	}
	loadAudio(playList[audioIndex])
	playAudio()
}

function updateProgressBar(e) {
	const {duration, currentTime} = e.srcElement;
	progress.style.width = `${currentTime / duration * 100}%`

	durationMinutes = Math.floor(duration / 60);
	durationSeconds = Math.floor(duration % 60);
	durationSeconds = durationSeconds < 10 ? `0${durationSeconds}` : durationSeconds;
	if(durationSeconds)
		durationEl.textContent = `${durationMinutes}:${durationSeconds}`


	currentMinutes = Math.floor(currentTime / 60);
	currentSeconds = Math.floor(currentTime % 60);
	currentSeconds = currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds;
	if(currentSeconds)
		currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`
}






function setProgressBar(e) {
	audio.currentTime = e.offsetX / this.clientWidth * audio.duration;
}




prevBtn.addEventListener('click', prevAudio);
nextBtn.addEventListener('click', nextAudio);

audio.addEventListener('timeupdate', updateProgressBar)
audio.addEventListener('ended', nextAudio)
progressContainer.addEventListener('click', setProgressBar)