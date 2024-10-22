import React, { useEffect, useState } from "react";
import QuestionCardItem from "../components/QuestionCardItem";
import { useSelector } from "react-redux";
import { Tabs } from "react-bootstrap";
import { Tab } from "bootstrap";

const authUser = (state) => state.auth?.user;
const selectQuesions = (state) => state.questions;

export default function HomePage(props) {
  const [upcoming, setUpcoming] = useState();
  const [completed, setcompleted] = useState();
  const auth = useSelector(authUser);
  const questions = useSelector(selectQuesions);

  useEffect(() => {
    let completedlst = [],
      upcomingLst = [];
    Object.keys(questions).forEach((item) => {
      if (
        questions[item].optionOne.votes.includes(auth.id) ||
        questions[item].optionTwo.votes.includes(auth.id)
      ) {
        completedlst.push(questions[item]);
      } else {
        upcomingLst.push(questions[item]);
      }
    });
    setcompleted(completedlst.sort((a, b) => b.timestamp - a.timestamp));
    setUpcoming(upcomingLst.sort((a, b) => b.timestamp - a.timestamp));
  }, []);

  return (
    <Tabs
      defaultActiveKey="upcoming"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="upcoming" title="Questions">
        <div className="upcoming">
          <h3>Questions</h3>
          <div className="upcoming row">
            {upcoming &&
              upcoming.map((question) => (
                <div key={question.id} className="col-3">
                  <QuestionCardItem {...question} />
                </div>
              ))}
          </div>
          {}
        </div>
      </Tab>
      <Tab eventKey="completed" title="Questions Completed">
        <div className="completed">
          <h3>Questions Completed</h3>
          <div className="completed  row">
            {completed &&
              completed.map((question) => (
                <div key={question.id} className="col-3">
                  <QuestionCardItem {...question} />
                </div>
              ))}
          </div>
        </div>
      </Tab>
    </Tabs>
  );
}
