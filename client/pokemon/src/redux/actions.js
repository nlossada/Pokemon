import { CLEAR_DETAIL, CLEAR_FILTERED, CLEAR_POKE_BY_NAME, CREATE_POKEMON, FILTER_BY_ORIGIN, FILTER_BY_TYPE, GET_DETAIL, GET_POKEMONS, GET_POKE_BY_NAME, GET_TYPES, ORDER_BY_ATTACK, ORDER_BY_NAME, SET_ORIGIN_VALUE, SET_TYPE_VALUE } from "./actionType"
import axios from "axios"


export const getPokemons = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get("http://localhost:3001/pokemons")
            dispatch({
                type: GET_POKEMONS,
                payload: data
            })
        } catch (error) {
            //! preguntar para cambiar
            //ideal, despachar un error y modificar reducer,
            // creando nuevo case ERROR y nnuevo estado errors{}, si tiene algo, mostrar el error al usuario
            // limpiar error en cada caso positivo
            window.alert(error.message)
        }
    }
}




export const getDetail = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`http://localhost:3001/pokemons/${id}`)
            dispatch({
                type: GET_DETAIL,
                payload: data
            })

        } catch (error) {
            window.alert(error.message)
        }
    }
}

export const clearDetail = () => {
    return {
        type: CLEAR_DETAIL,
    }

}



export const getTypes = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get("http://localhost:3001/types")
            dispatch({
                type: GET_TYPES,
                payload: data
            })

        } catch (error) {
            window.alert(error.message)
        }
    }
}


export const createPokemon = (pokemonData) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post("http://localhost:3001/pokemons", pokemonData)
            dispatch({
                type: CREATE_POKEMON,
                payload: data
            })

        } catch (error) {
            window.alert(error.message)
        }
    }

}

export const getPokeByName = (name) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`http://localhost:3001/pokemons/?name=${name}`)
            if (data && data.id) {
                dispatch({
                    type: GET_POKE_BY_NAME,
                    payload: data
                })
            } else {
                throw new Error("No pokemon found with that name")
            }

        } catch (error) {
            window.alert(error.message)
        }
    }
}
export const clearPokeByName = () => {
    return {
        type: CLEAR_POKE_BY_NAME,
    }
}

export const filterByOrigin = (origin) => {
    return {
        type: FILTER_BY_ORIGIN,
        payload: origin
    }
}

export const filterByType = (type) => {
    return {
        type: FILTER_BY_TYPE,
        payload: type
    }
}

export const clearFiltered = () => {
    return {
        type: CLEAR_FILTERED,
    }
}

export const setOriginValue = (origin) => {
    return {
        type: SET_ORIGIN_VALUE,
        payload: origin
    }
}
export const setTypeValue = (type) => {
    return {
        type: SET_TYPE_VALUE,
        payload: type
    }
}



export const orderByName = (criteria) => {
    return {
        type: ORDER_BY_NAME,
        payload: criteria
    }
}

export const orderByAttack = (criteria) => {
    return {
        type: ORDER_BY_ATTACK,
        payload: criteria
    }
}


