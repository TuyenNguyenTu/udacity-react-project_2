import Question from "./Question";
const QuestionCategory = (props) => {
    const {title, questions} = props;
    return(<div className="mb-3">
        <h1 className="text-center mb-3">{title}</h1>
            <div className="row mb-3">
            {
                questions && questions.length 
                ? questions.map(q => (
                    <div className="col-md-4" key={q.id}>
                        <Question question={q} />
                    </div>
                ))
                : (<div className="col-md-12">
                    <div className="alert alert-info">Hum. There're nothing here</div>
                </div>)
            }
            </div>
    </div>)
}

export default QuestionCategory;