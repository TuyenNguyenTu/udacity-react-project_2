import { NavLink } from "react-router-dom";
const NotFound = (props) => {
    return(<div className="alert alert-warning m-3 p-4">
        Opps! Something went wrong. Back to <NavLink to="/">Home Page</NavLink> here.
    </div>)
}
export default NotFound;