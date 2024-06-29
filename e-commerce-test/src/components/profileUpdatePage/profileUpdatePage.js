import { useContext, useState } from "react";
import "./profileUpdatePage.css";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import MainScreen from "../screens";

function ProfileUpdatePage() {
    const { currentUser, updateUser } = useContext(AuthContext);
    const [error, setError] = useState("");
    const [avatar, setAvatar] = useState([])

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const { username, password, email } = Object.fromEntries(formData);

        try {
            const res = await apiRequest.put(`/users/${currentUser.id}`, {
                username,
                email,
                password,
                avatar: avatar[0]
            });
            updateUser(res.data);
            navigate("/profile");
        } catch (error) {
            console.log(error);
            setError(error.response.data.message);
        }
    };
    const [currentScreen, setCurrentScreen] = useState('profile');

    const handleScreenChange = (screen) => {
        setCurrentScreen(screen);
    };

    return (
        <div className="profileUpdatePage">
            <div className="formContainer">

                {/* <div className="form-wrapper-update">
                    <span className="logo-form">Twilight</span>
                    <span className="title">Обновить профиль</span>
                    <form onSubmit={handleSubmit} className="form-login">
                        <label htmlFor="username">Имя пользователя</label>
                        <input
                            id="username"
                            name="username"
                            className="input-update"
                            type="text"
                            defaultValue={currentUser.username}
                        />
                        <label htmlFor="email">Электронная почта</label>
                        <input
                            className="input-update"
                            id="email"
                            name="email"
                            type="email"
                            defaultValue={currentUser.email}
                        /><label htmlFor="password">Телефон</label>
                        <input
                            className="input-update"
                            required
                            type="number"
                            name="telefon"
                            placeholder="телефон"
                        />
                        <label htmlFor="password">Пароль</label>
                        <input
                            className="input-update"
                            required
                            type="password"
                            name="password"
                            placeholder="пароль"
                        />
                        <button className="update" >
                            Обновить
                        </button>
                        
                    </form>
                </div> */}
                <div className="content-container">
                    {currentScreen === 'profile' && <div className="form-wrapper-update">
                        <span className="logo-form">Twilight</span>
                        <span className="title">Обновить профиль</span>
                        <form onSubmit={handleSubmit} className="form-login">
                            <label htmlFor="username">Имя пользователя</label>
                            <input
                                id="username"
                                name="username"
                                className="input-update"
                                type="text"
                                defaultValue={currentUser.username}
                            />
                            <label htmlFor="email">Электронная почта</label>
                            <input
                                className="input-update"
                                id="email"
                                name="email"
                                type="email"
                                defaultValue={currentUser.email}
                            /><label htmlFor="password">Телефон</label>
                            <input
                                className="input-update"
                                type="number"
                                name="telefon"
                                placeholder="телефон"
                            />
                            <label htmlFor="password">Пароль</label>
                            <input
                                className="input-update"
                                required
                                type="password"
                                name="password"
                                placeholder="пароль"
                            />
                            <button className="update" >
                                Обновить
                            </button>
                            {/* {error && <span className="span_err">{error}</span>} */}
                        </form>
                    </div>}
                    {/* {currentScreen === 'creditCard' && <MainScreen />} */}
                </div>
            </div>
            <div className="sideContainer">
                {/* <img
                    src={avatar[0] || currentUser.avatar || "./noavatar.png"}
                    alt=""
                    className="avatar-update"
                />
                <CloudinaryUploadWidget
                    uwConfig={{
                        cloudName: "dek0ik1u3",
                        uploadPreset: "twilight-app",
                        multiple: false,
                        maxImageFileSize: 2000000,
                        folder: "avatars",
                    }}
                    setState={
                        setAvatar
                    }
                /> */}
                <MainScreen />
            </div>
        </div>
    );
}

export default ProfileUpdatePage;
