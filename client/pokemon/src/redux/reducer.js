import { CLEAR_DETAIL, CLEAR_POKE_BY_NAME, CREATE_POKEMON, GET_DETAIL, GET_POKEMONS, GET_POKE_BY_NAME, GET_TYPES } from "./actionType"


const initialState = {
    pokemons: [],
    pokeDetail: "",
    allTypes: [],
    pokeByName: "",
    // errors: [], VER COMO SE HACE EL MANEJO DE ERRORES-> AGREGAR Y LIMPIAR EN ESTADO
}

const reducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case GET_POKEMONS:
            return {
                ...state,
                pokemons: payload
            }
        case GET_DETAIL:
            return {
                ...state,
                pokeDetail: payload
            }
        case CLEAR_DETAIL:
            return {
                ...state,
                pokeDetail: "",
            }
        case GET_TYPES:
            return {
                ...state,
                allTypes: payload

            }
        case CREATE_POKEMON:
            return {
                ...state,
                pokemons: [...state.pokemons, payload]
            }
        case GET_POKE_BY_NAME:
            return {
                ...state,
                pokeByName: payload
            }
        case CLEAR_POKE_BY_NAME:
            return {
                ...state,
                pokeByName: ""
            }
        default:
            return {
                ...state
            }

    }
}

export default reducer