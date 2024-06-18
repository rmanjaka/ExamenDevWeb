document.addEventListener('DOMContentLoaded', () => {
    fetch('livre.json')
        .then(response => response.json())
        .then(data => {
            const booksContainer = document.getElementById('books-container');
            const detailsContainer = document.getElementById('details-container');
            const closeBtn = document.getElementById('close-btn');
            const saveBtn = document.getElementById('save-btn');
            let currentBook = null;

            data.livres.forEach((book, index) => {
                const bookCard = document.createElement('div');
                bookCard.className = 'book-card';

                bookCard.innerHTML = `
                    <img src="${book.image}" alt="${book.titre}">
                    <h2>${book.titre}</h2>
                    <p>${book.auteurs}</p>
                    <div class="buttons">
                        <button class="details-btn">Voir Détails</button>
                        <button class="edit-btn">Modifier</button>
                        <button class="delete-btn">Supprimer</button>
                    </div>
                `;

                bookCard.querySelector('.details-btn').addEventListener('click', () => {
                    displayEditForm(book);
                    currentBook = index;
                });

                bookCard.querySelector('.edit-btn').addEventListener('click', () => {
                    displayEditForm(book);
                    currentBook = index;
                });

                bookCard.querySelector('.delete-btn').addEventListener('click', () => {
                    alert(`Suppression du livre: ${book.titre}`);
                });

                booksContainer.appendChild(bookCard);
            });

            closeBtn.addEventListener('click', () => {
                detailsContainer.classList.remove('open');
            });

            saveBtn.addEventListener('click', () => {
                saveBookDetails(currentBook);
            });

            function displayEditForm(book) {
                document.getElementById('edit-title').value = book.titre;
                document.getElementById('edit-authors').value = book.auteurs;
                document.getElementById('edit-isbn').value = book.isbn;
                document.getElementById('edit-editeur').value = book.editeur;
                document.getElementById('edit-datePublication').value = book.datePublication;
                document.getElementById('edit-genre').value = book.genre;
                document.getElementById('edit-resume').value = book.resume;
                document.getElementById('edit-langue').value = book.langue;
                document.getElementById('edit-nombrePages').value = book.nombrePages;
                document.getElementById('edit-disponibilite').value = book.disponibilite;
                document.getElementById('edit-etat').value = book.etat;
                document.getElementById('edit-emplacement').value = book.emplacement;

                detailsContainer.classList.add('open');
            }

            function saveBookDetails(index) {
                const updatedBook = {
                    titre: document.getElementById('edit-title').value,
                    auteurs: document.getElementById('edit-authors').value,
                    isbn: document.getElementById('edit-isbn').value,
                    editeur: document.getElementById('edit-editeur').value,
                    datePublication: document.getElementById('edit-datePublication').value,
                    genre: document.getElementById('edit-genre').value,
                    resume: document.getElementById('edit-resume').value,
                    langue: document.getElementById('edit-langue').value,
                    nombrePages: document.getElementById('edit-nombrePages').value,
                    disponibilite: document.getElementById('edit-disponibilite').value,
                    etat: document.getElementById('edit-etat').value,
                    emplacement: document.getElementById('edit-emplacement').value
                };

                data.livres[index] = updatedBook;
                localStorage.setItem('livres', JSON.stringify(data.livres));

                alert('Les détails du livre ont été mis à jour !');
                detailsContainer.classList.remove('open');
                location.reload();
            }
        })
        .catch(error => console.error('Erreur:', error));
});
