const axios = require("axios");
const { Type } = require("../db");

const getTypes = async () => {
    //primero pedir a la BBDD
    let typesDB = await Type.findAll();
    //if DB EMPTY -> get from API and save in DB
    if (typesDB.length === 0) {
        const { data } = await axios.get("https://pokeapi.co/api/v2/type")
        const typesAPI = data.results
        // [ {name: fire, url: }, {name: normal, url:..type/1 }]

        for (const type of typesAPI) {
            const typeName = type.name
            const newTypeDB = await Type.create({ name: typeName })
        }
        typesDB = await Type.findAll()
    }
    if (typesDB) return typesDB;
    throw new Error("No types found")
}

//controlado thunder client
/*POST http://localhost:3001/types
RES:
[
  {
    "id": "f7e4cef5-31bf-4fc6-bc03-f54ff9549dd9",
    "name": "normal"
  },
  {
    "id": "86da6ee6-2cc5-449b-9c2f-5d5997ced2f5",
    "name": "fighting"
  },

*/

module.exports = {
    getTypes
}