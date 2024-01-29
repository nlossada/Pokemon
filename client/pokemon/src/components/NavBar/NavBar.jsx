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
        if (!nameSearch) return window.alert("Must enter a name")
        event.preventDefault()
        dispatch(getPokeByName(nameSearch))
        setNameSearch("")
    }


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
                        style={({ isActive }) => isActive ? { color: "gray" } : null}
                    > Create Pokemon </NavLink>
                </button>
            </div>

            <div>
                <img src="\src\assets\img\logo.jpg" alt="Pokemon Logo" />
            </div>

            {
                location.pathname === "/home"
                    ? (<div>
                        <input type="text" onChange={handleSearch} value={nameSearch} placeholder="Enter a name" />
                        <button onClick={handleClickSearch}>Search</button>
                    </div>)
                    : null

            }

        </div>
    )
}

export default NavBar