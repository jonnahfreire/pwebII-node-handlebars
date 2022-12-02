'use strict'
const handleOpenModal = () => document.getElementById('modal-add-update')
    .classList.toggle('active');

document.getElementById('modalClose')
    .addEventListener('click', handleOpenModal);

document.querySelector('.modal-footer .cancel')
    .addEventListener('click', () => {
        document.querySelector('.modal-form').childNodes.forEach(item => item.value = "");
        handleOpenModal();
});

const setUserId = (id) => {
    document.querySelector('.modal-form').setAttribute("action", "/add-book");
    document.querySelector('.add-update-form .owner').value = id;

    handleOpenModal();
}

const editBook = (...books) => {
    document.querySelector('.add-update-form').setAttribute("action", "/update-book");
    
    const book = {
        id: books[0],
        title: books[1],
        author: books[2],
        pages: books[3],
        owner: books[4],
    };
    
    document.querySelector('.modal-add-update h2').textContent = "Editar livro";
    document.querySelector('.add-update-form .id').value = book.id;
    document.querySelector('.add-update-form .owner').value = book.owner;
    document.querySelector('.add-update-form .title').value = book.title;
    document.querySelector('.add-update-form .author').value = book.author;
    document.querySelector('.add-update-form .pages').value = book.pages;
    
    document.getElementById('modal-add-update').classList.toggle('active');
}


const modalRemove = document.getElementById('modal-remove');
modalRemove.querySelector(".cancel-remove").addEventListener("click", () =>  modalRemove.classList.toggle('active'));
modalRemove.querySelector("#modal-close").addEventListener("click", () =>  modalRemove.classList.toggle('active'));

const removeBook = (id, idowner) => {
    modalRemove.classList.toggle('active');

    modalRemove.querySelector("#book-id").value = id;
    modalRemove.querySelector("#book-owner").value = idowner;
}