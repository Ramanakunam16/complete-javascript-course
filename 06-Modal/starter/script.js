'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

const closeModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');

const openModal = () => {
  console.log('btn clicked');
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal1 = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener('click', openModal);

  overlay.addEventListener('click', closeModal1);
  closeModal.addEventListener('click', closeModal1);
}

// respone to keyboard event

document.addEventListener('keydown', e => {
  console.log(e.key);
  if (e.key === 'Escape') {
    if (!modal.classList.contains('hidden')) {
      closeModal1();
    }
  }
});
