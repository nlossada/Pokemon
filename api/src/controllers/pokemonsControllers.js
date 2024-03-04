const axios = require("axios");
const { Pokemon, Type } = require("../db");
const { getDataAPI } = require("../utils/getDataApi");
const { Op } = require("sequelize");
const { getDataDB, getDataDBObject } = require("../utils/getDataDB");


const getPokesController = async () => {
    const allAPIResults = [];
    let nextUrl = "https://pokeapi.co/api/v2/pokemon";

    // solicitudes HTTP de manera paralela usando Promise.all
    while (allAPIResults.length < 30) {
        const { data } = await axios.get(nextUrl);
        const pageResults = data.results;

        const apiRequests = pageResults.map(async (eachResult) => {
            const dataAPI = await axios.get(eachResult.url);
            return getDataAPI(dataAPI.data);
        });

        const pageAPIResults = await Promise.all(apiRequests);
        allAPIResults.push(...pageAPIResults);
        nextUrl = data.next;
    }

    // Consulta de la base de datos
    const dataDB = await Pokemon.findAll({ include: Type });
    const allDBResults = getDataDB(dataDB);

    // Combinar los resultados
    const allResults = [...allAPIResults, ...allDBResults];

    if (allResults.length > 0) {
        return allResults;
    }

    throw new Error("No pokemons found");
};




const getPokesByQueryController = async (name) => {
    //search query name on DB
    const responseDB = await Pokemon.findOne({
        where: { name: { [Op.iLike]: `%${name}` } }, include: Type
    })
    if (responseDB !== null) {
        const pokeDB = getDataDBObject(responseDB)
        if (pokeDB.name) return pokeDB
    }

    //search query name on API
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    if (data !== null) {
        const pokeAPI = getDataAPI(data)
        if (pokeAPI.name) return pokeAPI
    }
    throw new Error("No pokemons found in API or DB with name required")

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
    const responseDB = await Pokemon.findOne({
        where: { id: idPokemon }, include: Type
    })
    const pokeDB = getDataDBObject(responseDB)
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

const deletePokemonController = async (idPokemon) => {
    if (isNaN(idPokemon)) {
        const pokeDeleted = await Pokemon.destroy({ where: { id: idPokemon } })
        if (pokeDeleted === 1) return true
    }
    else {
        throw new Error("Invalid pokemon id")
    }
}

const updatePokeController = async (idPokemon, name, image, life, attack, defense, speed, height, weight) => {
    if (idPokemon) {
        const updatedProps = await Pokemon.update({
            name, image, life, attack, defense, speed, height, weight
        },
            { where: { id: idPokemon } })
        if (updatedProps > 0) {
            const responseUpdated = await Pokemon.findOne({
                where: { id: idPokemon }
            })
            if (responseUpdated) return responseUpdated
        } else {
            throw new Error(`No pokemon updated`)
        }
    } else {
        throw new Error(`No pokemon found on DB with id: ${idPokemon}`)
    }
}

const getPokeDBByIdController = async (idPokemon) => {
    const responseDB = await Pokemon.findOne({
        where: { id: idPokemon }, include: Type
    })
    const pokeDB = getDataDBObject(responseDB)
    if (pokeDB) return pokeDB
    throw new Error(`No pokemon found on DB with id: ${idPokemon}`)
}
// {
//     "name": "nuevonombre",
//     "image": "https://tse2.mm.bing.net/th?id=OIP.ijGji_u2yKkShi-O_mwRLwHaJ4&pid=Api&P=0&h=180",
//     "life": 66,
//     "attack": 2,
//     "defense": 32,
//     "speed": 66,
//     "height": 4,
//     "weight": 3,
//     "TypesId": [1]
// }



module.exports = {
    getPokesController,
    getPokesByQueryController,
    getPokeByIdController,
    postPokeController,
    deletePokemonController,
    updatePokeController,
    getPokeDBByIdController
}