import style from './Card.module.css'
import { Link } from 'react-router-dom'

const Card = ({ pokemon }) => {
    return (
        <div className={style.container}>
            <h3>{pokemon.name.toUpperCase()}</h3>
            <Link to={`/detail/${pokemon.id}`}>
                <img src={pokemon.image} alt={pokemon.name} />
            </Link>

            <div className={style.types}>
                {
                    pokemon.types && pokemon.types.map((type) => (
                        <p>{type}</p>
                    ))
                }
            </div>

        </div>
    )
}

export default Card