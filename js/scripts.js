let pokemonRepository = (function () {

  // Create empty array for pokemon // 
    let pokemonList = [];

  // Define the API URL /// 
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


  // Function to check if arrays are equal // 
    function arrayEquals(a, b) {
      return (
        Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index])
      );
    }

  
// Function add pokemon to array // 
    function add(pokemon) {
      // Check if variable pushed is of object type //
      if (
        typeof pokemon === "object" &&
        !Array.isArray(pokemon) &&
        pokemon !== null
      ) {
        // Check if Pushed keys match pokemonList keys //
        let pokeKeys = ["name", "detailsUrl"];
        let pushedobject = Object.keys(pokemon);
  
        if (arrayEquals(pushedobject, pokeKeys)) {
          // Check if data types match //
          if (
            typeof pokemon["name"] === "string" &&
            typeof pokemon["detailsUrl"] === "string"
          ) {
            pokemonList.push(pokemon);
            console.log("Success");
          } else {
            console.log(
              `Please make sure date types are as follows "Name":String, "type":array, "height":int`
            );
          }
        } else {
          console.log(
            `Please use appropriate keys being "Name(string)", "Type(array)", "Height(int)"`
          );
        }
      } else {
        console.log("Please add an object value");
      }
    }
  
    // Return all pokemon from array // 
    function getAll() {
      return pokemonList;
    }
  
    // Function to return a specific pokemon based on search // 
    function search(query) {
      var filteredList = pokemonList.filter(function (pokemon) {
        return pokemon.name == query;
      });
  
      return console.log(filteredList);
    }

    // Function show the pop up (modal) with the pokemons details 

    function showModal(imageUrl, title,text) {
      let modalContainer = document.querySelector('#modal-container');

      // add class 'is-visible' to HTML element with id #modal-container // 
      modalContainer.classList.add('is-visible');

      //Clear all existing modal content
      modalContainer.innerHTML = '';
      
      let modal = document.createElement('div');
      modal.classList.add('modal');

     // Add the new modal content
      let closeButtonElement = document.createElement('button');

      // Add close button // 
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'Close';
      closeButtonElement.addEventListener('click', hideModal);

      // Add image element // 

      let imageElement = document.createElement('img');
      imageElement.src  = imageUrl

      // Add title element // 
      let titleElement = document.createElement('h1');
      titleElement.innerText = title;

      // Add p element // 
      let contentElement = document.createElement('p');
      contentElement.innerText = text;

      // Add elements to div // 
      // Example output below // 
      //  <div class="modal">
      //    <button class="modal-close"> Close </button>
      //      <h1>Name: bulbasaur </h1>
      //      <p>Height: 7</p>
      //   </div>
      modal.appendChild(closeButtonElement);
      modal.appendChild(imageElement);
      modal.appendChild(titleElement);
      modal.appendChild(contentElement);
      modalContainer.appendChild(modal);

      modalContainer.classList.add('is-visible');


    }
    
    // Function to hide modal ( p)
    function hideModal() {
      let modalContainer = document.querySelector('#modal-container');
      modalContainer.classList.remove('is-visible');
    }

    // Function to show loading message whilst waiting to load // 
    function showLoadingMessage() {
      let newDiv = document.createElement('div');
      let content = document.createTextNode("Loading");

      newDiv.classList.add("loading-message");

      newDiv.appendChild(content);

      ul = document.querySelector('.pokemon-list');

      document.body.insertBefore(newDiv,ul);
    }

    // Function to hide loading message // 
    function hideLoadingMessage() {

       let loading = document.querySelector(".loading-message");

       loading.parentElement.removeChild(loading);

    }

    // Function to render list of pokemon // 

    function loadList() {
    // Show loading message before load // 
      showLoadingMessage();
    // Use 'Fetch' to call pokemon api // 
        return fetch(apiUrl).then(function (response) {
    // Return respone as json // 
          return response.json();
        }).then(function (json) {
    // When response has been recieved hide loading message // 
          hideLoadingMessage();
    // For each object in the json .....
          json.results.forEach(function (item) {
    // Create dictionary for each pokemon // 
            let pokemon = {
              name: item.name,
    // Pokemon details url // 
              detailsUrl: item.url
            };

            add(pokemon);
            console.log(pokemon);
          });
        }).catch(function (e) {
          hideLoadingMessage();
          console.error(e);
        })
      }

    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      }).catch(function (e) {
        console.error(e);
      });
    }

// add list item to <ul> element // 
    function addListItem(pokemon) {

        let unorderedList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
    
        // Create button for pokemon // 
        button.innerText = pokemon.name;
        button.classList.add("button");

        
        button.setAttribute("id","show-modal")

        // Show modal on click // 
        button.addEventListener('click', function(event) {
          showDetails(pokemon);
        });
      

        listItem.appendChild(button);
        unorderedList.appendChild(listItem);

    
    }
  
    function showDetails(item) {
      loadDetails(item).then(function(){

        // Display details on click // 
        showModal(item.imageUrl,"Name: " + item.name,"Height: "  + item.height);
      }
      )
    }

    // modalContainer.addEventListener('click', (e) => {
    //   // Since this is also triggered when clicking INSIDE the modal
    //   // We only want to close if the user clicks directly on the overlay
    //   let target = e.target;
    //   if (target === modalContainer) {
    //     hideModal();
    //   }
    // });

    window.addEventListener('keydown', (e) => {
      let modalContainer = document.querySelector('#modal-container');
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();  
      }
    });


  

    return {
      add: add,
      getAll: getAll,
      search: search,
      addListItem:addListItem,
      loadList: loadList,
      loadDetails:loadDetails

    };
  })();
  
  
 
  
  pokemonRepository.loadList().then(function() {
    // Now the data is loaded!
      pokemonRepository.getAll().forEach(function(pokemon){
         pokemonRepository.addListItem(pokemon);
    });
  });
  