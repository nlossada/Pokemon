const { getPokesController, getPokesByQueryController, getPokeByIdController, postPokeController, deletePokemonController, updatePokeController, getPokeDBByIdController } = require("../controllers/pokemonsControllers")




//same handler - different controllers: for "/" -> pokemons and query name
const getPokeHandler = async (req, res) => {
    try {
        let { name } = req.query;
        if (name) {
            name = name.toLowerCase();
            const pokesByNameAPIorDB = await getPokesByQueryController(name);
            return res.status(200).json(pokesByNameAPIorDB)
        }
        const pokemonsAPI = await getPokesController();
        return res.status(200).json(pokemonsAPI)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}




const getPokeByIdHandler = async (req, res) => {
    try {
        const { idPokemon } = req.params
        const pokeByIdAPIorDB = await getPokeByIdController(idPokemon);
        return res.status(200).json(pokeByIdAPIorDB)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}




const postPokemons = async (req, res) => {
    try {
        const { TypesId, name, image, life, attack, defense, speed, height, weight } = req.body;
        const createdPoke = await postPokeController(name, image, life, attack, defense, speed, height, weight);
        //relacion Pokemons N:N Types - agrega registros a tabla intermedia
        await createdPoke.addTypes(TypesId)
        return res.status(200).json(createdPoke)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}



const deletePokemonHandler = async (req, res) => {
    try {
        const { idPokemon } = req.params
        const pokeDeleted = await deletePokemonController(idPokemon)
        if (pokeDeleted) {
            // console.log("handler: pokeDeleted" + pokeDeleted)
            return res.status(200).json({ message: "Pokemon deleted succesfully" })
        } else {
            res.status(400).json({ error: "No pokemon found to delete" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



const updatePokeHandler = async (req, res) => {
    try {
        const { idPokemon } = req.params
        const { TypesId, name, image, life, attack, defense, speed, height, weight } = req.body;

        const pokeUpdated = await updatePokeController(idPokemon, name, image, life, attack, defense, speed, height, weight)
        if (pokeUpdated) {
            if (TypesId && TypesId.length > 0) {
                //delete the types to the pokemon table instance (response controller) and add new ones
                await pokeUpdated.setTypes([])
                await pokeUpdated.addTypes(TypesId)
            }
            //GET POKE -> add Types to response
            const pokeUpdatedTypes = await getPokeDBByIdController(idPokemon)
            if (pokeUpdatedTypes) return res.status(200).json(pokeUpdatedTypes)
        } else {
            res.status(400).json({ error: "No pokemon updated" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = {
    getPokeHandler,
    getPokeByIdHandler,
    postPokemons,
    deletePokemonHandler,
    updatePokeHandler,
}