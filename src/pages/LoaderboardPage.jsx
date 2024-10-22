import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const selectUsers = (state) => state.users;
export default function Loaderboard() {
  const [users, setUsers] = useState();
  const usersState = useSelector(selectUsers);

  useEffect(() => {
    if (usersState) {
      let arr = [];
      Object.keys(usersState).forEach((key) => {
        arr.push(usersState[key]);
      });
      setUsers(arr);
    }
  }, []);

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover">
        <thead className="thead-light">
          <tr>
            <th scope="col">Users</th>
            <th scope="col">Answered</th>
            <th scope="col">Created</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="d-flex flex-row">
                    <img
                      alt="avatar"
                      className="avatar rounded-circle"
                      src={`${user.avatarURL}`}
                    />
                    <span className="d-flex flex-column mx-2">
                      <span><b>{user.name}</b></span>
                      <span className="text-secondary">{user.id}</span>
                    </span>
                  </div>
                </td>
                <td>
                  <span>{Object.keys(user.answers).length}</span>
                </td>
                <td>
                  <span>{user.questions.length}</span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
