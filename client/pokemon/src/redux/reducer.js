import { CLEAR_DETAIL, CLEAR_FILTERED, CLEAR_POKE_BY_NAME, CREATE_POKEMON, DELETE_POKEMON, FILTER_BY_ORIGIN, FILTER_BY_TYPE, GET_DETAIL, GET_POKEMONS, GET_POKE_BY_NAME, GET_TYPES, ORDER_BY_ATTACK, ORDER_BY_NAME, SET_ORIGIN_VALUE, SET_TYPE_VALUE } from "./actionType"


const initialState = {
    pokemons: [],
    pokeDetail: "",
    allTypes: [],
    pokeByName: "",
    filteredPokemons: [],
    isFilteredOrigin: false,
    isFilteredType: false,
    originValue: "default",
    typeValue: "default",
    isOrdered: false,
}

const reducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case GET_POKEMONS:
            return {
                ...state,
                pokemons: payload,
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
                pokemons: [...state.pokemons, payload],
            }
        case DELETE_POKEMON:
            const noDeletedPokemons = state.pokemons.filter(pokemon => pokemon.id !== payload)
            const noDeletedFiltered = state.filteredPokemons.filter(pokemon => pokemon.id !== payload)
            return {
                ...state,
                pokemons: noDeletedPokemons,
                filteredPokemons: noDeletedFiltered
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
        case FILTER_BY_ORIGIN:
            if (payload === "all") {
                if (state.isFilteredType) {
                    return {
                        ...state,
                        filteredPokemons: [...state.filteredPokemons],
                        isFilteredOrigin: true
                    }
                }
                else {
                    return {
                        ...state,
                        filteredPokemons: [...state.pokemons],
                        isFilteredOrigin: true
                    }
                }

            }

            let filteredOrigin = []
            if (payload === "api") {
                if (state.isFilteredType) {
                    filteredOrigin = state.filteredPokemons.filter(pokemon => typeof pokemon.id === "number")
                }
                else {
                    filteredOrigin = state.pokemons.filter(pokemon => typeof pokemon.id === "number")
                }
            } else if (payload === "db") {
                if (state.isFilteredType) {
                    filteredOrigin = state.filteredPokemons.filter(pokemon => typeof pokemon.id === "string")
                }
                else {
                    filteredOrigin = state.pokemons.filter(pokemon => typeof pokemon.id === "string")
                }
            }
            return {
                ...state,
                filteredPokemons: filteredOrigin,
                isFilteredOrigin: true
            }
        case FILTER_BY_TYPE:
            if (payload === "all") {
                if (state.isFilteredOrigin) {
                    return {
                        ...state,
                        filteredPokemons: [...state.filteredPokemons],
                        isFilteredType: true
                    }
                }
                else {
                    return {
                        ...state,
                        filteredPokemons: [...state.pokemons],
                        isFilteredType: true
                    }
                }
            }
            let filteredByType = []
            if (state.isFilteredOrigin) {
                filteredByType = state.filteredPokemons.filter(
                    pokemon => {
                        return pokemon.types.some(type => type === payload)
                    })
            }
            else {
                filteredByType = state.pokemons.filter(
                    pokemon => {
                        return pokemon.types.some(type => type === payload)
                    })
            }
            return {
                ...state,
                filteredPokemons: filteredByType,
                isFilteredType: true
            }
        case CLEAR_FILTERED:
            return {
                ...state,
                isFilteredType: false,
                isFilteredOrigin: false,
                isOrdered: false,
                typeValue: "default",
                originValue: "default",
                filteredPokemons: [...state.pokemons]
            }
        case SET_ORIGIN_VALUE:
            return {
                ...state,
                originValue: payload
            }
        case SET_TYPE_VALUE:
            return {
                ...state,
                typeValue: payload
            }

        case ORDER_BY_ATTACK:
            let orderCopyState;
            if (state.filteredPokemons.length === 0) {
                orderCopyState = [...state.pokemons]
            } else {
                orderCopyState = [...state.filteredPokemons]
            }
            if (payload === "up") {
                orderCopyState.sort((a, b) => a.attack - b.attack)
            }
            if (payload === "down") {
                orderCopyState.sort((a, b) => b.attack - a.attack)
            }
            return {
                ...state,
                filteredPokemons: orderCopyState,
                isOrdered: true
            }

        case ORDER_BY_NAME:
            let orderNameCopyState;
            if (state.filteredPokemons.length === 0) {
                orderNameCopyState = [...state.pokemons]
            } else {
                orderNameCopyState = [...state.filteredPokemons]
            }
            if (payload === "up") {
                orderNameCopyState.sort((a, b) => a.name.localeCompare(b.name))
            }
            if (payload === "down") {
                orderNameCopyState.sort((a, b) => b.name.localeCompare(a.name))
            }
            return {
                ...state,
                filteredPokemons: orderNameCopyState,
                isOrdered: true
            }



        default:
            return {
                ...state
            }

    }
}



export default reducer