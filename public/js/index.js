'use strict'
const handleOpenModal = () => document.getElementById('modal-add-update')
    .classList.toggle('active');

document.getElementById('adicionarLivro')
    .addEventListener('click', () => {
        document.querySelector('.modal-form').setAttribute("action", "/add-book");
        handleOpenModal();
});

document.getElementById('modalClose')
    .addEventListener('click', handleOpenModal);

document.querySelector('.modal-footer .cancel')
    .addEventListener('click', () => {
        document.querySelector('.modal-form').childNodes.forEach(item => item.value = "");
        handleOpenModal();
});


const editBook = (...books) => {
    document.querySelector('.add-update-form').setAttribute("action", "/update-book");
    
    const book = {
        id: books[0],
        title: books[1],
        author: books[2],
        pages: books[3],
    };
    
    document.querySelector('.modal-add-update h2').textContent = "Editar livro";
    document.querySelector('.add-update-form .id').value = book.id;
    document.querySelector('.add-update-form .title').value = book.title;
    document.querySelector('.add-update-form .author').value = book.author;
    document.querySelector('.add-update-form .pages').value = book.pages;
    
    document.getElementById('modal-add-update').classList.toggle('active');
}

const removeBook = (id) => {
    const modal = document.getElementById('modal-remove');
    modal.classList.toggle('active');

    modal.querySelector("#book-id").value = id;

    modal.querySelector(".cancel-remove").addEventListener("click", () =>  modal.classList.toggle('active'));
    modal.querySelector("#modal-close").addEventListener("click", () =>  modal.classList.toggle('active'));
}
