import React from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../store/actions/authenticationAction'
import { useDispatch, useSelector } from 'react-redux'

const selectAuth = state => state.auth

export default function Layout({ children }) {
    const dispatch = useDispatch()
    const auth = useSelector(selectAuth);
    const signout = () => {
        dispatch(logout())
    }

    return (
        <div className="container">
            <header className="p-3 mb-3 border-bottom">
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <ul className="nav col-12 col-lg-auto me-lg-auto justify-content-center">
                            <li><Link to="/home" className="nav-link">Home page</Link></li>
                            <li><Link to="/leaderboard" className="nav-link">Leaderboard page</Link></li>
                            <li><Link to="/new" className="nav-link">New page</Link></li>
                        </ul>
                        <div className="d-flex">
                            <div>
                                <span className="d-block text-decoration-none" >
                                    <img src={auth.user.avatarURL} alt={auth.user.name} width="32" height="32" className="rounded-circle mr-md-3" />
                                    <b>{auth.user.name}</b>
                                </span>
                            </div>
                            <div>
                                <button className="nav-link link-body-emphasis px-2" onClick={signout}>Log out</button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </header>
            <div>{children}</div>
        </div>

    )
}
