import React from 'react';
import './home.css';
import { Link } from 'react-router-dom';
import girlImg from './4c6c5075072392b654e1b756372d1d16.jpg'

const Home = () => {

    return (
        <header>

            <div className='header-content'>
                <div className='content-main'>
                    <h1>Все женские украшения</h1>
                    <p>По-настоящему роскошное украшение для самых красивых женщин</p>
                    <Link to='/product' className='content-main_button'>
                        Покупайте сейчас
                    </Link>
                </div>
            </div>
            <div className='girl'>
                <img src={girlImg} alt="" />
            </div>
        </header>
    )


}

export default Home;
