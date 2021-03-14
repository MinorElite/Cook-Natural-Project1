
var recipeID = '8ef87cb1';
var recipeKey = 'bb685a0401f2fc75e31942def94ff23f';
var nutritionID = '2b527145';
var nutritionKey = 'c7d83e1d210fa0e3ac0038d0b9a3c8be';
var searchForm = document.querySelector('#recipe-search-form');
var searchInput = document.querySelector('#search-input');
var resultsContainer = document.querySelector('#results-container');
var recipeBookButton = document.querySelector('#recipe-book-button');
var recipeList = [];//JSON.parse(localStorage.getItem('saved-recipes'));
var searchIngredient;

function displayResults() {
  var searchIngredient = JSON.parse(localStorage.getItem('search-ingredient'));
  console.log('function recipeSearch working');
  var recipeSearchURL = 'https://api.edamam.com/search?q=' + searchIngredient + '&app_id=' + recipeID + '&app_key=' + recipeKey + '&from=0&to=10'
  
  fetch(recipeSearchURL)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          var recipeArray = data.hits;
          for( i = 0; i < data.hits.length; i++) {
            
            var recName = data.hits[i].recipe.label;
            var recSource = data.hits[i].recipe.source;
            var recYeild = data.hits[i].recipe.yield;
            var recTime = data.hits[i].recipe.totalTime;
            var recImage = data.hits[i].recipe.image;
            var recURL = data.hits[i].recipe.url;
            var recIngs = data.hits[i].recipe.ingredientLines;

            renderResults(recName, recSource, recYeild, recTime, recImage, recURL, recIngs);
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

//creates each search result block and assigns 
function renderResults(recName, recSource, recYeild, recTime, recImage, recURL, recIngs) {
  var resultBlock = document.createElement('div');
  resultBlock.setAttribute('class','columns');
  resultsContainer.appendChild(resultBlock);

  var resultCol = document.createElement('div');
  resultCol.setAttribute('class', 'column');
  resultBlock.appendChild(resultCol);

  var resultHeader = document.createElement('article');
  resultHeader.setAttribute('class', 'message is-success');
  resultCol.appendChild(resultHeader);

  var resultHeaderText = document.createElement('div');
  resultHeaderText.setAttribute('class', 'message-header');
  resultHeaderText.textContent = recName;
  resultHeader.appendChild(resultHeaderText);

  var resultBody = document.createElement('div');
  resultBody.setAttribute('class', 'message-body');
  resultHeader.appendChild(resultBody);

  var resultBodyRow = document.createElement('div');
  resultBodyRow.setAttribute('class', 'columns');
  resultBody.appendChild(resultBodyRow);

  // begin image column
  var imageColumn = document.createElement('div');
  imageColumn.setAttribute('class', 'column is-one-quarter image-column');
  resultBodyRow.appendChild(imageColumn);

  var imageContainer = document.createElement('figure');
  imageContainer.setAttribute('class', 'image is-128x128 is-full-width');
  imageColumn.appendChild(imageContainer);

  var imageActual = document.createElement('img');
  imageActual.setAttribute('src', recImage);
  imageContainer.appendChild(imageActual);
  // end image block
  // begin list block
  
  var listColumn = document.createElement('div');
  listColumn.setAttribute('class', 'column is-half');
  resultBodyRow.appendChild(listColumn);

  var listEl = document.createElement('ul');
  listColumn.appendChild(listEl);
  //cook time
  var cookTimeEl = document.createElement('li')
  listEl.appendChild(cookTimeEl);
  var cookTimeStrong = document.createElement('strong');
  cookTimeStrong.textContent = 'Cook Time: '
  cookTimeEl.appendChild(cookTimeStrong);
  
  var cookTimeText = document.createElement('p');
  cookTimeText.textContent = 'approximately ' + recTime + ' minutes';
  cookTimeEl.appendChild(cookTimeText);
  // yeild
  var yieldEl = document.createElement('li')
  listEl.appendChild(yieldEl);
  var yieldStrong = document.createElement('strong');
  yieldStrong.textContent = 'Number of Servings: ';
  yieldEl.appendChild(yieldStrong);
  
  var yieldText = document.createElement('p');
  yieldText.textContent = 'about ' + recYeild;
  yieldEl.appendChild(yieldText);

  //end list  block

  // begin button block

  var buttonEl = document.createElement('div');
  buttonEl.setAttribute('class', 'column is-one-quarter');
  resultBodyRow.appendChild(buttonEl);

  var buttonRow = document.createElement('div');
  buttonRow.setAttribute('class', 'columns is-multiline');
  buttonEl.appendChild(buttonRow);

  //link button block
  var buttonCol1 = document.createElement('div');
  buttonCol1.setAttribute('class', ' column is-full');
  buttonRow.appendChild(buttonCol1);

  var linkButton = document.createElement('button');
  linkButton.setAttribute('class', 'button is-success');
  linkButton.textContent = 'Go to recipe';
  linkButton.addEventListener('click', function(){
    window.open(recURL)
  });
  buttonCol1.appendChild(linkButton);
  // add recipe button block
  var buttonCol2 = document.createElement('div');
  buttonCol2.setAttribute('class', ' column is-full');
  buttonRow.appendChild(buttonCol2);

  var addButton = document.createElement('button');
  addButton.setAttribute('class', 'button is-success');
  addButton.textContent = 'Add to recipe book';
  addButton.addEventListener('click', addRecipe);
  buttonCol2.appendChild(addButton);

  //end button block
  
  function addRecipe() {
    var savedRecipes = JSON.parse(localStorage.getItem('saved-recipes'));
    if (savedRecipes !== null) {
      recipeList = savedRecipes;
      console.log(recipeList);
    }

    var recipeInfo = {
      'recipeLabel': recName,
      'recipeSource': recSource,
      'recipeYield': recYeild,
      'recipeTime': recTime,
      'recipeImage': recImage,
      'recipeIngredients': recIngs,
      'recipeUrl': recURL
    }
    recipeList.push(recipeInfo);
    localStorage.setItem('saved-recipes', JSON.stringify(recipeList));
    console.log(recName + ' added to recipe list');
    console.log(recipeList);
  }
}



displayResults();        //recipe search