import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import "./App.scss";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import LayoutPage from "./pages/LayoutPage";
import LoaderboardPage from "./pages/LoaderboardPage";
import NewQuestionItem from "./pages/NewQuestionItem";
import QuestionItem from "./pages/QuestionItems";
import * as Datas from "./Data";
import { useEffect } from "react";
import * as questionsAction from "./store/actions/questionsAction";
import * as userAction from "./store/actions/userAction";

const selectQuesions = (state) => state.questions;
const selectUsers = (state) => state.users;

const selectAuth = (state) => state.auth;


function RequireAuth() {
  let location = useLocation();
  const auth = useSelector(selectAuth);


  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return (
    <LayoutPage>
      <Outlet />
    </LayoutPage>
  );
}

function App() {
  const dispatch = useDispatch();
  const questionsState = useSelector(selectQuesions);
  const usersState = useSelector(selectUsers);

  useEffect(() => {
    getinitData();
  });
  const getinitData = async () => {

    if (!questionsState) {
      const questions = await Datas.getQuestions();
      if (questions) dispatch(questionsAction.setupQuestions(questions));
    }
    if (!usersState) {
      const users = await Datas.getUsers();
      if (users) dispatch(userAction.setUsers(users));
    }
  };

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LoginPage />} key="login1" />
        <Route element={<RequireAuth />} key="main">
          <Route exact path="/home" element={<HomePage />} key="home" />
          <Route exact path="/leaderboard" element={<LoaderboardPage />} key="leaderboard" />
          <Route exact path="/new" element={<NewQuestionItem />} key="new" />
          <Route exact path="/question/:id" element={<QuestionItem />} key="question" />
          <Route path="*" element={<NotFound />} key="notfound" />
        </Route>
        <Route path="/login" element={<LoginPage />} key="login" />
      </Routes>
    </div>
  );
}

export default App;
