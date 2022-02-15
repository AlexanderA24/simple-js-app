// Create pokemon list object //
let pokemonList = [
    {name: "Pikachu", type:["electric","mouse"], height:2}, 
    {name: "Squirtle", type:["water","turtle"], height:3},
    {name: "Bulbasoar", type:["Grass", "monster"], height:1}
]

// Loop through each pokemon and output name and height on new lines //
for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i]["height"] > 2  ) {
        document.write(pokemonList[i]["name"].concat(" height:", 
            pokemonList[i]["height"]).concat("- Wow, that's big! <br>"))
    }  else {
        document.write(pokemonList[i]["name"].concat(" height:", 
            pokemonList[i]["height"]).concat("<br>"))
    }
}

