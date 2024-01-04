

//filter data from object api {} ->  pokemons/?name="" = pokemons/idPokemon - request only to url of one Pokemon
const getDataAPI = (dataAPI) => {
    //no funciona con las props por -medio:  dataAPI.sprites.other.official - artwork.front_default; 
    let imagePoke = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${dataAPI.id}.png`
    if (!imagePoke) {
        imagePoke = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${dataAPI.id}.png`
    }

    const filterHp = dataAPI.stats.find((element) => element.stat.name === "hp")
    const lifeHpNum = filterHp.base_stat
    const filterAttack = dataAPI.stats.find((element) => element.stat.name === "attack")
    const attackNum = filterAttack.base_stat
    const filterDefense = dataAPI.stats.find((element) => element.stat.name === "defense")
    const defenseNum = filterDefense.base_stat
    const filterSpeed = dataAPI.stats.find((element) => element.stat.name === "speed")
    const speedNum = filterSpeed.base_stat

    const typesNames = dataAPI.types.map((type) => type.type.name)

    const pokemon = {
        id: dataAPI.id,
        name: dataAPI.name,
        image: imagePoke,
        life: lifeHpNum,
        attack: attackNum,
        defense: defenseNum,
        speed: speedNum,
        height: dataAPI.height,
        weight: dataAPI.weight,
        types: typesNames,
    }

    if (pokemon) return pokemon;
    throw new Error("Missing data from getDataAPI")
}



module.exports = {
    getDataAPI,
}
