console.log('%c HI', 'color: firebrick')

const imgUrl = "https://dog.ceo/api/breeds/image/random/4"

const breedUrl = 'https://dog.ceo/api/breeds/list/all'

console.log('%c HI', 'color: firebrick')

const dogBreeds = [];

document.addEventListener('DOMContentLoaded', function () {
  loadPics();
  loadDogBreedOptions();
});

function loadPics() {
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
  fetch(imgUrl)
    .then(res=> res.json())
    .then(results => {
      results.message.forEach(image => addPic(image))
    });
}

function addPic(dogPicUrl) {
  let container = document.querySelector('#dog-image-container');
  let newPicEl = document.createElement('img');
  newPicEl.src = dogPicUrl;
  container.appendChild(newPicEl);
}

function loadDogBreedOptions() {
  const breedUrl = 'https://dog.ceo/api/breeds/list/all'
  fetch(breedUrl)
    .then(res => res.json())
    .then(results => {

      breeds = Object.keys(results.message);
      updateDogBreedList(breeds);
      addDogBreedSelectListener();
    });
}

function updateDogBreedList(breeds) {
  let ul = document.querySelector('#dog-breeds');
  removeChildren(ul);
  breeds.forEach(breed => addDogBreed(breed));
}

function removeChildren(element) {
  let child = element.lastElementChild;
  while (child) {
    element.removeChild(child);
    child = element.lastElementChild;
  }
}

function selectDogBreedsStartingWith(letter) {
  updateDogBreedList(breeds.filter(breed => breed.startsWith(letter)));
}

function addDogBreedSelectListener() {
  let breedDropdown = document.querySelector('#breed-dropdown');
  breedDropdown.addEventListener('change', function (event) {
    selectDogBreedsStartingWith(event.target.value);
  });
}

function addDogBreed(breed) {
  let ul = document.querySelector('#dog-breeds');
  let li = document.createElement('li');
  li.innerText = breed;
  li.style.cursor = 'pointer';
  ul.appendChild(li);
  li.addEventListener('click', updateColor);
}

function updateColor(event) {
  event.target.style.color = 'palevioletred';
}