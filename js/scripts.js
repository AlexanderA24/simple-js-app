let pokemonRepository = (function () {
    let pokemonList = [
      { name: "Pikachu", type: ["electric", "mouse"], height: 2 },
      { name: "Squirtle", type: ["water", "turtle"], height: 3 },
      { name: "Bulbasoar", type: ["Grass", "monster"], height: 1 },
    ];
  
    function arrayEquals(a, b) {
      return (
        Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index])
      );
    }
  
    function add(pokemon) {
      // Check if variable pushed is of object type //
      if (
        typeof pokemon === "object" &&
        !Array.isArray(pokemon) &&
        pokemon !== null
      ) {
        // Check if Pushed keys match pokemonList keys //
        let pokeKeys = ["name", "type", "height"];
        let pushedobject = Object.keys(pokemon);
  
        if (arrayEquals(pushedobject, pokeKeys)) {
          // Check if data types match //
          if (
            typeof pokemon["name"] === "string" &&
            Array.isArray(pokemon["type"]) &&
            typeof pokemon["height"] === "number"
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
  
    function getAll() {
      return pokemonList;
    }
  
    function search(query) {
      var filteredList = pokemonList.filter(function (pokemon) {
        return pokemon.name == query;
      });
  
      return console.log(filteredList);
    }

    function showDetails(pokemon) {
        console.log(pokemon)
    }

    function addListItem(pokemon) {

        let unorderedList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
    
        button.innerText = pokemon.name;
        button.classList.add("button");

        button.addEventListener('click', showDetails);
           

        listItem.appendChild(button);
        unorderedList.appendChild(listItem);

    
    }
  
  

    return {
      add: add,
      getAll: getAll,
      search: search,
      addListItem: addListItem
    };
  })();
  
  
 
  
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon)

  });
  