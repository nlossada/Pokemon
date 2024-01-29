import style from "./Form.module.css"
import { useEffect, useState } from "react"
import { createDispatchHook, useDispatch, useSelector } from 'react-redux'
import { createPokemon, getDetail, getTypes } from "../../redux/actions"
import { validateInput } from "../../utils/validateInput"
import { validateSelect } from "../../utils/validateSelect"


const Form = (props) => {

    useEffect(() => {
        dispatch(getTypes())
    }, [])

    const dispatch = useDispatch()

    //types global state - for select options
    const allTypes = useSelector((state) => state.allTypes)
    const pokemonsState = useSelector(state => state.pokemons)

    //local state for input
    const [pokeData, setPokeData] = useState({
        name: "",
        image: "",
        life: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        TypesId: [],
    })

    //local state errors
    const [errors, setErrors] = useState({
        name: "Enter a name",
        image: "Enter an image link",
        life: "Enter a number of lives",
        attack: "Enter a number of attack",
        defense: "Enter a number of defense",
        speed: "",
        height: "",
        weight: "",
        TypesId: "Press Ctrl to select more than one type",
    })

    const handleChange = (event) => {
        const { name, value } = event.target;

        setPokeData((prevData) => {
            const updatedData = { ...prevData, [name]: value };

            setErrors(validateInput(updatedData));

            // avoid repeted names
            const repetedName = pokemonsState.find(pokemon => pokemon.name.toLowerCase() === updatedData.name.toLowerCase());
            if (repetedName !== undefined) {
                setErrors({ ...errors, name: "This pokemon name is not available. It already exists" });
            }
            return updatedData;
        });
    };


    //select types
    const handleSelectChange = (event) => {
        const selectedTypes = Array.from(event.target.options)
            .filter((option) => option.selected)
            .map((selected) => selected.value)
        setPokeData({ ...pokeData, TypesId: selectedTypes })
        setErrors({ ...errors, TypesId: validateSelect({ ...pokeData, TypesId: selectedTypes }) })

    }

    //Success pop up
    const [showSuccessPopup, setShowSuccessPopup] = useState(false)

    const closeSuccessPopUp = () => {
        setShowSuccessPopup(false)

    }


    //form -> select types
    const handleSubmit = (event) => {
        event.preventDefault()
        try {
            dispatch(createPokemon(pokeData))
            setPokeData({
                name: "",
                image: "",
                life: "",
                attack: "",
                defense: "",
                speed: "",
                height: "",
                weight: "",
                TypesId: [],

            })
            setShowSuccessPopup(true)

        } catch (error) {
            window.alert("No pokemon created. Please try again")
        }
    }




    return (
        <div className={style.divContainer}>

            <form onSubmit={handleSubmit} className={style.container}>

                <h2>CREATE POKEMON</h2>

                <label htmlFor="name"> Name: </label>
                <input type="text" id="name" key="name" name="name" value={pokeData.name} onChange={handleChange} />
                <p>{errors.name ? errors.name : null}</p>


                <label htmlFor="image"> Image: </label>
                <input type="text" id="image" key="image" name="image" value={pokeData.image} onChange={handleChange} />
                <p>{errors.image ? errors.image : null}</p>


                <label htmlFor="life"> Life: </label>
                <input type="text" id="life" key="life" name="life" value={pokeData.life} onChange={handleChange} />
                <p>{errors.life ? errors.life : null}</p>


                <label htmlFor="attack"> Attack: </label>
                <input type="text" id="attack" key="attack" name="attack" value={pokeData.attack} onChange={handleChange} />
                <p>{errors.attack ? errors.attack : null}</p>


                <label htmlFor="defense"> Defense: </label>
                <input type="text" id="defense" key="defense" name="defense" value={pokeData.defense} onChange={handleChange} />
                <p>{errors.defense ? errors.defense : null}</p>


                <label htmlFor="speed"> Speed: </label>
                <input type="text" id="speed" key="speed" name="speed" value={pokeData.speed} onChange={handleChange} />
                <p>{errors.speed ? errors.speed : null}</p>


                <label htmlFor="height"> Height: </label>
                <input type="text" id="height" key="height" name="height" value={pokeData.height} onChange={handleChange} />
                <p>{errors.height ? errors.height : null}</p>


                <label htmlFor="weight"> Weight: </label>
                <input type="text" id="weight" key="weight" name="weight" value={pokeData.weight} onChange={handleChange} />
                <p>{errors.weight ? errors.weight : null}</p>


                <label htmlFor="types"> Types: </label>
                <select name="TypesId" id="types" multiple onChange={handleSelectChange}>
                    {
                        allTypes && allTypes.map((type) => (
                            <option value={type.id} key={type.id}>{type.name}</option>
                        ))
                    }
                </select>
                <p>{errors.TypesId ? errors.TypesId : null}</p>



                <button
                    type="submit"
                    disabled={Object.values(errors).some(error => error && error.length > 0)}
                >CREATE YOUR POKEMON!</button>


            </form>

            <div className={style.containerImg}>
                <img src="\src\assets\img\pica2.jpg" alt="Picachu" />
                <img src="\src\assets\img\pica1.jpg" alt="Picachu" />
                <img src="\src\assets\img\pica3.jpg" alt="Picachu" />

            </div>



            {
                showSuccessPopup
                    ? (<div className={style.successPopUp}>
                        <p>✅</p>
                        <p>POKEMON CREATED SUCCESSFULLY</p>
                        <button onClick={closeSuccessPopUp}>Close</button>
                    </div>)
                    : null
            }


        </div>
    )
}

export default Form