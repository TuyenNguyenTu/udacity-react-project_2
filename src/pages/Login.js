import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { login } from "../features/auth/authSlice";
const LoginPage = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const authedUser = useSelector(state => state.auth.authedUser);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {search} = useLocation();
    const query = new URLSearchParams(search);
    const redirect = query.get('redirect') || '/';
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        const rs = await dispatch(login({id: username, password: password}));
        setLoading(false);
        if(!rs.payload) {
            alert('Login fail, please check login information again.');
            return;
        }
        navigate(redirect);
    }

    useEffect(() => {
        if(authedUser && !loading) {
            navigate(redirect);
        }
    }, [navigate, authedUser, loading, redirect])
    if(authedUser) return null;
    return(
        <div className="container pt-5">
            <div className="row">
                <div className="col-md-3">

                </div>
                <div className="col-md-6">
                    <div className="border-1">
                        <h2 className="text-center">Login</h2>
                        <form className="mt-5" onSubmit={handleLogin}>
                           <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input className="form-control" data-testid="username" placeholder="Enter Username" required value={username} onChange={(e) => setUsername(e.target.value)}/>
                           </div>
                           <div className="mb-4">
                            <label className="form-label">Password</label>
                            <input className="form-control" data-testid="password" placeholder="Enter Password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                           </div>
                           <div className="mb-3">
                            <div className="d-grid">
                                <button disabled={loading} className="btn btn-primary" type="submit">Login</button>
                            </div>
                           </div>
                        </form>
                    </div>
                </div>
                <div className="col-md-3">

                </div>
            </div>
        </div>
    )
}

export default LoginPage;