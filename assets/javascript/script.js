
var recipeID = '8ef87cb1';
var recipeKey = 'bb685a0401f2fc75e31942def94ff23f';
var nutritionID = '2b527145';
var nutritionKey = 'c7d83e1d210fa0e3ac0038d0b9a3c8be';
var searchForm = document.querySelector('#recipe-search-form');
var searchInput = document.querySelector('#search-input');
var resultsContainer = document.querySelector('#results-container');
//searchForm.addEventListener('submit', handleSearchSubmit); //eventlistener for form


//handle search submit, captures value from search bar as ingredient and calls search function
function handleSearchSubmit(event) {
  event.preventDefault();
  var ingredient = searchInput.value.trim();
  if (ingredient) {
    recipeSearch(ingredient);
    console.log('function handleSearchSubmit working');
  }
} 



//recipe search function
// function demoRecipeSearch(ingredient) {
//   console.log('function recipeSearch working');
//   var recipeSearchURL = 'https://api.edamam.com/search?q=' + ingredient + '&app_id=' + recipeID + '&app_key=' + recipeKey + '&from=0&to=10&calories=591-722&health=alcohol-free'
  
//   fetch(recipeSearchURL)
//     .then(function (response) {
//       if (response.ok) {
//         response.json().then(function (data) {
//           console.log(data);
//           // var recipeArray = data.hits;
//           for( i = 0; i < data.hits.length; i++) {
//             var title = data.hits[i].recipe.label;
//             var yield = data.hits[i].recipe.yield;
//             var ingredients = data.hits[i].recipe.ingredientLines;
            
//             getNutritionFacts(title, yield, ingredients);
//             // console.log(i.recipe.ingredientLines);
//           }
          
        
//         });
//       } else {
//         alert('Error: ' + response.statusText);
//       }
//     })
//     .catch(function (error) {
//       alert('Unable to connect to edamam recipe index');
//     });
// }

function recipeSearch(ingredient) {
  console.log('function recipeSearch working');
  var recipeSearchURL = 'https://api.edamam.com/search?q=' + ingredient + '&app_id=' + recipeID + '&app_key=' + recipeKey + '&from=0&to=10&calories=591-722&health=alcohol-free'
  
  fetch(recipeSearchURL)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          var recipeArray = data.hits;
          for( i = 0; i < data.hits.length; i++) {
            //var title = data.hits[i].recipe.label;
            //var yield = data.hits[i].recipe.yield;
            //var ingredients = data.hits[i].recipe.ingredientLines;
            
            var recName = data.hits[i].recipe.label;
            var recYeild = data.hits[i].recipe.yield;
            var recTime = data.hits[i].recipe.totalTime;
            var recImage = data.hits[i].recipe.image;
            var recURL = data.hits[i].recipe.url;
            
            // console.log(i.recipe.ingredientLines);
            renderResults(recName, recYeild, recTime, recImage, recURL);
            
          }
          
        
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      //alert('Unable to connect to edamam recipe index');
    });
}

//creates each search result block and assigns 
function renderResults(recName, recYeild, recTime, recImage, recURL) {
  var resultBlock = document.createElement('div');
  resultBlock.setAttribute('class','columns');
  resultsContainer.appendChild(resultBlock);

  var resultCol = document.createElement('div');
  resultCol.setAttribute('class', 'column is-half');
  resultBlock.appendChild(resultCol);

  var resultHeader = document.createElement('article');
  resultHeader.setAttribute('class', 'message is-info');
  resultCol.appendChild(resultHeader);

  var resultHeaderText = document.createElement('div');
  resultHeaderText.setAttribute('class', 'message-header');

  resultHeaderText.textContent = recName;
  resultHeader.appendChild(resultHeaderText);

  // var listBlock = document.createElement('div');
  // listBlock.setAttribute('class', 'columns');

  var listCol = document.createElement('div');
  listCol.setAttribute('class', 'message-body');
  resultHeader.appendChild(listCol);

  var list = document.createElement('ul');
  listCol.appendChild(list);

  var liYield = document.createElement('li');
  liYield.textContent = recYeild;
  list.appendChild(liYield);

  var liTime = document.createElement('ul');
  liTime.textContent = recTime;
  list.appendChild(liTime);


  // var linkCol = document.createElement('div');
  // linkCol.setAttribute('class', 'column');
  // var link = document.createElement('a');
  // link.setAttribute('href', recURL);
  // var linkBtn = document.createElement('button');
  // linkBtn.setAttribute('class', 'button is-success');
  // linkBtn.textContent = 'GO'
  

  // var imgCol = document.createElement('div');
  // imgCol.setAttribute('class', 'column');
  // var imgFig = document.createElement('figure');
  // imgFig.setAttribute('class', 'image is-96x96');
  // var imgLink = document.createElement('img');
  // imgLink.setAttribute('src', recImage);


}



recipeSearch('walnuts');        //recipe search test

// function demoGetNutritionFacts(title, yield, ingredients) {

//   postURL = 'https://api.edamam.com/api/nutrition-details?app_id=' + nutritionID + '&app_key=' + nutritionKey;

//   const data = {
//     "title": title,
//     "yield": "About" + yield + "servings",
//     "ingr": ingredients
//   }

function getNutritionFacts(title, yield, ingredients) {

  //postURL = 'https://api.edamam.com/api/nutrition-details?app_id=' + nutritionID + '&app_key=' + nutritionKey;

  //const data = {
    //"title": title,
    //"yield": "About" + yield + "servings",
    //"ingr": ingredients
  //}

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
  console.log()
  console.log('Success:', data);
})
.catch((error) => {
  console.error('Error:', error);
});

}
// getNutritionFacts();