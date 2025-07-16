

const video = document.querySelector('.video__play');
  const playButton = document.getElementById('customPlayBtn');

  playButton.addEventListener('click', () => {
    video.setAttribute('controls', true);
    video.play();
    playButton.style.display = 'none';
  });