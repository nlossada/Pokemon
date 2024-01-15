const server = require('../../src/app')
const session = require('supertest');
const agent = session(server);

const pokemonTest = {
    name: "TINIPOKE",
    image: "https://tse3.mm.bing.net/th?id=OIP.1y_ZFNuMRjduUXsVVxXQDgHaHa&pid=Api&P=0&h=180",
    life: 2,
    attack: 12,
    defense: 3,
    speed: 5,
    height: 12,
    weight: 10,
    TypesId: [1, 5]
}

describe("Routes test", () => {

    //Route GET pokemons/:id -params
    describe("GET /pokemons/:id", () => {
        it("Responds with status 200", async () => {
            await agent.get("pokemons/1").expect(200)
        })
        it("Responds with an object with id, name, image, life, attack, defense, types properties", async () => {
            const response = await agent.get("pokemons/1")
            expect(response.body).toHaveProperty("id")
            expect(response.body).toHaveProperty("name")
            expect(response.body).toHaveProperty("image")
            expect(response.body).toHaveProperty("life")
            expect(response.body).toHaveProperty("attack")
            expect(response.body).toHaveProperty("defense")
        })
        it("If there is an error it responds with status 404", async () => {
            const response = await agent.get("/pokemon/1900")
            expect(response.status).toBe(404)
        })
    })

    // Route GET pokemons?name="..." -query
    describe("GET /pokemons", () => {
        it("Responds with a pokemon object when searching for the name by query", async () => {
            //credenciales llegan por query, cambiar request url
            const response = await agent.get("/pokemons?name=ivysaur")
            expect(response.body).toHaveProperty("id")
            expect(response.body).toHaveProperty("name")
            expect(response.body).toHaveProperty("image")
            expect(response.body).toHaveProperty("life")
            expect(response.body).toHaveProperty("attack")
            expect(response.body).toHaveProperty("defense")
        })
        it("If there is an error it responds with status 400", async () => {
            const response = await agent.get("/pokemons?name=ivysauuuuuuur")
            expect(response.status).toBe(400)
        })
    })

    //Route POST pokemons
    describe("POST /pokemons", () => {
        it("Responds with the pokemon object sent by body", async () => {
            const response = await agent
                .post('/pokemons')
                .send(pokemonTest)
            expect(response.body).toHaveProperty("id")
            expect(response.body).toHaveProperty("name")
            expect(response.body).toHaveProperty("image")
            expect(response.body).toHaveProperty("life")
            expect(response.body).toHaveProperty("attack")
            expect(response.body).toHaveProperty("defense")
        })
    })
})

