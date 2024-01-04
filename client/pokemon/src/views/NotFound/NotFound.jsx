import { Link } from "react-router-dom"

const NotFound = (props) => {

    return (
        <div>
            <p>PAGE NOT FOUND</p>
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