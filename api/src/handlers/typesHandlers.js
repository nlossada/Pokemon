const { getTypes } = require("../controllers/typesControllers");

const getTypesHandler = async (req, res) => {
    try {
        const Alltypes = await getTypes()
        return res.status(200).json(Alltypes)

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getTypesHandler,
}