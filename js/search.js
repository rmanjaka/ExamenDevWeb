document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const resultsContainer = document.getElementById('results-container');

    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.toLowerCase();
        fetch('livre.json')
            .then(response => response.json())
            .then(data => {
                resultsContainer.innerHTML = '';
                const filteredBooks = data.livres.filter(book => {
                    return book.titre.toLowerCase().includes(query) ||
                           book.auteurs.toLowerCase().includes(query) ||
                           book.genre.toLowerCase().includes(query);
                });

                if (filteredBooks.length === 0) {
                    resultsContainer.innerHTML = '<p>Aucun livre trouvé.</p>';
                } else {
                    filteredBooks.forEach(book => {
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
                            <br>
                        `;
                        resultsContainer.appendChild(bookCard);
                    });
                }
            })
            .catch(error => console.error('Erreur:', error));
    });
});
