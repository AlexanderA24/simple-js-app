let pokemonRepository = ( function () {
    let pokemonList = [
        {name: "Pikachu", type:["electric","mouse"], height:2}, 
        {name: "Squirtle", type:["water","turtle"], height:3},
        {name: "Bulbasoar", type:["Grass", "monster"], height:1}
    ]

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    
    }
    return {
        add:add,
        getAll: getAll
    };
})();

// pokemonRepository.add({name: "Charizard",type:["fire","dragon"],height:12});

function listPokemon(pokemon) {
    if (pokemon["height"] > 2  ) {
        document.write(pokemon["name"].concat(" height:", 
            pokemon["height"]).concat("- Wow, that's big! <br>"))
    }  else {
        document.write(pokemon["name"].concat(" height:", 
            pokemon["height"]).concat("<br>"))
    }
}

pokemonRepository.getAll().forEach(listPokemon);

