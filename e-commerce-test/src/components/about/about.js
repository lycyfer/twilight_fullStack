import './about.css'
import masha from '../about/img/Omo9wA4ur3k.jpg'
import twlight from '../about/img/NVIDIA_Share_zHwTFFtVfn-transformed.png'
import twilightFront from "./img/twilight_front.png"
import twilightIn from "./img/twilight_in.png"
import { useState } from 'react'
import 'leaflet/dist/leaflet.css';
import Map from '../map/map'
const About = () => {
    const [isBackVisible, setIsBackVisible] = useState(false)

    const handleImageClick = () => {
        setIsBackVisible(!isBackVisible);
    };

    const location = [
        {
            id: 1,
            latitude: 55.7558,
            longitude: 37.6173,
        }
    ]

    return (
        <div className="about">
            <div className='about_me'>
                <h1>История Twilight</h1>
                <div className='footer_about_block'>
                    <div className={`image-container ${isBackVisible ? 'swapped' : ''}`}>
                        <img
                            src={twilightFront}
                            alt="Twilight Front"
                            onClick={handleImageClick}
                            className={`front-image ${isBackVisible ? 'hidden' : ''}`}
                        />
                        <img
                            src={twilightIn}
                            alt="Twilight Back"
                            className={`back-image ${isBackVisible ? 'visible' : 'hidden'}`}
                        />
                    </div>
                    <div className='about-text_block'>
                        Twilight - это утонченный и стильный ювелирный интернет-магазин, где представлены изысканные украшения для тех, кто ценит красоту и элегантность. В ассортименте магазина представлены уникальные изделия из драгоценных металлов, драгоценных камней и жемчуга, созданные мастерами-ювелирами с большим опытом. Каждое украшение в магазине Twilight - это произведение искусства, которое подчеркнет вашу индивидуальность и станет ярким акцентом вашего образа. Благодаря удобному интерфейсу и быстрой доставке, покупка в магазине Twilight станет приятным и удобным процессом. Погрузитесь в мир роскоши и красоты с ювелирным интернет-магазином Twilight.
                    </div>
                </div>
                <div className='location'>
                    <h2>
                        Где нас найти
                    </h2>
                    <div className='location_info'>
                        <div className='location_info_desk'>
                            <h3>Адрес</h3>
                            <p>г. Москва, ул. Ленина, д. 12</p>
                            <h3>Часы работы</h3>
                            <p>Понедельник - Пятница: 9:00 - 18:00</p>
                            <p>Суббота - Воскресенье: выходной</p>
                            <h3>Контактная информация</h3>
                            <p>Телефон: +7 (928) 402-65-26</p>
                            <p>Email: mariya_talyanskaya@mail.ru</p>
                            <a href="https://wa.me/79284026526" className='ws_button'>
                                <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.52024 7.76662C9.33885 7.35303 9.13737 7.34298 8.96603 7.34298C8.81477 7.33294 8.65288 7.33294 8.48154 7.33294C8.32083 7.33294 8.04845 7.3932 7.81684 7.64549C7.58464 7.89719 6.95007 8.49217 6.95007 9.71167C6.95007 10.9318 7.83693 12.1111 7.95805 12.2724C8.07858 12.4337 9.67149 15.0139 12.192 16.0124C14.2883 16.839 14.712 16.6777 15.1657 16.6269C15.6189 16.5767 16.6275 16.0325 16.839 15.4476C17.0405 14.8733 17.0405 14.3693 16.9802 14.2682C16.9199 14.1678 16.748 14.1069 16.5064 13.9758C16.2541 13.8552 15.0446 13.2502 14.813 13.1693C14.5808 13.0889 14.4195 13.0487 14.2582 13.2904C14.0969 13.5427 13.623 14.0969 13.4724 14.2582C13.3306 14.4195 13.1799 14.4396 12.9377 14.3185C12.686 14.1979 11.8895 13.9356 10.9418 13.0889C10.2056 12.4331 9.71167 11.6171 9.56041 11.3755C9.41979 11.1232 9.54032 10.992 9.67149 10.8709C9.78257 10.7604 9.92378 10.579 10.0449 10.4378C10.1654 10.296 10.2056 10.1855 10.2966 10.0242C10.377 9.86292 10.3368 9.71167 10.2765 9.59114C10.2157 9.48006 9.74239 8.26056 9.52024 7.76662Z" stroke="currentColor" stroke-linejoin="round" />
                                </svg>
                                <span>WhatsApp</span>
                            </a>
                            <a href="https://t.me/taaaalm" className='tg_button'>
                                <svg width="40px" height="40px" viewBox="-20 0 190 190" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M76.33 132.14L62.5 143.73L58.59 144.26L49.84 114.11L19.06 104L113.82 67.8799L118.29 67.9799L103.36 149.19L76.33 132.14ZM100.03 83.1399L56.61 109.17L61.61 130.5L62.98 130.19L68.2 113.73L102.9 83.4799L100.03 83.1399Z" fill="currentColor" />
                                </svg>
                                <span>Telegram</span>
                            </a>
                        </div>
                        <Map items={location} />
                    </div>
                </div>
                <h2 className='aboutMe'>Обо мне</h2>
                <div className='about__container'>

                    <div className='about__me'>
                        <div className='about__me-img'>
                            <img src={masha} alt="" />
                        </div>
                    </div>
                    <div>
                        <div className='up-about__container'>
                            <h2>Привет, я Мария</h2>
                            <div className='creator_info'>
                                <p>Я основатель интернет-магазина аксессуаров "Twilight". С давнего времени я испытывала интерес к аксессуарам, стилю и созданию различных образов как на мероприятия, так и на каждый день.
                                    Запуск "Twilight" был непростым, но благодаря поддержке семьи и друзей я преодолела все трудности. Сегодня наш магазин предлагает широкий ассортимент уникальных аксессуаров, созданных с любовью и вниманием к деталям.
                                    Каждый день я вдохновляюсь новыми идеями и стремлюсь сделать наш магазин еще лучше. Спасибо, что выбираете "Twilight"!</p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About