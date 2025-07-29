//menu que some e volta

const menuList = document.querySelector('.menu__list')
const menuOcult = document.querySelector('.menu__ocult')
const itens = document.querySelectorAll('.menu__item')

menuList.addEventListener('click', openmenu)

function openmenu() {
  menuOcult.style.display = 'flex'
  menuOcult.style.animation = 'menuocult 0.5s ease forwards';
  setTimeout(() => {
  itens.forEach(item => {
    item.style.display = 'block';
    item.classList.add('animate__animated', 'animate__fadeIn');
    });
  }, 400); // 1000ms = 1 segundo
  menuList.removeEventListener('click', openmenu)
  menuList.addEventListener('click', exitmenu)

}

function exitmenu() {
  menuOcult.style.display = 'none'
  menuList.removeEventListener('click', exitmenu)
  menuList.addEventListener('click', openmenu)

}






//troca de categoria seção de demostração


// Seletores dos botões
const buttonApartment = document.querySelector('.demo__menu--apartment');
const buttonHouse = document.querySelector('.demo__menu--house');
const buttonPenthouse = document.querySelector('.demo__menu--penthouse');

// Seletores dos cards
const cardApartment = document.querySelector('.demo__apartment');
const cardHouse = document.querySelector('.demo__house');
const cardPenthouse = document.querySelector('.demo__penthouse');

// Agrupa os cards para facilitar
const cards = {
  apartment: cardApartment,
  house: cardHouse,
  penthouse: cardPenthouse,
};

let currentCard = cardApartment; // Card inicial visível

// Função para trocar o card visível
function showCard(targetCard) {
  if (currentCard === targetCard) return; // Se já está visível, não faz nada

  // Passo 1: esconde o atual com animação de saída
  currentCard.classList.remove('animate__animated', 'animate__fadeIn');
  currentCard.classList.add('animate__animated', 'animate__fadeOut', 'custom-anim');

  currentCard.addEventListener('animationend', function handleOut() {
    currentCard.style.display = 'none';
    currentCard.classList.remove('animate__animated', 'animate__fadeOut');
    currentCard.removeEventListener('animationend', handleOut);

    // Passo 2: mostra o novo card com animação de entrada
    targetCard.style.display = 'block';
    targetCard.classList.add('animate__animated', 'animate__fadeIn', 'custom-anim');

    // Limpa a classe após animação para reusar no futuro
    targetCard.addEventListener('animationend', function handleIn() {
      targetCard.classList.remove('animate__animated', 'animate__fadeIn');
      targetCard.removeEventListener('animationend', handleIn);
    });

    // Atualiza referência do card atual
    currentCard = targetCard;
  });
}

// Eventos dos botões
buttonApartment.addEventListener('click', () => showCard(cards.apartment));
buttonHouse.addEventListener('click', () => showCard(cards.house));
buttonPenthouse.addEventListener('click', () => showCard(cards.penthouse));

//troca de cores do botões
buttonApartment.addEventListener('click', selectApartment)
buttonHouse.addEventListener('click', selectHouse)
buttonPenthouse.addEventListener('click', selectPenthouse)

function selectApartment() {
    buttonApartment.classList.add('demo__menu--select')
    buttonHouse.classList.remove('demo__menu--select')
    buttonPenthouse.classList.remove('demo__menu--select')
}

function selectHouse() {
    buttonApartment.classList.remove('demo__menu--select')
    buttonHouse.classList.add('demo__menu--select')
    buttonPenthouse.classList.remove('demo__menu--select')
}

function selectPenthouse() {
    buttonApartment.classList.remove('demo__menu--select')
    buttonHouse.classList.remove('demo__menu--select')
    buttonPenthouse.classList.add('demo__menu--select')
}
