

//standardize data from array -> findAll []
const getDataDB = (data) => {
    const pokemons = data.map((pokemon) => ({
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.image,
        life: pokemon.life,
        attack: pokemon.attack,
        defense: pokemon.defense,
        speed: pokemon.speed,
        height: pokemon.height,
        weight: pokemon.weight,
        types: pokemon.types.map((type) => type.name)
    }))

    if (pokemons) return pokemons;
    throw new Error("Missing data from getDataDB")
}


//standardize data from object -> findOne {}
const getDataDBObject = (pokemon) => {
    const pokeData = {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.image,
        life: pokemon.life,
        attack: pokemon.attack,
        defense: pokemon.defense,
        speed: pokemon.speed,
        height: pokemon.height,
        weight: pokemon.weight,
        types: pokemon.types.map((type) => type.name)
    }

    if (pokeData) return pokeData
    throw new Error("Missing data from getDataDBObject")
}

module.exports = {
    getDataDB,
    getDataDBObject
}