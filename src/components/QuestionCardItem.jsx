import React from 'react'
import { Link } from 'react-router-dom'

export default function QuestionCard({ id, author, timestamp }) {
  const formatDate = (timestamp) => {
    const d = new Date(timestamp)
    const time = d.toLocaleTimeString('en-US')
    return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
  }

  return (
    <div className="card mb-4 rounded-3 shadow-sm">
      <div className="card-header py-3 text-center font-weight-bold">
        <h4 className="my-0" data-testid="author" id="author">
          {author}
        </h4>
      </div>
      <div className="card-body text-center">
        <span className="card-title pricing-card-title mb-3 text-secondary">
          {formatDate(timestamp)}{" "}
        </span>
        <Link
          className="w-100 btn btn-lg btn-outline-success"
          to={`/question/${id}`}
        >
          Show
        </Link>
      </div>
    </div>
  );
}
