import { Link } from "react-router-dom"
import style from "./NotFound.module.css"

const NotFound = (props) => {

    return (
        <div className={style.divContainer}>
            <p>UPS! PAGE NOT FOUND</p>
            <img src="src/assets/img/poke404.png" alt="404 Error" />
            <div>
                <button>
                    <Link to="/home"> BACK HOME</Link>

                </button>
            </div>

        </div>
    )
}

export default NotFound