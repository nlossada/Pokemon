const axios = require("axios");
const { Pokemon, Type } = require("../db");
const { getDataAPI } = require("../utils/getDataApi");
const { Op } = require("sequelize");
const { getDataDB } = require("../utils/getDataDB");



//GET pokemons, per pages
const getPokesController = async () => {
    let allResults = [];
    let nextUrl = "https://pokeapi.co/api/v2/pokemon";
    let requestsPages = 0;
    //insert page, start in 0=page1 -> 5 includes page5
    while (requestsPages < 5) {
        const { data } = await axios.get(nextUrl);
        const pageResults = data.results;
        // data.results -> [ {name: , url:...pokemon/id/ } , {name: , url:} ]

        if (!pageResults.length) {
            throw new Error("No pokemons found");
        }
        allResults = [...allResults, ...pageResults];
        nextUrl = data.next;
        requestsPages++;
    }
    if (allResults) return allResults;
    throw new Error("No pokemons found")
};




const getPokesByQueryController = async (name) => {
    //search query name on DB
    const responseDB = await Pokemon.findAll({
        where: { name: { [Op.iLike]: `%${name}` } }, include: Type
    })
    const pokesDB = getDataDB(responseDB)
    if (pokesDB.length > 0) return pokesDB
    //search query name on API
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    const pokeAPI = getDataAPI(data)
    if (pokeAPI.name) return pokeAPI

    throw new Error("No pokemons found in API or DB with query")
}




const getPokeByIdController = async (idPokemon) => {
    //id params always sting -> if numeric id -> api search
    if (!isNaN(idPokemon) && !isNaN(parseFloat(idPokemon))) {
        const idPokemonNum = Number(idPokemon)
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemonNum}`)
        const pokeAPI = getDataAPI(data)
        if (pokeAPI) return pokeAPI
        throw new Error(`No pokemon found on API with id: ${idPokemon}`)
    }
    //else -> id UUID -> DB search
    const responseDB = await Pokemon.findAll({
        where: { id: idPokemon }, include: Type
    })
    //find all -> [] y estandarizo la data con map y crea objetos idénticos siempre
    const pokeDB = getDataDB(responseDB)
    if (pokeDB) return pokeDB
    throw new Error(`No pokemon found on DB with id: ${idPokemon}`)
}




const postPokeController = async (name, image, life, attack, defense, speed, height, weight) => {
    if (name && image && life && attack && defense) {
        const newPokemon = await Pokemon.create({
            name, image, life, attack, defense, speed, height, weight

        })
        if (newPokemon) return newPokemon
    }
    throw new Error("No pokemon created, missing data")
}



module.exports = {
    getPokesController,
    getPokesByQueryController,
    getPokeByIdController,
    postPokeController,
}