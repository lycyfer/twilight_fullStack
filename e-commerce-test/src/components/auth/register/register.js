import { useNavigate, Link } from 'react-router-dom'
import './register.css'
import { useState } from 'react'
import apiRequest from '../../../lib/apiRequest'

const Register = () => {

    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("")
        const formData = new FormData(e.target);

        const username = formData.get("username");
        const email = formData.get("email");
        const password = formData.get("password");

        try {
            const res = await apiRequest.post("/register", {
                username,
                email,
                password,
            });
            console.log(res)
            navigate("/login");
        } catch (error) {
            setError(error.response.data.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="form-container">
            <div className="form-wrapper">
                <span className="logo-form">Twilight Store</span>
                <span className="title">Регистрация</span>
                <form onSubmit={handleSubmit} className='form-login'>
                    <input className='input' name="username" required type="text" placeholder="Имя" />
                    <input className='input' name="email" required type="email" placeholder="почта" />
                    <input className='input' name="password" required type="password" placeholder="пароль" />
                    <button disabled={isLoading} className='sign-up'>Регистрация</button>
                    {error && <span className='span_err'>{error}</span>}
                </form>
                <p className='form-reg'>
                    У вас есть аккаунт <Link to='/login' className='reg'>Авторизоваться</Link>
                </p>
            </div>
        </div>
    )

}

export default Register
