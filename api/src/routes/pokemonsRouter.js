const { Router } = require("express");
const { getPokeHandler, getPokeByIdHandler, postPokemons, deletePokemonHandler } = require("../handlers/pokemonsHandlers")

const pokemonsRouter = Router();


//main route of pokemons and pokemons by query name
pokemonsRouter.get("/", getPokeHandler);

pokemonsRouter.get("/:idPokemon", getPokeByIdHandler);

pokemonsRouter.post("/", postPokemons);

pokemonsRouter.delete("/:idPokemon", deletePokemonHandler)

module.exports = {
    pokemonsRouter
}