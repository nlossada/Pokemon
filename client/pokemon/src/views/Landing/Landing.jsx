import { Link } from 'react-router-dom';
import style from './Landing.module.css'
import video from "../../assets/img/video2poke.mp4"


const Landing = (props) => {

    return (
        <div className={style.container}>

            <video autoPlay loop muted className={style.video}>
                <source src={video} type="video/mp4" />
                Your browser does not support the landing video
            </video>
            <button className={style.buttonLanding}>
                <Link to="/home"> GO! </Link>

            </button>
        </div>
    )
}

export default Landing