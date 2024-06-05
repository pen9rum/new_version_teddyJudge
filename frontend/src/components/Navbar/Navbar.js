import React, { useContext } from 'react';
import './Navbar.css';
import { Nav } from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { RoleContext } from '../Auth/RoleContext';

const Navbar = () => {
    let navigate = useNavigate();
    const location = useLocation();
    const { role } = useContext(RoleContext);

    const isActive = (path) => {
        return location.pathname.startsWith(path) ? 'selected' : '';
    };

    const logout = () => {
        // This is where you clear the user's login status.
        // You might clear a token in local storage, or clear your app's user state.
        // The specific code depends on how you've implemented user login in your app.

        // After logging out, you might want to redirect the user to the login page.
        navigate('/');
    };


    // 依照 role 給定不同的路由前綴
    const prefix = role === 'teacher' ? '/t' : '/';

    return (
        <Nav className="justify-content-center">
            <Nav.Item className={isActive(prefix + 'dashboard')}>
                <NavLink
                    to={prefix + "dashboard"}
                    className="nav-link"
                >
                    Home
                </NavLink>
            </Nav.Item>
            <Nav.Item className={isActive(prefix + 'homework')}>
                <NavLink
                    to={prefix + "homework"}
                    className="nav-link"
                >
                    HW
                </NavLink>
            </Nav.Item>
            <Nav.Item className={isActive(prefix + 'contest')}>
                <NavLink
                    to={prefix + "contest"}
                    className="nav-link"
                >
                    Contest
                </NavLink>
            </Nav.Item>
            <Nav.Item className={isActive(prefix + 'course')}>
                <NavLink
                    to={prefix + "course"}
                    className="nav-link"
                >
                    Course
                </NavLink>
            </Nav.Item>
            <Nav.Item className={isActive(prefix + 'setting')}>
                <NavLink
                    to={prefix + "setting"}
                    className="nav-link"
                >
                    Setting
                </NavLink>
            </Nav.Item>

            {
                role === 'teacher' ?
                    (<Nav.Item className={isActive(prefix + 'style-checker')}>
                        <NavLink
                            to={prefix + "style-checker"}
                            className="nav-link"
                        >
                            Style-Checker
                        </NavLink>
                    </Nav.Item>) : null

            }

            <Nav.Item className={isActive(prefix + 'logout')}>
                <button onClick={logout} className="nav-link">Logout</button>
            </Nav.Item>



        </Nav>
    );
};

export default Navbar;
