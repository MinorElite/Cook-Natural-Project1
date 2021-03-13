
var recipeID = '8ef87cb1';
var recipeKey = 'bb685a0401f2fc75e31942def94ff23f';
var nutritionID = '2b527145';
var nutritionKey = 'c7d83e1d210fa0e3ac0038d0b9a3c8be';
var searchForm = document.querySelector('#recipe-search-form');
var searchInput = document.querySelector('#search-input');
var resultsContainer = document.querySelector('#results-container');
var recipeBookButton = document.querySelector('#recipe-book-button');
var searchIngredient;


searchForm.addEventListener('submit', submitIngredient); //eventlistener for form

recipeBookButton.addEventListener('click', function(){
  location.replace('./thirdpage.html')
})

function saveIngredient() {
    localStorage.setItem('search-ingredient', JSON.stringify(searchIngredient));
  }


function submitIngredient(event) {
  event.preventDefault();
  searchIngredient = searchInput.value.trim();
  if (searchIngredient) {
    saveIngredient();
    location.replace('./search.html');
    searchInput.value = '';
  } else {
    alert('Please enter a search ingredient...');
  }
}