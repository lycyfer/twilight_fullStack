import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import apiRequest from '../../lib/apiRequest';
import noAvatar from "./img/no-avatar.png"

import "./logo.css"

const Logo = () => {
    const { updateUser, currentUser } = useContext(AuthContext)


    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await apiRequest.post("/logout")
            updateUser(null);
            navigate("/");
            localStorage.removeItem("user")
        } catch (err) {
            console.log(err);
        }
    }

    console.log(currentUser)



    const [isScrolled, setIsScrolled] = useState(false)
    var url = window.location.pathname
    const currentUrl = window.location.href;
    const [hasProductsInCart, setHasProductsInCart] = useState(false);
    const [hasProductsInLike, setHasProductsInLike] = useState(false);

    console.log(hasProductsInCart)
    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset > 0) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }

    })
    useEffect(() => {
        const checkCartProducts = async () => {
            try {
                const response = await apiRequest.get(`basket/test/${currentUser.id}`);
                console.log(response)
                setHasProductsInCart(response.data.items.length > 0);
            } catch (error) {
                console.error(error);
            }
        };

        if (currentUser) {
            checkCartProducts();
        }
    }, [currentUser]);
    useEffect(() => {
        const checkLikeProducts = async () => {
            try {
                const response = await apiRequest.get(`favorite/${currentUser.id}/saved-products`);
                console.log(response)
                setHasProductsInLike(response.data.length > 0);
            } catch (error) {
                console.error(error);
            }
        };

        if (currentUser) {
            checkLikeProducts();
        }
    }, [currentUser]);

    return (
        <div className={isScrolled ? 'navBar scroll' : 'navBar'}>
            <div className='test-navbar'>
                <div className='header-text-second'>
                    <span>
                        <b className='logo'>
                            <svg width="250" height="100" viewBox="0 0 1096 453" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_2041_1647)" filter="url(#filter0_dd_2041_1647)">
                                    <g filter="url(#filter1_d_2041_1647)">
                                        <path d="M788.693 116.203V116.155L699.582 24.8218L640.865 116.203H788.693Z" fill="black" />
                                        <path d="M433.273 153.216L508.03 433L582.786 153.216H433.273Z" fill="black" />
                                        <path d="M570.579 116.155L506.686 28.1421L444.846 116.155V116.203H570.579V116.155Z" fill="black" />
                                        <path d="M606.004 101.897L662.449 14.0547H542.283L606.004 101.897Z" fill="black" />
                                        <path d="M471.311 14.0547H353.635L409.836 101.506L471.311 14.0547Z" fill="black" />
                                        <path d="M227.365 116.155V116.203H375.217L316.501 24.8218L227.365 116.155Z" fill="black" />
                                        <path d="M224.436 153.216L468.528 428.606L394.943 153.216H224.436Z" fill="black" />
                                        <path d="M547.58 428.606L791.647 153.216H621.139L547.58 428.606Z" fill="black" />
                                    </g>
                                    <path d="M480.091 277V183.909H499.773V260.773H539.682V277H480.091Z" fill="white" />
                                    <path d="M376.376 179.182V281H354.849V179.182H376.376Z" fill="white" />
                                    <path d="M662.376 179.182V281H640.849V179.182H662.376Z" fill="white" />
                                    <path d="M4.97159 203.93V186.182H88.5938V203.93H57.4219V288H36.1435V203.93H4.97159Z" fill="black" />
                                    <path d="M125.768 288L96.6349 186.182H120.151L137.004 256.928H137.849L156.443 186.182H176.578L195.122 257.077H196.017L212.871 186.182H236.386L207.253 288H186.273L166.884 221.43H166.088L146.749 288H125.768Z" fill="black" />
                                    <path d="M840.364 219.094C839.668 216.674 838.69 214.536 837.43 212.68C836.171 210.791 834.63 209.2 832.807 207.908C831.017 206.582 828.962 205.571 826.642 204.875C824.355 204.179 821.82 203.831 819.036 203.831C813.832 203.831 809.258 205.124 805.314 207.709C801.403 210.294 798.354 214.056 796.166 218.994C793.979 223.9 792.885 229.899 792.885 236.991C792.885 244.084 793.962 250.116 796.116 255.088C798.271 260.06 801.32 263.855 805.264 266.473C809.208 269.058 813.865 270.351 819.234 270.351C824.107 270.351 828.266 269.489 831.713 267.766C835.193 266.009 837.845 263.54 839.668 260.358C841.524 257.176 842.452 253.414 842.452 249.072L846.827 249.719H820.577V233.511H863.183V246.338C863.183 255.287 861.294 262.976 857.516 269.406C853.737 275.803 848.534 280.741 841.905 284.222C835.276 287.669 827.686 289.392 819.135 289.392C809.589 289.392 801.204 287.287 793.979 283.078C786.753 278.836 781.119 272.82 777.075 265.031C773.065 257.209 771.06 247.929 771.06 237.19C771.06 228.937 772.253 221.58 774.639 215.116C777.059 208.62 780.439 203.118 784.781 198.611C789.123 194.103 794.178 190.673 799.945 188.32C805.712 185.966 811.959 184.79 818.688 184.79C824.455 184.79 829.824 185.635 834.795 187.325C839.767 188.982 844.175 191.336 848.02 194.385C851.898 197.434 855.063 201.063 857.516 205.273C859.968 209.449 861.543 214.056 862.239 219.094H840.364Z" fill="black" />
                                    <path d="M879.849 288V186.182H901.376V228.192H945.077V186.182H966.554V288H945.077V245.94H901.376V288H879.849Z" fill="black" />
                                    <path d="M980.972 203.93V186.182H1064.59V203.93H1033.42V288H1012.14V203.93H980.972Z" fill="black" />
                                </g>
                                <defs>
                                    <filter id="filter0_dd_2041_1647" x="-4" y="0" width="1104" height="461" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                        <feOffset dy="4" />
                                        <feGaussianBlur stdDeviation="2" />
                                        <feComposite in2="hardAlpha" operator="out" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2041_1647" />
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                        <feOffset dy="4" />
                                        <feGaussianBlur stdDeviation="2" />
                                        <feComposite in2="hardAlpha" operator="out" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                        <feBlend mode="normal" in2="effect1_dropShadow_2041_1647" result="effect2_dropShadow_2041_1647" />
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_2041_1647" result="shape" />
                                    </filter>
                                    <filter id="filter1_d_2041_1647" x="224.436" y="14.0547" width="576.212" height="427.945" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                        <feOffset dx="8" dy="8" />
                                        <feGaussianBlur stdDeviation="0.5" />
                                        <feComposite in2="hardAlpha" operator="out" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2041_1647" />
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2041_1647" result="shape" />
                                    </filter>
                                    <clipPath id="clip0_2041_1647">
                                        <rect width="1096" height="453" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </b>
                    </span>
                </div>
                <div className='logo-flex-box'>

                    <a href='/' className=' linkLogo'>Главная</a>
                    {currentUser ? (<a href='/product' className=' linkLogo'>Продукты</a>) : (<div></div>)}
                    <a href='/about' className=' linkLogo'>О нас</a>


                    {currentUser ? (
                        <div className='flex-blox-test'>
                            <>
                                <a href={`/basket/${currentUser.id}`} className='linkBasket '><svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19.5 9.5L18.7896 6.89465C18.5157 5.89005 18.3787 5.38775 18.0978 5.00946C17.818 4.63273 17.4378 4.34234 17.0008 4.17152C16.5619 4 16.0413 4 15 4M4.5 9.5L5.2104 6.89465C5.48432 5.89005 5.62128 5.38775 5.90221 5.00946C6.18199 4.63273 6.56216 4.34234 6.99922 4.17152C7.43808 4 7.95872 4 9 4" stroke="#fff" stroke-width="1.5" />
                                    <path d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4C15 4.55228 14.5523 5 14 5H10C9.44772 5 9 4.55228 9 4Z" stroke="#fff" stroke-width="1.5" />
                                    <path d="M8 13V17" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M16 13V17" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M12 13V17" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M3.864 16.4552C4.40967 18.6379 4.68251 19.7292 5.49629 20.3646C6.31008 21 7.435 21 9.68486 21H14.3155C16.5654 21 17.6903 21 18.5041 20.3646C19.3179 19.7292 19.5907 18.6379 20.1364 16.4552C20.9943 13.0234 21.4233 11.3075 20.5225 10.1538C19.6217 9 17.853 9 14.3155 9H9.68486C6.14745 9 4.37875 9 3.47791 10.1538C2.94912 10.831 2.87855 11.702 3.08398 13" stroke="#fff" stroke-width="1.5" stroke-linecap="round" />
                                </svg></a>
                            </>
                            <>
                                <a href={`/favorite/${currentUser.id}/saved-products`} className='likeBasket'><svg className='svgLike' width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg></a>
                            </>
                        </div>
                    ) : (<div />)}
                </div>
            </div>
            {currentUser ? (
                <div className='user-test-block'>
                    <div className="user">
                        <img
                            src={currentUser.avatar || noAvatar}
                            alt=""
                            className='user-img-test'
                        />
                        <span className='user-name'>{currentUser.username}</span>
                        <a href="/profile" className="profile">
                            <span>Профиль</span>

                        </a>
                        <div className='user-logout-test' onClick={handleLogout}>
                            <svg fill="#fff" height="25px" width="25px" version="1.1" id="Capa_1"
                                viewBox="0 0 471.2 471.2" >
                                <g>
                                    <g>
                                        <path d="M227.619,444.2h-122.9c-33.4,0-60.5-27.2-60.5-60.5V87.5c0-33.4,27.2-60.5,60.5-60.5h124.9c7.5,0,13.5-6,13.5-13.5
			s-6-13.5-13.5-13.5h-124.9c-48.3,0-87.5,39.3-87.5,87.5v296.2c0,48.3,39.3,87.5,87.5,87.5h122.9c7.5,0,13.5-6,13.5-13.5
			S235.019,444.2,227.619,444.2z"/>
                                        <path d="M450.019,226.1l-85.8-85.8c-5.3-5.3-13.8-5.3-19.1,0c-5.3,5.3-5.3,13.8,0,19.1l62.8,62.8h-273.9c-7.5,0-13.5,6-13.5,13.5
			s6,13.5,13.5,13.5h273.9l-62.8,62.8c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4l85.8-85.8
			C455.319,239.9,455.319,231.3,450.019,226.1z"/>
                                    </g>
                                </g>
                            </svg>
                        </div>
                        <div className='wallet-block'>
                            <div className='wallet'>
                                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.5008 14.1502H16.5098M19 4.00098H6.2C5.0799 4.00098 4.51984 4.00098 4.09202 4.21896C3.71569 4.41071 3.40973 4.71667 3.21799 5.093C3 5.52082 3 6.08087 3 7.20098V16.801C3 17.9211 3 18.4811 3.21799 18.909C3.40973 19.2853 3.71569 19.5912 4.09202 19.783C4.51984 20.001 5.07989 20.001 6.2 20.001H17.8C18.9201 20.001 19.4802 20.001 19.908 19.783C20.2843 19.5912 20.5903 19.2853 20.782 18.909C21 18.4811 21 17.9211 21 16.801V11.201C21 10.0809 21 9.52082 20.782 9.093C20.5903 8.71667 20.2843 8.41071 19.908 8.21896C19.4802 8.00098 18.9201 8.00098 17.8 8.00098H7M16.9508 14.1502C16.9508 14.3987 16.7493 14.6002 16.5008 14.6002C16.2523 14.6002 16.0508 14.3987 16.0508 14.1502C16.0508 13.9017 16.2523 13.7002 16.5008 13.7002C16.7493 13.7002 16.9508 13.9017 16.9508 14.1502Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <div className='balance'>
                                    Баланс: {currentUser.balance}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            ) : (
                <div className='authBlock'>
                    <a href="/login">Войти</a>
                    <a href="/register" className="register">
                        Регистрация
                    </a>
                </div>

            )
            }
        </div >

    )
}

export default Logo