const { Router } = require("express");
const { pokemonsRouter } = require("./pokemonsRouter");
const { typesRouter } = require("./typesRouter");


const router = Router();

// Routes
router.use("/pokemons", pokemonsRouter)

router.use("/types", typesRouter)

router.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" })
})


module.exports = router;
