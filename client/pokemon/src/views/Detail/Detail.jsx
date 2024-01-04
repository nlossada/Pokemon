import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { clearDetail, getDetail } from "../../redux/actions";
import style from "./Detail.module.css"

const Detail = (props) => {
    const { id } = useParams();
    const dispatch = useDispatch()
    const pokeDetail = useSelector((state) => state.pokeDetail)

    useEffect(() => {
        dispatch(getDetail(id))
        return () => {
            dispatch(clearDetail())
        }
    }, [id])



    return (
        <div className={style.container}>
            <img src={pokeDetail.image} alt="" />
            <div>
                <h2>{pokeDetail.name}</h2>
                <p>Id: {pokeDetail.id}</p>
                <p>Life: {pokeDetail.life}</p>
                <p>Attack: {pokeDetail.attack}</p>
                <p>Defense: {pokeDetail.defense}</p>
                {
                    pokeDetail.speed ? <p>Speed: {pokeDetail.speed}</p> : null
                }
                {
                    pokeDetail.height ? <p>Height: {pokeDetail.height}</p> : null
                }
                {

                    pokeDetail.weight ? <p>Weight: {pokeDetail.weight}</p> : null
                }
                <div>
                    {
                        pokeDetail.types && pokeDetail.types.map((type, index) => (
                            <h4 key={index}>{type}</h4>
                        ))
                    }
                </div>


            </div>

        </div>
    )
}

export default Detail