import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from '../pages/Home';
import LoginPage from '../pages/Login';
import MainLayout from '../layouts/MainLayout';
import QuestionDetail from '../pages/QuestionDetail';
import LeaderBoard from '../pages/LeaderBoard';
import NewQuestion from '../pages/NewQuestion';
import NotFound from '../pages/NotFound';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "",
          element: <HomePage/>
        },
        {
          path: "/add",
          element: <NewQuestion/>
        },
        {
          path: "/questions/:question_id",
          element: <QuestionDetail/>
        },
        {
          path: "/leaderboard",
          element: <LeaderBoard/>
        }
      ]
    },
    {
      path:"/login",
      element: <LoginPage/>
    },
    {
      path: "*",
      element: <NotFound/>
    }
  ])
  return (
    <div className="App">
      <RouterProvider router={router} ></RouterProvider>
    </div>
  );
}

export default App;
