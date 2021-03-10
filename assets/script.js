
var recipeID = '8ef87cb1';
var recipeKey = 'bb685a0401f2fc75e31942def94ff23f';
var nutritionID = '2b527145';
var nutritionKey = 'c7d83e1d210fa0e3ac0038d0b9a3c8be';
var searchForm = document.querySelector('#recipe-search-form')
var searchBar = document.querySelector('#ingredient-search');

// searchForm.addEventListener('submit', handleSearchSubmit) //eventlistener for form


//handle search submit, captures value from search bar as ingredient and calls search function
function handleSearchSubmit(event) {
  event.preventDefault();
  var ingredient = searchBar.value.trim();
  if (ingredient) {
    recipeSearch(ingredient);
    console.log('function handleSearchSubmit working')
  }
} 

//recipe search function
function recipeSearch(ingredient) {
  console.log('function recipeSearch working');
  var recipeSearchURL = 'https://api.edamam.com/search?q=' + ingredient + '&app_id=' + recipeID + '&app_key=' + recipeKey + '&from=0&to=10&calories=591-722&health=alcohol-free'
  
  fetch(recipeSearchURL)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          // var recipeArray = data.hits;
          for( i = 0; i < data.hits.length; i++) {
            var title = data.hits[i].recipe.label;
            var yield = data.hits[i].recipe.yield;
            var ingredients = data.hits[i].recipe.ingredientLines;
            
            getNutritionFacts(title, yield, ingredients);
            // console.log(i.recipe.ingredientLines);
          }
          
        
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to edamam recipe index');
    });
}

recipeSearch('pecans');        //recipe search test

function getNutritionFacts(title, yield, ingredients) {

  postURL = 'https://api.edamam.com/api/nutrition-details?app_id=' + nutritionID + '&app_key=' + nutritionKey;

  const data = {
    "title": title,
    "yield": "About" + yield + "servings",
    "ingr": ingredients
  }

  // const data = {
  //   "title": "Fresh Ham Roasted With Rye Bread and Dried Fruit Stuffing",
  //   "prep": "1. Have your butcher bone and butterfly the ham and score the fat in a diamond pattern. ...",
  //   "yield": "About 15 servings",
  //   "ingr": [
  //     "1 fresh ham, about 18 pounds, prepared by your butcher (See Step 1)",
  //     "7 cloves garlic, minced",
  //     "1 tablespoon caraway seeds, crushed",
  //     "4 teaspoons salt",
  //     "Freshly ground pepper to taste",
  //     "1 teaspoon olive oil",
  //     "1 medium onion, peeled and chopped",
  //     "3 cups sourdough rye bread, cut into 1/2-inch cubes",
  //     "1 1/4 cups coarsely chopped pitted prunes",
  //     "1 1/4 cups coarsely chopped dried apricots",
  //     "1 large tart apple, peeled, cored and cut into 1/2-inch cubes",
  //     "2 teaspoons chopped fresh rosemary",
  //     "1 egg, lightly beaten",
  //     "1 cup chicken broth, homemade or low-sodium canned"
  //   ]
  // }

fetch(postURL, {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
})
.catch((error) => {
  console.error('Error:', error);
});

}
// getNutritionFacts();