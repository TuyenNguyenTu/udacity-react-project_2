import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuestionCategory from "../components/QuestionCategory";

const HomePage = () => {
    const [newQuestions, setNewQuestions] = useState([]);
    const [doneQuestions, setDoneQuestions] = useState([]);
    const authedId = useSelector(state => state.auth.authedId);
    // const authedUser = useSelector(state => state.auth.authedUser);
    const users = useSelector(state => state.user.users);
    const questions = useSelector(state => state.question.questions);
    const [isDefaultView, setIsDefaultView] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        if(questions) {
            let newQuestion = [];
            let doneQuestion = [];
            Object.keys(questions).forEach((key) => {
                let q = {...questions[key]};
                q.user = users[q.author];
                if (q.optionOne.votes.indexOf(authedId) < 0 && q.optionTwo.votes.indexOf(authedId) <0) {
                  newQuestion.push(q);
                } else {
                  doneQuestion.push(q);
                }
            })
            setNewQuestions(newQuestion.sort((a, b) => b.timestamp - a.timestamp));
            setDoneQuestions(doneQuestion.sort((a, b) => b.timestamp - a.timestamp));
        }

    }, [dispatch, authedId, users, questions])

    return (
      <div className="home">
        <div
          className="btn-group"
          role="group"
          aria-label="Basic radio toggle button group"
        >
          <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id="btnradio1"
            autoComplete="off"
            checked={isDefaultView}
            onChange={() => setIsDefaultView(true)}
          />
          <label className="btn btn-outline-primary" htmlFor="btnradio1">
            Questions
          </label>
          <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id="btnradio2"
            autoComplete="off"
            checked={!isDefaultView}
            onChange={() => setIsDefaultView(false)}
          />
          <label className="btn btn-outline-primary" htmlFor="btnradio2">
            Questions Completed
          </label>
        </div>
        {
            isDefaultView 
            ? (<QuestionCategory title="New Questions" questions={newQuestions} />)
            : (<QuestionCategory title= "Questions Completed" questions={doneQuestions} />)
        }
      </div>
    );
}
export default HomePage