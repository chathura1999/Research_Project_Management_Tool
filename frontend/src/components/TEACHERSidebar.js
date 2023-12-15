import "./Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import { Link } from "react-router-dom";

const TEACHERSidebar = ({ sidebarOpen, closeSidebar }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userCred } = userLogin;
  const logoutHandler = () => {
    console.log("hello");
    dispatch(logout());
  };
  return (
    <div className={sidebarOpen ? "sidebar_responsive" : ""} id="sidebar">
      <div className="sidebar__title">
        <div className="sidebar__img"></div>
        <i
          onClick={() => closeSidebar()}
          className="fa fa-times"
          id="sidebarIcon"
          aria-hidden="true"
        ></i>
      </div>

      <div className="sidebar__menu">
        <div className="sidebar__link active_menu_link">
          <i className="fa fa-home"></i>
          <Link className="linked" to="/">
            Dashboard
          </Link>
        </div>

        <h2>Teachers Section</h2>
        <div className="sidebar__link">
          <i className="far fa-sticky-note"></i>
          <Link className="linked" to="/admit_card">
            Submitted Proposals
          </Link>
        </div>
        <div className="sidebar__logout">
          <i className="fa fa-power-off"></i>
          <Link className="linked" onClick={logoutHandler} to="/login">
            Log out
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TEACHERSidebar;
