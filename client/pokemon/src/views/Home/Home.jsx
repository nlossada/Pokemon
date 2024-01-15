import Cards from "../../components/Cards/Cards"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getPokemons, getTypes } from "../../redux/actions";
import Pages from "../../components/Pages/Pages";
import FilterOrder from "../../components/FilterOrder/FilterOrder";
import style from "./Home.module.css"







const Home = (props) => {


    const dispatch = useDispatch();

    //state redux
    const pokemonsState = useSelector((state) => state.pokemons)
    const pokeByNameState = useSelector((state) => state.pokeByName)
    const isFilteredOriginState = useSelector(state => state.isFilteredOrigin)
    const isFilteredTypeState = useSelector(state => state.isFilteredType)
    const filteredPokemonsState = useSelector(state => state.filteredPokemons)
    const isOrdered = useSelector(state => state.isOrdered)



    // Get allTypes -> filter and create pokemon
    useEffect(() => {
        dispatch(getTypes())
    }, [])

    //Loading gif and allPokemons
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getPokemons());
                setIsLoading(false)
            } catch (error) {
                window.alert(error.message)
                setIsLoading(false)
            }
        }
        fetchData();
    }, [dispatch])


    //Pagination
    const [currentPage, setCurrentPage] = useState(1)
    const cardsPerPage = 12
    const onPageChange = (page) => {
        setCurrentPage(page)
    }
    let totalCards;


    //CARDS RENDER -> nameSearch or filtered or allPokemons
    let pokemonsPerPage = []
    //Render pokemon by nameSearch
    if (pokeByNameState.id) {
        pokemonsPerPage.push(pokeByNameState)
    }
    // Render filtered Pokemons
    else if (isFilteredOriginState || isFilteredTypeState || isOrdered) {
        totalCards = filteredPokemonsState.length
        pokemonsPerPage = filteredPokemonsState.slice(
            (currentPage - 1) * cardsPerPage, currentPage * cardsPerPage
        )
    }
    //Render all pokemons
    else {
        totalCards = pokemonsState.length
        pokemonsPerPage = pokemonsState.slice(
            (currentPage - 1) * cardsPerPage, currentPage * cardsPerPage
        )
    }






    return (
        <div className={style.container}>

            { //loading conditional render
                isLoading
                    ? <div>
                        <img src="\src\assets\img\pokemonGif.webp" alt="loading pokemon" />
                        <p>Loading...</p>
                    </div>
                    : null
            }

            { //pages conditional render if nameSearch or loading pokemon
                isLoading || pokeByNameState.id
                    ? null
                    : <Pages
                        currentPage={currentPage}
                        cardsPerPage={cardsPerPage}
                        totalCards={totalCards}
                        onPageChange={onPageChange}
                    />
            }

            { //FilterOrder conditional render if nameSearch or loading pokemon
                isLoading || pokeByNameState.id
                    ? null
                    : <FilterOrder onPageChange={onPageChange}
                    />
            }

            {
                isLoading
                    ? null
                    : < Cards pokemonsPerPage={pokemonsPerPage} />
            }




        </div>
    )
}
export default Home