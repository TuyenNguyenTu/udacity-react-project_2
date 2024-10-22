import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Datas from "../Data";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as questionsAction from "../store/actions/questionsAction";
import * as userAction from "../store/actions/userAction";

const selectAuth = (state) => state.auth.user;
const selectQuesions = (state) => state.questions;
const selectUsers = (state) => state.users;

export default function QuestionItem() {
  let { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector(selectAuth);
  const questions = useSelector(selectQuesions);
  const users = useSelector(selectUsers);

  const [question, setQuestion] = useState();
  useEffect(() => {
    setQuestion(questions[id]);
  }, []);

  const getSelectedVote = () => {
    if (question.optionOne.votes.includes(auth.id)) {
      return question.optionOne.text;
    } else if (question.optionTwo.votes.includes(auth.id)) {
      return question.optionTwo.text;
    }
    else{
      return null;
    }    
  };

  const savedAnswer = (answ) => {
    Datas._saveQuestionAnswer({
      authedUser: auth.id,
      qid: question.id,
      ans: answ,
    })
    .then((res) => {
      if (res) {
        const newQuestions = {
          ...questions,
          [question.id]: {
            ...question,
            [answ]: {
              ...questions[question.id][answ],
              votes: questions[question.id][answ].votes.concat([auth.id]),
            },
          },
        };
         
        dispatch(questionsAction.setupQuestions(newQuestions));
        const newusers = {
          ...users,
          [auth.id]: {
            ...users[auth.id],
            answers: { ...users[auth.id].answers, [question.id]: answ },
          },
        };
        dispatch(userAction.setUsers(newusers));
        navigate("/home");
      }
      navigate("/home");
    })
      
  };

  return (
    <>
      {question && Object.keys(question).length > 0 ? (
        <div>
          <div className="px-4 py-5 my-5 text-center">
            <h2 className="display-5 fw-bold text-body-emphasis">
              Poll by {auth.name}{" "}
            </h2>
            <img
              className="d-block mx-auto mb-4 rounded-circle"
              src={auth.avatarURL}
              alt={auth.name}
              width="128"
              height="128"
            />
            <div className="col-12 mx-auto">
              <p className="lead mb-4"><h2>Would you Rather</h2></p>
              {!getSelectedVote() ? (
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-3">
                  <div className="w-50 card rounded-3 shadow-sm">
                    <div className="py-3 text-center">
                      <span className="my-0">
                      {question?.optionOne.text}
                      </span>
                    </div>
                    <div className="text-center">    
                      <button
                        type="button"
                        className="btn w-100 btn-info btn-lg px-4 gap-3"
                        onClick={() => {
                          savedAnswer("optionOne");
                        }}
                      >
                        Click
                      </button>  
                    </div>
                  </div>
                  <div className="w-50 card rounded-3 shadow-sm">
                    <div className="py-3 text-center">
                      <span className="my-0">
                      {question?.optionTwo.text}
                      </span>
                    </div>
                    <div className="text-center">    
                      <button
                        type="button"
                        className="btn w-100 btn-info btn-lg px-4 gap-3"
                        onClick={() => {
                          savedAnswer("optionTwo");
                        }}
                      >
                        Click
                      </button>  
                    </div>
                  </div>
                </div>
              ) : (
                <div className="answered-question">
                  <span>You have already answered this question.</span>
                  <button disabled>{getSelectedVote()}</button>
                  <button className="btn btn-link mt-2" onClick={() => navigate(-1)}> Go back </button>
                  <hr />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex align-items-center justify-content-center vh-100">
          <div className="text-center">
            <h1 className="display-1 fw-bold">404</h1>
            <p className="fs-3">
              <span className="text-danger">Opps!</span> Question not found.
            </p>
            <Link to={"/Home"} className="btn btn-link">
              Go Home
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
