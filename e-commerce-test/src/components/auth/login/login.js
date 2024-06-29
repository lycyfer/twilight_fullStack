import { useNavigate, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import apiRequest from "../../../lib/apiRequest";
import "./login.css";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { updateUser } = useContext(AuthContext);
    console.log(updateUser);
    const navigate = useNavigate();
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    console.log(screenWidth);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        const formData = new FormData(e.target);

        const email = formData.get("email");
        const password = formData.get("password");

        try {
            const res = await apiRequest.post("/login", {
                email,
                password,
            });
            console.log(res);
            updateUser(res.data);
            navigate("/");
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError("Неправильный пароль или логин");
            } else {
                console.log(error);
                setError(error.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-form">
            <div className="form-container">
                <div className="form-wrapper">
                    <span className="logo-form">Twilight Store</span>
                    <span className="title">Авторизоваться</span>
                    <form onSubmit={handleSubmit} className="form-login">
                        <div className="input-group">
                            <input
                                className="input"
                                required
                                type="text"
                                name="email"
                            // placeholder="почта"
                            />
                            <label className="test-label">Почта</label>
                        </div>
                        <div className="input-group">
                            <input
                                className="input"
                                required
                                type={showPassword ? "text" : "password"}
                                name="password"
                            // placeholder="пароль"
                            />
                            <label className="test-label">Пароль</label>
                            <button
                                type="button"
                                className="visibility-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <svg
                                        width="30px"
                                        height="30px"
                                        className={`svg-icon ${showPassword ? "svg-icon-hidden" : ""
                                            }`}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z"
                                            stroke="#000"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                        <path
                                            d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z"
                                            stroke="#000"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        width="30px"
                                        height="30px"
                                        className={`svg-icon ${showPassword ? "" : "svg-icon-hidden"
                                            }`}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M2.99902 3L20.999 21M9.8433 9.91364C9.32066 10.4536 8.99902 11.1892 8.99902 12C8.99902 13.6569 10.3422 15 11.999 15C12.8215 15 13.5667 14.669 14.1086 14.133M6.49902 6.64715C4.59972 7.90034 3.15305 9.78394 2.45703 12C3.73128 16.0571 7.52159 19 11.9992 19C13.9881 19 15.8414 18.4194 17.3988 17.4184M10.999 5.04939C11.328 5.01673 11.6617 5 11.9992 5C16.4769 5 20.2672 7.94291 21.5414 12C21.2607 12.894 20.8577 13.7338 20.3522 14.5"
                                            stroke="#000"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                        <button className="sign-in" disabled={isLoading}>
                            Войти
                        </button>
                        {error && <span className="span_err">{error}</span>}
                    </form>
                    <p className="form-reg">
                        У вас нет учетной записи для{" "}
                        <Link to="/register" className="reg">
                            Регистрации
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
