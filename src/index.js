let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

const toyCollection = document.getElementById('toy-collection')
 function loadingToys(){
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(toys => {
    toys.forEach(toy =>{
      createToyCard(toy);
    });
  })
  .catch(error => console.log("Error fetching toys:", error))
}

function createToyCard(toy){
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h2>${toy.name}</h2>
      <img src="${toy.image}" class="toy-avatar" />
      <p>${toy.likes} Likes</p>
      <button class="like-btn" id="${toy.id}">Like ❤️</button>
    `;

    const likeButton = card.querySelector('.like-btn');
    likeButton.addEventListener('click', () => increaseLikes(toy.id, toy.likes));

    toyCollection.appendChild(card);
}

  function increaseLikes(toyId, currentLikes) {
    const newLikes = currentLikes + 1;

    fetch(`http://localhost:3000/toys/${toyId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({ likes: newLikes })
    })
      .then(response => response.json())
      .then(updatedToy => {
        const card = document.getElementById(toyId).parentElement;
        card.querySelector('p').innerText = `${updatedToy.likes} Likes`;
      })
      .catch(error => console.error('Error updating likes:', error));
  }

  const toyForm = document.querySelector('.add-toy-form')
  toyForm.addEventListener('submit', event => {
    event.preventDefault();

    const toyName = document.getElementById('toy-name').value;
    const toyImage = document.getElementById('toy-image').value;

    fetch('http://localhost:3000/toys',{
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: toyName,
        Imae: toyImage,
        likes: 0
      })
  })
  .then(res => res.json())
  .then(newToy => {
    createToyCard(newToy);
    toyForm.reset();
  })
  .catch(error => console.log("Error loading form:", error))
  })
  loadingToys()