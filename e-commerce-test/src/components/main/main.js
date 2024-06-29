import './main.css'
import Home from '../home/home'
import { useState } from 'react'
import footerGirl from './fonstola.ru_124079.jpg'


const Main = (props) => {

    const [activeIndex, setActiveIndex] = useState(0);

    const handleCardClick = (index) => {
        setActiveIndex(index);
    };

    return (
        <div>
            <Home />
            <div className="main-container">
                <div className="collections">
                    <div className="collection">
                        <h2>Все женские украшения</h2>
                        <div className="collection-content">
                            <p>От изысканных колье до великолепных серег, у нас есть все, что нужно, чтобы выглядеть великолепно в любой ситуации.</p>
                        </div>
                    </div>
                </div>
                <div className='test-container'>
                    <div className="cards">
                        <div
                            className={`card ${activeIndex === 0 ? 'active' : ''}`}
                            style={{ '--bg': 'url(https://o-tendencii.com/uploads/posts/2022-02/1644900035_16-o-tendencii-com-p-obraz-koltso-na-ruke-devushki-foto-19.jpg)' }}
                            onClick={() => handleCardClick(0)}
                        >
                            <div className="shadow"></div>
                            <div className="label">
                                <div className="info">
                                    <div className="title">Кольцо</div>
                                    {/* <div>Twilight Ring</div> */}
                                </div>
                            </div>
                        </div>
                        <div
                            className={`card ${activeIndex === 1 ? 'active' : ''}`}
                            style={{ '--bg': 'url(https://complicationwatches.eu/wp-content/uploads/2018/07/Panthere-De-Cartier-W2PN0007-1.jpg)' }}
                            onClick={() => handleCardClick(1)}
                        >
                            <div className="shadow"></div>
                            <div className="label">

                                <div className="info">
                                    <div className="title">Часы</div>
                                    {/* <div>Twilight Часы</div> */}
                                </div>
                            </div>
                        </div>
                        <div
                            className={`card ${activeIndex === 2 ? 'active' : ''}`}
                            style={{ '--bg': 'url(https://i0.wp.com/evotattoo.ru/wp-content/uploads/2021/11/interesnye-fakty-o-pirsinge-dlya-vseh.jpg?fit=1508%2C848&amp;ssl=1)' }}
                            onClick={() => handleCardClick(2)}
                        >
                            <div className="shadow"></div>
                            <div className="label">

                                <div className="info">
                                    <div className="title">Пирсинг</div>
                                    {/* <div>Twilight Пирсинг</div> */}
                                </div>
                            </div>
                        </div>
                        <div
                            className={`card ${activeIndex === 3 ? 'active' : ''}`}
                            style={{ '--bg': 'url(https://mykaleidoscope.ru/x/uploads/posts/2022-10/1666105290_30-mykaleidoscope-ru-p-modnie-zolotie-serezhki-zhenskie-oboi-32.jpg)' }}
                            onClick={() => handleCardClick(3)}
                        >
                            <div className="shadow"></div>
                            <div className="label">

                                <div className="info">
                                    <div className="title">Серьги</div>
                                    {/* <div>Twilight Серьги</div> */}
                                </div>
                            </div>
                        </div>
                        <div
                            className={`card ${activeIndex === 4 ? 'active' : ''}`}
                            style={{ '--bg': 'url(https://mykaleidoscope.ru/x/uploads/posts/2022-10/1666275398_19-mykaleidoscope-ru-p-kulon-na-tsepochke-zoloto-zhenskie-oboi-22.jpg)' }}
                            onClick={() => handleCardClick(4)}
                        >
                            <div className="shadow"></div>
                            <div className="label">

                                <div className="info">
                                    <div className="title">Цепочки</div>
                                    {/* <div>Twilight Цепь</div> */}
                                </div>
                            </div>
                        </div>
                        <div
                            className={`card ${activeIndex === 5 ? 'active' : ''}`}
                            style={{ '--bg': 'url(https://for-male.ru/wp-content/uploads/2020/11/kak-vybrat-zaponki-k-rubashke-2.jpg)' }}
                            onClick={() => handleCardClick(5)}
                        >
                            <div className="shadow"></div>
                            <div className="label">

                                <div className="info">
                                    <div className="title">Запонки</div>
                                    {/* <div>Twilight Запонки</div> */}
                                </div>
                            </div>
                        </div>
                        <div
                            className={`card ${activeIndex === 6 ? 'active' : ''}`}
                            style={{ '--bg': 'url(https://aura.planeta-mall.ru/i/61/35/3/61353/file.jpg)' }}
                            onClick={() => handleCardClick(6)}
                        >
                            <div className="shadow"></div>
                            <div className="label">
                                <div className="info">
                                    <div className="title">Браслет</div>
                                    {/* <div>Twilight Браслет</div> */}
                                </div>
                            </div>
                        </div>
                        <div
                            className={`card ${activeIndex === 7 ? 'active' : ''}`}
                            style={{ '--bg': 'url(https://cdn.shopify.com/s/files/1/0121/9674/1182/articles/perles-de-tahiti_1920x.jpg?v=1596607004)' }}
                            onClick={() => handleCardClick(7)}
                        >
                            <div className="shadow"></div>
                            <div className="label">
                                <div className="info">
                                    <div className="title">Ожерелье</div>
                                    {/* <div>Twilight Ожерелье</div> */}
                                </div>
                            </div>
                        </div>
                        <div
                            className={`card ${activeIndex === 8 ? 'active' : ''}`}
                            style={{ '--bg': 'url(https://luxuo-com-production.s3.ap-southeast-1.amazonaws.com/2014/02/Cuff-wearable-technology.jpg)' }}
                            onClick={() => handleCardClick(8)}
                        >
                            <div className="shadow"></div>
                            <div className="label">
                                <div className="info">
                                    <div className="title">Крестик</div>
                                    {/* <div>Twilight Пересекать</div> */}
                                </div>
                            </div>
                        </div>
                        <div
                            className={`card ${activeIndex === 9 ? 'active' : ''}`}
                            style={{ '--bg': 'url(https://img3.goodfon.ru/original/1920x1080/b/84/barbara-rocco-klyuch-devushka.jpg)' }}
                            onClick={() => handleCardClick(9)}
                        >
                            <div className="shadow"></div>
                            <div className="label">
                                <div className="info">
                                    <div className="title">Кулон</div>
                                    {/* <div>Twilight Кулон</div> */}
                                </div>
                            </div>
                        </div>
                        <div
                            className={`card ${activeIndex === 10 ? 'active' : ''}`}
                            style={{ '--bg': 'url(https://cs6.livemaster.ru/storage/d3/e8/175eea2a8e59d52f7b66a68f9c2l.jpg)' }}
                            onClick={() => handleCardClick(10)}
                        >
                            <div className="shadow"></div>
                            <div className="label">
                                <div className="info">
                                    <div className="title">Брошь</div>
                                    {/* <div>Twilight Брошь</div> */}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='flexBlock'>
                    <div className="collection-2">
                        <h2>По-настоящему роскошные украшения для самых красивых женщин</h2>
                        <div className="collection-content">
                            <p>Наши украшения — это истинное проявление роскоши и элегантности, которые подчеркнут вашу неповторимую красоту и стиль.</p>
                        </div>
                    </div>
                </div>
                <div className='abstraction_baner'>
                    <img className='abstraction' src={footerGirl} alt="" />
                </div>
                <div className='advantages'>
                    <h2 className='advantages_title'>Почему выбирают нас</h2>
                    <div className='advantages_list'>
                        <div className='advantages_list-item'>
                            <h3>Качество</h3>
                            <p>Мы стремимся к безупречному качеству во всем, что мы делаем. Все наши изделия изготавливаются из высококачественных материалов и проходят тщательный контроль качества.</p>
                        </div>
                        <div className='advantages_list-item'>
                            <h3>Стиль</h3>
                            <p>Наша команда дизайнеров следит за последними модными тенденциями, чтобы предложить вам украшения, которые соответствуют самым актуальным трендам.</p>
                        </div>
                        <div className='advantages_list-item'>
                            <h3>Уникальность</h3>
                            <p>Мы верим в индивидуальность и предлагаем украшения, которые помогут вам выделиться из толпы и подчеркнуть вашу уникальность.</p>
                        </div>
                        <div className='advantages_list-item'>
                            <h3>Клиентоориентированный сервис</h3>
                            <p>Мы ценим каждого нашего клиента и стремимся обеспечить высокий уровень сервиса. Наша дружелюбная команда всегда готова помочь вам с выбором и ответить на все ваши вопросы.</p>
                        </div>
                        <div className='advantages_list-item'>
                            <h3>Индивидуальный подход</h3>
                            <p>Мы учитываем индивидуальные потребности каждого клиента, предлагая персонализированные решения и уникальные дизайны, созданные специально для них.</p>
                        </div>
                        <div className='advantages_list-item'>
                            <h3>Экологическая ответственность</h3>
                            <p>Мы заботимся о окружающей среде и используем экологически чистые материалы и производственные процессы, чтобы минимизировать наш экологический след.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Main