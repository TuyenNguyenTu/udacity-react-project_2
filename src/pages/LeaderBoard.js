import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
const LeaderBoard = (props) => {
    const users = useSelector(state => state.user.users);
    const [listUser, setListUser] = useState([])
    useEffect(() => {
        const lu = Object.keys(users).map(k => ({
            ...users[k], 
            ansNum: Object.keys(users[k].answers).length, 
            quesNum: users[k].questions.length}
        )
        ).sort((a,b) => (b.ansNum + b.quesNum) - (a.ansNum + a.quesNum));
        setListUser(lu);
    },[users])
    return (
      <div>
        <h1 className="mb-5 text-center">Leader Board</h1>
        <table className="table table-bordered table-striped mt-3">
          <thead>
            <tr>
              <th scope="col">Users</th>
              <th scope="col">Answered</th>
              <th scope="col">Created</th>
            </tr>
          </thead>
          <tbody>
            {listUser &&
              listUser.map((u) => (
                <tr key={u.id}>
                  <td><img src={u.avatarURL} alt={u.name} height={30} width={30} className="bg-info rounded-circle me-3" />{u.name}</td>
                  <td>{u.ansNum}</td>
                  <td>{u.quesNum}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
}
export default LeaderBoard;