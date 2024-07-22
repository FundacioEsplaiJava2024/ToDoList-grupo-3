import React from 'react'
import './SignMain.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'


import SignIn from './SignIn'
import SignUp from './SignUp'

function SignMain() {
    return (
        <div className="sign">
            <div className="container">
                <Link className="navbar-brand" to={'/sign-in'}>
                    TodoList
                </Link>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to={'/sign-in'}>
                                Login
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={'/sign-up'}>
                                Sign up
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="auth-form-container">
                <div className="auth-form-inner">
                    <Routes>
                        <Route path="/sign-in" element={<SignIn />} />
                        <Route path="/sign-up" element={<SignUp />} />
                    </Routes>
                </div>
            </div>
        </div>

    )
}

export default SignMain
