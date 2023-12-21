const { getPokesController, getPokesByQueryController, getPokeByIdController, postPokeController } = require("../controllers/pokemonsControllers")

//* Ruta => Llamar al Handler

//* Handler
//*   Recibir y desestructurar información
//*   Invoca al controlador
//*   Maneja el error (try/catch)
//*   Dar la respuesta

//* Controller
//*   Comunicación con el exterior (BBDD ó API externa)
//*   Devolver información o un error

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


module.exports = {
    getPokeHandler,
    getPokeByIdHandler,
    postPokemons,
}