import { useEffect } from "react";
import Card from "../Card/Card"
import { useDispatch, useSelector } from 'react-redux'
import { getPokemons } from "../../redux/actions";
import style from './Cards.module.css'

const Cards = ({ pokemonsPerPage }) => {


    return (
        <div className={style.container}>
            {
                pokemonsPerPage && pokemonsPerPage.map((pokemon) =>
                (< Card
                    key={pokemon.id}
                    pokemon={pokemon}
                />)
                )
            }
        </div>
    )
}

export default Cards