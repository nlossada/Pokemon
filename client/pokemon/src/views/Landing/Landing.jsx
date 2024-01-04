import { Link } from 'react-router-dom';
import style from './Landing.module.css'


const Landing = (props) => {

    return (
        <div className={style.container}>
            <button className={style.buttonLanding}>
                <Link to="/home"> GO TO /HOME </Link>

            </button>
        </div>
    )
}

export default Landing