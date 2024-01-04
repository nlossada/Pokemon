
export const validateSelect = (pokeData) => {
    const errors = {}

    if (!pokeData.TypesId.length) errors.TypesId = "You must select at least one type"
    else {
        if (pokeData.TypesId.length > 2) errors.TypesId = "You must select two types at most"
    }
    return errors
}