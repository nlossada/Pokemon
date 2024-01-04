import { CLEAR_DETAIL, CLEAR_POKE_BY_NAME, CREATE_POKEMON, GET_DETAIL, GET_POKEMONS, GET_POKE_BY_NAME, GET_TYPES } from "./actionType"
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
            dispatch({
                type: GET_POKE_BY_NAME,
                payload: data
            })
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

