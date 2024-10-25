import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import { fetchUsers } from "../features/user/userSlice";
import { setAuthedUser } from "../features/auth/authSlice";
import { fetchQuestions } from "../features/question/questionSlice";
function MainLayout() {
    const navigate = useNavigate();
    const authedUser = useSelector(state => state.auth.authedUser);
    const dispatch = useDispatch();
    const location = useLocation();
    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(setAuthedUser(null));
    }
    useEffect(() => {
        if(!authedUser) {
            navigate(`/login?redirect=${location.pathname}`);
        }
        async function fetchData() {
            await dispatch(fetchUsers());
            await dispatch(fetchQuestions());
        }
        fetchData();
    },[navigate, authedUser, dispatch, location.pathname]);
    
    if(!authedUser) return null;
    return (
        <div>
             <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className={({isActive}) => (isActive ? 'nav-link active': 'nav-link')} to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={({isActive}) => (isActive ? 'nav-link active': 'nav-link')}  to="/leaderboard">Leaderboard</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={({isActive}) => (isActive ? 'nav-link active': 'nav-link')}  to="/add">New</NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-nav navbar-right">
                        <li className="nav-item">
                            <span className="nav-link" >
                                <img height={30} width={30} className="bg-info rounded-circle me-3" src={authedUser.avatarURL} alt={authedUser.name} />
                                <strong>{authedUser.name}</strong>
                            </span>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link btn btn-link" href="#" onClick={handleLogout}>Log out</button>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="container mt-3">
            <Outlet/>
            </div>
        </div>
    )
}

export default MainLayout;