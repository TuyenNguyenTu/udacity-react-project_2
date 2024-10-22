import React, { useEffect, useState } from 'react';
import * as Datas from '../Data';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthenUser } from '../store/actions/authenticationAction';
import { useLocation, useNavigate } from 'react-router-dom';
const selectAuth = state => state.auth
export default function Login() {
  const [user_name, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation(); 

  useEffect(() => {
    if (auth && auth.user) {
      navigate('/home')
    }
  }, [])


  const handleSubmit = (e) => {
    setErrorMessage('')
    if (!user_name) {
      setErrorMessage("username cannot empty");
      return
    }
    if (!password) {
      setErrorMessage("password cannot empty");
      return
    }
  
    Datas.login(user_name, password).then(res => {
      console.log(res.data);
      if (res && res.data) {
        dispatch(setAuthenUser(res.data));
        navigate(state?.from?.pathname ?? '/home')
      }
    }).catch(error => {
      setErrorMessage(error)
    })
  }
  return (
    <div className="form-signin w-100 m-auto">
      <form>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
        <small className="text-danger" data-testid="errorMessage">
          {errorMessage}
        </small>
        <div className="form-floating">
          <input
            className="form-control"
            data-testid="Username"
            type="text"
            placeholder="Username"
            onChange={(event) => setUsername(event.target.value)}
          />
          <label>Username</label>
        </div>
        <div className="form-floating ">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            data-testid="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <label>Password</label>
        </div>
        <button
          className="btn btn-primary w-100 py-2"
          type="button"
          data-testid="buttonSubmit"
          onClick={handleSubmit}
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
