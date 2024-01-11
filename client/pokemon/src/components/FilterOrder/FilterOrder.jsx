import { clearFiltered, filterByOrigin, filterByType, orderByAttack, orderByName, setOriginValue, setTypeValue } from "../../redux/actions"
import style from "./FilterOrder.module.css"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"


const FilterOrder = (props) => {

    const dispatch = useDispatch()

    const allTypes = useSelector(state => state.allTypes)
    const isFilteredType = useSelector(state => state.isFilteredType)
    const isFilteredOrigin = useSelector(state => state.isFilteredOrigin)
    const isOrdered = useSelector(state => state.isOrdered)
    const originValue = useSelector(state => state.originValue)
    const typeValue = useSelector(state => state.typeValue)

    //FILTERS
    //filters selects and handlers
    // const [originValue, setOriginValue] = useState("default")
    // const [typeValue, setTypeValue] = useState("default")

    const handleFilterOrigin = (event) => {
        // setOriginValue(event.target.value)
        dispatch(setOriginValue(event.target.value))
    }
    const handleFilterType = (event) => {
        // setTypeValue(event.target.value)
        dispatch(setTypeValue(event.target.value))
    }
    //filters buttons
    const handleApplyFilters = () => {
        dispatch(filterByOrigin(originValue))
        dispatch(filterByType(typeValue))
        setAttackOrderCriteria("default")
        setNameOrderCriteria("default")
    }
    const handleClearFilters = () => {
        // setOriginValue("default")
        // setTypeValue("default")
        setAttackOrderCriteria("default")
        setNameOrderCriteria("default")
        dispatch(clearFiltered())
    }

    //SORTING
    const [nameOrderCriteria, setNameOrderCriteria] = useState("default")
    const [attackOrderCriteria, setAttackOrderCriteria] = useState("default")

    const handleNameOrder = (event) => {
        setNameOrderCriteria(event.target.value)
        dispatch(orderByName(event.target.value))
        setAttackOrderCriteria("default")
    }

    const handleAttackOrder = (event) => {
        setAttackOrderCriteria(event.target.value)
        dispatch(orderByAttack(event.target.value))
        setNameOrderCriteria("default")
    }





    return (
        <div>
            <div className={style.containerFilter}>
                <div>
                    <label htmlFor="filterOrigin">Filter by Origin:</label>
                    <select
                        name="filterOrigin"
                        id="filterOrigin"
                        onChange={handleFilterOrigin}
                        value={originValue}
                        //disable if no value selected or dismount and mount and is filtered already
                        disabled={originValue !== "default" || isFilteredOrigin}
                    >
                        <option value="default" disabled hidden>Select an option</option>
                        <option value="all">All Origins</option>
                        <option value="api">Real Pokemons</option>
                        <option value="db">Created Pokemons</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="filterType">Filter by Type:</label>
                    <select
                        name="filterType"
                        id="filterType"
                        onChange={handleFilterType}
                        value={typeValue}
                        disabled={typeValue !== "default" || isFilteredType}
                    >
                        <option value="default" disabled hidden>Select an option</option>
                        <option value="all">All Types</option>
                        {
                            allTypes && allTypes.map((type) => (
                                <option value={type.name} key={type.id}>{type.name}</option>
                            ))
                        }
                    </select>
                </div>

                <div>
                    <button
                        onClick={handleApplyFilters}
                        disabled={typeValue === "default" || originValue === "default" || isFilteredOrigin || isFilteredType}
                    >Apply Filters</button>
                    <button onClick={handleClearFilters}>Clear Filters And Order</button>
                </div>

            </div>



            <div className={style.containerFilter}>
                <div>
                    <label htmlFor="orderName">Order By Name:</label>
                    <select
                        name="orderName"
                        id="orderName"
                        onChange={handleNameOrder}
                        value={nameOrderCriteria}
                    //disable if no value selected or dismount and mount and is filtered already
                    // disabled={}
                    >
                        <option value="default" disabled hidden>Select an option</option>
                        <option value="up">A to Z</option>
                        <option value="down">Z to A</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="orderAttack">Order By Attack:</label>
                    <select
                        name="orderAttack"
                        id="orderAttack"
                        onChange={handleAttackOrder}
                        value={attackOrderCriteria}
                    //disable if no value selected or dismount and mount and is filtered already
                    // disabled={}
                    >
                        <option value="default" disabled hidden>Select an option</option>
                        <option value="up">Min to Max</option>
                        <option value="down">Max to Min</option>
                    </select>
                </div>

            </div>
            {
                isFilteredOrigin || isFilteredType || isOrdered
                    ? <p>Filters are applied, clear them to continue</p>
                    : null
            }
        </div>
    )
}


export default FilterOrder