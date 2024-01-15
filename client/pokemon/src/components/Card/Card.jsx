import style from './Card.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deletePokemon } from '../../redux/actions';

const Card = ({ pokemon }) => {
    const dispatch = useDispatch();
    const pokeByNameState = useSelector(state => state.pokeByName)




    const handleDelete = (id) => {
        dispatch(deletePokemon(id))
    }

    return (
        <div className={style.container}>
            <h3>{pokemon.name.toUpperCase()}</h3>


            <Link to={`/detail/${pokemon.id}`}>
                <img src={pokemon.image} alt={pokemon.name} />
            </Link>

            <div className={style.containerRow}>
                {
                    pokemon.types && pokemon.types.map((type, index) => (
                        <p key={index}>{type.toUpperCase()}</p>
                    ))
                }
            </div>

            { //In created pokemons card just HOME no pokeByName results, conditional render to delete and update
                typeof pokemon.id === "number" || pokeByNameState.id
                    ? null
                    : <div className={style.containerRow}>
                        <button onClick={() => handleDelete(pokemon.id)}>Delete</button>
                        <button>Update</button>
                    </div>
            }

        </div>
    )
}

export default Card