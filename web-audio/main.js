// Create an AudioContext (cross browser)
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

// store references to our HTML elements
const audioElement = document.querySelector('audio');
const playBtn = document.querySelector('#control');
const volumeSlider = document.querySelector('.volume');
const hyperLink = document.querySelector('.link');
hyperLink.style.display = 'none';

// load the audio source into our audio graph
const audioSource = audioCtx.createMediaElementSource(audioElement);

// play/pause audio
playBtn.addEventListener('click', function() {
	// check if context is in suspended state (autoplay policy)
	if (audioCtx.state === 'suspended') {
		audioCtx.resume();
	}

  // if track is stopped, play it
	if (this.getAttribute('class') === 'paused') {
		audioElement.play();
		this.setAttribute('class', 'playing');
		this.textContent = 'Pause'
	// if track is playing, stop it
} else if (this.getAttribute('class') === 'playing') {
		audioElement.pause();
		this.setAttribute('class', 'paused');
		this.textContent = 'Play';
	}
});

// if track ends
audioElement.addEventListener('ended', function() {
	playBtn.setAttribute('class', 'paused');
	playBtn.textContent = 'Play';
	hyperLink.style.display = 'block';
});

// volume
const gainNode = audioCtx.createGain();

volumeSlider.addEventListener('input', function() {
	gainNode.gain.value = this.value;
});

// connect our graph
audioSource.connect(gainNode).connect(audioCtx.destination);