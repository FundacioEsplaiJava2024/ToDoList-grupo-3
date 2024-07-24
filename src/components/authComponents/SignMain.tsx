import { Link, Route, Routes } from 'react-router-dom'
import './SignMain.css'


import SignIn from './SignIn'
import SignUp from './SignUp'

function SignMain() {
    return (
        <div className="auth-page">
            <div className="nav-bar">
                <Link className="navbar-title" to={'/'}>
                    TodoList
                </Link>
                <ul className="navbar-nav">
                    <li key="login" className="nav-item">
                        <Link className="nav-link" to={'/'}>
                            Sign In
                        </Link>
                    </li>
                    <li key="signup" className="nav-item">
                        <Link className="nav-link" to={'/sign-up'}>
                            Sign Up
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="auth-form-container">
                <div className="auth-form-inner">
                    <Routes>
                        <Route path="/*" element={<SignIn />} />
                        <Route path="/sign-up" element={<SignUp />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default SignMain