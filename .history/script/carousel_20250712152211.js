const container = document.querySelector('.contrast__container');
const slides = document.querySelectorAll('.local');

let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;
let currentIndex = 0;

slides.forEach((slide, index) => {
  slide.addEventListener('touchstart', touchStart(index));
  slide.addEventListener('touchend', touchEnd);
  slide.addEventListener('touchmove', touchMove);

  slide.addEventListener('mousedown', touchStart(index));
  slide.addEventListener('mouseup', touchEnd);
  slide.addEventListener('mouseleave', touchEnd);
  slide.addEventListener('mousemove', touchMove);
});

function touchStart(index) {
  return function (event) {
    currentIndex = index;
    startPos = getPositionX(event);
    isDragging = true;

    animationID = requestAnimationFrame(animation);
  };
}

function touchMove(event) {
  if (!isDragging) return;
  const currentPosition = getPositionX(event);
  currentTranslate = prevTranslate + currentPosition - startPos;
}

function touchEnd() {
  cancelAnimationFrame(animationID);
  isDragging = false;

  const movedBy = currentTranslate - prevTranslate;

  if (movedBy < -100 && currentIndex < slides.length - 1) currentIndex++;
  if (movedBy > 100 && currentIndex > 0) currentIndex--;

  setPositionByIndex();
}

function getPositionX(event) {
  return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

function animation() {
  setSliderPosition();
  if (isDragging) requestAnimationFrame(animation);
}

function setSliderPosition() {
  container.style.transform = `translateX(${currentTranslate}px)`;
}

function setPositionByIndex() {
  currentTranslate = currentIndex * -container.offsetWidth;
  prevTranslate = currentTranslate;
  setSliderPosition();
  updateButtons();
}


const imgLeft = document.getElementById('img__button--left').addEventListener('click', imgSlideLeft)
const imgRight = document.getElementById('img__button--right').addEventListener('click', imgSlideRight)

function imgSlideLeft() {
  if (currentIndex > 0) {
    currentIndex--;
    setPositionByIndex();
  }
}

function imgSlideRight() {
  if (currentIndex < slides.length - 1) {
    currentIndex++;
    setPositionByIndex();
  }
}

// Função para ativar/desativar os botões conforme o slide atual
function updateButtons() {
  if (currentIndex === 0) {
    imgLeft.classList.add('disabled');
  } else {
    imgLeft.classList.remove('disabled');
  }

  if (currentIndex === slides.length - 1) {
    imgRight.classList.add('disabled');
  } else {
    btnRight.classList.remove('disabled');
  }
}

