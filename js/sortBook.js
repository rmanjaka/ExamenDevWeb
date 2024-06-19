document.addEventListener('DOMContentLoaded', () => {
    const sortCriteria = document.getElementById('sort-criteria');
    const sortBtn = document.getElementById('sort-btn');
    const sortsContainer = document.getElementById('sorts-container');

    sortBtn.addEventListener('click', () => {
        const criteria = sortCriteria.value;
        fetch('/json/livre.json')
            .then(response => response.json())
            .then(data => {
                const sortedBooks = data.livres.sort((a, b) => {
                    if (a[criteria] < b[criteria]) return -1;
                    if (a[criteria] > b[criteria]) return 1;
                    return 0;
                });

                sortsContainer.innerHTML = '';
                sortedBooks.forEach(book => {
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

                    sortsContainer.appendChild(bookCard);
                });
            })
            .catch(error => console.error('Erreur:', error));
    });
});
