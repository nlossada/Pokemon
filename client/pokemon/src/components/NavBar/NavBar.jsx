import style from './NavBar.module.css'
import { NavLink, useLocation } from "react-router-dom";
// import SearchBar from "../SearchBar/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { clearPokeByName, getPokeByName } from "../../redux/actions";


const NavBar = (props) => {

    //search bar
    const dispatch = useDispatch()
    const [nameSearch, setNameSearch] = useState("")

    const handleSearch = (event) => {
        setNameSearch(event.target.value)
    }

    const handleClickSearch = (event) => {
        if (!nameSearch) window.alert("Must enter a name")
        event.preventDefault()
        dispatch(getPokeByName(nameSearch))
        setNameSearch("")
    }

    // const handleClickSearch = async (event) => {
    //     event.preventDefault()
    //     if (!nameSearch) window.alert("Must enter a name")
    //     try {
    //         await dispatch(getPokeByName(nameSearch))
    //         setNameSearch("")
    //     }
    //     catch (error) {
    //         window.alert(`No pokemons found with name ${nameSearch}. The search must be exact`)
    //     }
    // }

    const location = useLocation()

    //clear globar state pokeByName to render pokemons at Home's View
    const handleClickHome = (event) => {
        dispatch(clearPokeByName())
    }




    return (
        <div className={style.containerNav}>
            <div>
                <button onClick={handleClickHome}>
                    <NavLink
                        to="/home"
                    >Home</NavLink>
                </button>
                <button>
                    <NavLink
                        to="/form"
                    >Create Pokemon</NavLink>
                </button>
            </div>

            <div>
                <img src="\src\assets\img\logo.jpg" alt="Pokemon Logo" />
            </div>

            {
                location.pathname === "/home"
                    ? (<div>
                        <input type="text" onChange={handleSearch} value={nameSearch} />
                        <button onClick={handleClickSearch}>Search</button>
                    </div>)
                    : null

            }

        </div>
    )
}

export default NavBar