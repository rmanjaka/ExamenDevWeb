document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-book-form');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const newBook = {
            titre: form.titre.value,
            auteurs: form.auteurs.value,
            isbn: form.isbn.value,
            image: form.image.value,
            editeur: form.editeur.value,
            datePublication: form.datePublication.value,
            genre: form.genre.value,
            resume: form.resume.value,
            langue: form.langue.value,
            nombrePages: form.nombrePages.value,
            disponibilite: form.disponibilite.value === 'true',
            etat: form.etat.value,
            emplacement: form.emplacement.value
        };

        fetch('/json/livre.json')
            .then(response => response.json())
            .then(data => {
                data.livres.push(newBook);
                //Ajouter dans local storage 
                localStorage.setItem('livres', JSON.stringify(data.livres));
                alert('Le livre a été ajouté avec succès!');
                form.reset();
            })
            .catch(error => console.error('Erreur:', error));
    });
});
