import Cards from "../../components/Cards/Cards"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getPokemons } from "../../redux/actions";
import Pages from "../../components/Pages/Pages";






const Home = (props) => {

    //get all pokemons
    const dispatch = useDispatch();
    const pokemonsState = useSelector((state) => state.pokemons)
    const pokeByNameState = useSelector((state) => state.pokeByName)

    useEffect(() => {
        dispatch(getPokemons());
    }, [dispatch])


    //Pagination
    const [currentPage, setCurrentPage] = useState(1)
    const cardsPerPage = 12
    const totalCards = pokemonsState.length

    //Render pokemon by name search
    let pokemonsPerPage = []
    if (pokeByNameState.id) {
        pokemonsPerPage.push(pokeByNameState)
    }
    //Render all pokemons
    else {
        pokemonsPerPage = pokemonsState.slice(
            (currentPage - 1) * cardsPerPage, currentPage * cardsPerPage
        )
    }
    const onPageChange = (page) => {
        setCurrentPage(page)
    }





    return (
        <div>
            {
                pokeByNameState.id
                    ? null
                    : <Pages
                        currentPage={currentPage}
                        cardsPerPage={cardsPerPage}
                        totalCards={totalCards}
                        onPageChange={onPageChange}
                    />
            }


            < Cards pokemonsPerPage={pokemonsPerPage} />

        </div>
    )
}
export default Home