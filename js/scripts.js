let i = 0 

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

    //Function show the pop up (modal) with the pokemons details 

    function showModal(imageUrl, title,text) {
      let modaltitle= document.querySelector('#modal-title');
    
      modaltitle.innerText = title;

      let modalbody= document.querySelector('#modal-body');
    
      modalbody.innerText = text;

      let imageElement = document.createElement('img');
      imageElement.src  = imageUrl

      modalbody.appendChild(imageElement);
      $('#modal-container').modal('show');

  
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


// // add list item to <ul> element //  Was trying to dynamically create rows and cols
//     function addListItem(pokemon) {


     
//         let unorderedList = document.querySelector('.list-group');
//         let listItem = document.createElement('li');
//         // let buttonContainer = document.createElement('div');
//         let button = document.createElement('button');
     
       
//         // Create button for pokemon // 
//         button.innerText = pokemon.name;

//         // buttonContainer.classList.add("d-grid");
//         // buttonContainer.classList.add("gap-2");
//         button.classList.add("btn");
//         button.classList.add("btn-light");
//         button.classList.add("col-2")

//         listItem.classList.add("list-group-item");
//         listItem.classList.add("bg-transparent");
//         listItem.classList.add("col-2");


 

//         button.setAttribute("id","show-modal");
//         button.setAttribute("type","button");
//         button.setAttribute("data-toggle","modal");
//         button.setAttribute("data-target",'#modal-container');
        
//         //Show modal on click // 
//         button.addEventListener('click', function(event) {
//           showDetails(pokemon);
//         });

//         // While i is less than a number that is divisble by 6 put it on the row that is divisble by 6 
//         for (i ; i <= 150 ; i ++) {
//           if ( i % 6 === 0) {
//             var row = document.createElement('div');
//             row.classList.add('row');
//             row.setAttribute("id",i);
//             unorderedList.appendChild(row);
  
//         }   
//             listItem.appendChild(button);
//             row.appendChild(listItem);  
//       }

//     //   for (i ; i <= 150 ; i ++) {
//     //     if ( i % 6 === 0) {
          


//     //   }       
//     // }
      
   // add list item to <ul> element // 
      function addListItem(pokemon) {

        let unorderedList = document.querySelector('.list-group');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        let buttonContainer = document.createElement('div');

        // Create button for pokemon // 
        button.innerText = pokemon.name;

        buttonContainer.classList.add("d-grid");
        buttonContainer.classList.add("gap-2");
        button.classList.add("btn");
        button.classList.add("btn-light");
        listItem.classList.add("list-group-item");


        button.setAttribute("id","show-modal");
        button.setAttribute("type","button");
        button.setAttribute("data-toggle","modal");
        button.setAttribute("data-target",'#modal-container');
        
        //Show modal on click // 
        button.addEventListener('click', function(event) {
          showDetails(pokemon);
        });

    
      
        buttonContainer.appendChild(button);
        listItem.appendChild(buttonContainer);
        unorderedList.appendChild(listItem);


    }
        
      
      
        // buttonContainer.appendChild(button);
        // listItem.appendChild(button);
        
        // unorderedList.appendChild(listItem);

    
    
    
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
  