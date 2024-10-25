import { useState } from "react";
import { saveQuestion } from "../features/question/questionSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { addUserQuestion } from "../features/user/userSlice";
const NewQuestion = (props) => {
    const authedId = useSelector(state => state.auth.authedId);
    const [optionOne, setOptionOne] = useState('');
    const [optionTwo, setOptionTwo] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSaveQuestion = async (e) => {
        e.preventDefault();
        setLoading(true);
        const question = {
            author: authedId,
            optionOneText: optionOne,
            optionTwoText: optionTwo
        };
        const rs = await dispatch(saveQuestion(question));
        dispatch(addUserQuestion({userId: authedId, qId: rs.payload.id}))
        navigate('/');
        setLoading(false);
    }
    return (
        <div>
        <div className="text-center">
            <h1>Would you rather</h1>
            <h4 className="mb-5">Create your own poll</h4>
        </div>
        <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8">
            <form className="card border rounded p-3" onSubmit={handleSaveQuestion}>
                <div className="mb-3">
                <label className="form-label">Option One</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Option One"
                    required
                    value={optionOne}
                    onChange={(e) => setOptionOne(e.target.value)}
                />
                </div>
                <div className="mb-3">
                <label className="form-label">Option Two</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Option Two"
                    required
                    value={optionTwo}
                    onChange={(e) => setOptionTwo(e.target.value)}
                />
                </div>
                <div className="text-center">
                <button type="submit" disabled={loading} className="btn btn-primary">
                    Submit
                </button>
                </div>
            </form>
            </div>
            <div className="col-md-8"></div>
        </div>
        </div>
    );
};

export default NewQuestion;
