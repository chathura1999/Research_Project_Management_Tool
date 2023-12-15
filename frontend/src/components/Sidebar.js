import "./Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import { Link } from "react-router-dom";
const Sidebar = ({ sidebarOpen, closeSidebar }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  // const userLogin = useSelector((state) => state.userLogin)

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
        {userCred.role == "STUDENT" && <h2>Students Section</h2>}
        {userCred.role == "STUDENT" && (
          <div className="sidebar__link">
            <i className="fa fa-male" aria-hidden="true"></i>
            <Link className="linked" to="/submit-proposal">
              Submit Proposal
            </Link>
          </div>
        )}
        {userCred.role == "STUDENT" && (
          <div className="sidebar__link">
            <i className="far fa-sticky-note"></i>
            <Link className="linked" to="/admit_card">
              Submitted Proposals
            </Link>
          </div>
        )}
        {/* <div className='sidebar__link'>
                    <i className='fas fa-info'></i>
                    <Link className='linked' to='/student_details'>
                        Student Details
                    </Link>
                </div>
                <div className='sidebar__link'>
                    <i className='fas fa-school'></i>
                    <Link className='linked' to='/student-attendance'>
                        Student Attendance
                    </Link>
                </div>
                <div className='sidebar__link'>
                    <i className='far fa-sticky-note'></i>
                    <Link className='linked' to='/admit_card'>
                        Admit Card
                    </Link>
                </div> */}
        {userCred.role == "TEACHER" && <h2>Teachers Section</h2>}
        {userCred.role == "TEACHER" && (
          <div className="sidebar__link">
            <i className="far fa-sticky-note"></i>
            <Link className="linked" to="/admit_card">
              Submitted Proposals
            </Link>
          </div>
        )}

        {/* <div className='sidebar__link'>
                    <i className='fa fa-male'></i>
                    <Link className='linked' to='/teacher_register'>
                        Teacher Registration
                    </Link>
                </div>
                <div className='sidebar__link'>
                    <i className='fa fa-coins'></i>
                    <Link className='linked' to='/teacher_salary'>
                        Teacher Salary
                    </Link>
                </div>
                <div className='sidebar__link'>
                    <i className='fas fa-info'></i>
                    <Link className='linked' to='/teacher_details'>
                        Teacher Details
                    </Link>
                </div>
                <div className='sidebar__link'>
                    <i className='fas fa-school'></i>
                    <Link className='linked' to='teacher_attendance'>
                        Teacher Attendance
                    </Link>
                </div> */}
        {userCred.role == "ADMIN" && <h2>Admin</h2>}
        {userCred.role == "ADMIN" && (
          <div className="sidebar__link">
            <i className="fa fa-male"></i>
            <Link className="linked" to="/teacher_register">
              Register New Teacher
            </Link>
          </div>
        )}
        {userCred.role == "ADMIN" && (
          <div className="sidebar__link">
            <i className="fa fa-male" aria-hidden="true"></i>
            <Link className="linked" to="/student-register">
              Register New Student
            </Link>
          </div>
        )}
        {userCred.role == "ADMIN" && (
          <div className="sidebar__link">
            <i className="far fa-sticky-note"></i>
            <Link className="linked" to="/teachers">
              Manage Registered Teachers
            </Link>
          </div>
        )}
        {userCred.role == "ADMIN" && (
          <div className="sidebar__link">
            <i className="far fa-sticky-note"></i>
            <Link className="linked" to="/students">
              Manage Registered Students
            </Link>
          </div>
        )}

        {/* <div className='sidebar__link'>
                    <i className='fa fa-coins'></i>
                    <Link className='linked' to='/non-teaching_staff_register'>
                        Registration
                    </Link>
                </div>
                <div className='sidebar__link'>
                    <i className='fa fa-coins'></i>
                    <Link className='linked' to='non-teaching_staff_salary'>
                        Salary
                    </Link>
                </div>
                <div className='sidebar__link'>
                    <i className='fas fa-info'></i>
                    <Link className='linked' to='/non-teaching_staff_details'>
                        Details
                    </Link>
                </div>
                <div className='sidebar__link'>
                    <i className='fas fa-school'></i>
                    <Link className='linked' to='/non-teaching_staff_attendance'>
                        Attendance
                    </Link>
                </div>
                <div className='sidebar__logout'>
                    <i className='fa fa-power-off'></i>
                    <Link className='linked' onClick={logoutHandler} to='/login'>
                        Log out
                    </Link>
                </div> */}
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

export default Sidebar;
