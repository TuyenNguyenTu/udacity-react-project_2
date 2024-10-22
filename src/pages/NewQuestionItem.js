import React, { useState } from "react";
import * as Datas from "../Data";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as questionsAction from "../store/actions/questionsAction";
import * as userAction from "../store/actions/userAction";
const selectAuth = (state) => state.auth;
const selectQuesions = (state) => state.questions;
const selectUsers = (state) => state.users;

export default function NewQuestionItem() {
  const [optionOneText, setOptionOneText] = useState();
  const [optionTwoText, setOptionTwoText] = useState();
  const auth = useSelector(selectAuth);
  const questions = useSelector(selectQuesions);
  const users = useSelector(selectUsers);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    if (!optionOneText || !optionTwoText) {
      setMessage("please input optionText");
      return;
    }
    Datas._saveQuestion({
      optionOneText: optionOneText,
      optionTwoText: optionTwoText,
      author: auth.user.id,
    })
      .then((res) => {
        if (res) {
          const newQuestions = { ...questions, [res.id]: res };
          dispatch(questionsAction.setupQuestions(newQuestions));
          const newusers = {
            ...users,
            [res.author]: {
              ...users[res.author],
              questions: [...users[res.author].questions, res.id],
            },
          };
          dispatch(userAction.setUsers(newusers));
          navigate("/home");
        }
      })
      .catch((error) => {
        console.log(error);
        setMessage("can not save question");
      });
  };

  return (
    <div className="container">
      <div className="py-5 text-center">
        <h2>Would You Rather</h2>
        <p className="lead">Create Your Own Poll</p>
        <div className="row text-center w-100">
          <div className="col-12">
            <span className="">{message}</span>
          </div>
          <div className="col-12 row mb-3">
            <div className="col-2"><label className="form-label">First Option:</label></div>
            <div className="col-9">
              <input
              type="text"
              className="form-control"
              placeholder="Option One"
              data-testid="OptionOne"
              onChange={(event) => setOptionOneText(event.target.value)}
            />
            </div>
          </div>
          <div className="col-12 row mb-3">
            <div className="col-2"><label className="form-label">Second Option:</label></div>
            <div className="col-9">
              <input
                type="text"
                className="form-control"
                placeholder="Option Two"
                data-testid="OptionTwo"
                onChange={(event) => setOptionTwoText(event.target.value)}
              />
            </div>
          </div>
          <div className="col-12 text-center">
            <button
              className="btn btn-light"
              type="button"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>          
        </div>
      </div>
    </div>
  );
}
