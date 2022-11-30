'use strict'

const handleOpenModal = () => document.getElementById('modal')
    .classList.toggle('active')

document.getElementById('adicionarLivro')
    .addEventListener('click', handleOpenModal)

document.getElementById('modalClose')
    .addEventListener('click', handleOpenModal)

document.querySelector('.modal-footer .cancel')
    .addEventListener('click', handleOpenModal)