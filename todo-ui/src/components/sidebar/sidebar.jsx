import { useState,useEffect } from 'react';
import profile from '../../assets/profile-circle-svgrepo-com.svg';
import { Link, useLocation } from 'react-router-dom';
import './sidebar.css';
import { useLogout } from '../../hooks/useLogout';
import {useAuthContext} from '../../hooks/useAuthContext'

const Sidebar = () => {
    const [activeLink, setActiveLink] = useState('/');
    const location = useLocation();
    const {logout}=useLogout();
    const {user}=useAuthContext();

    useEffect(() => {
        setActiveLink(location.pathname);
    }, [location]);

    const handleLogout=()=>{        
        logout();
    }

    return (
        <div className="sidebar">
            <div className='user-info'>
                <img src={profile} alt="user image" width={60} height={60} />
                <div className='user-name'>
                    <span className='welcome-msg'>Welcome</span>
                <h1 className='name'>{user?user.email:'username'}</h1>
                </div>
            </div>
            <div className='task-categories'>
                <Link to="/" className={`task-link ${activeLink === '/' ? 'active' : ''}`} onClick={() => setActiveLink('/')}>
                    <h3>All Tasks</h3>
                </Link>
                <Link to="/tasks/completed" className={`task-link ${activeLink === '/completed' ? 'active' : ''}`} onClick={() => setActiveLink('/completed')}>
                    <h3>Completed Tasks</h3>
                </Link>
                <Link to="/tasks/Incomplete" className={`task-link ${activeLink === '/Incomplete' ? 'active' : ''}`} onClick={() => setActiveLink('/Incomplete')}>
                    <h3>Incomplete Tasks</h3>
                </Link>
                <Link to="/tasks/Important" className={`task-link ${activeLink === '/Important' ? 'active' : ''}`} onClick={() => setActiveLink('/Important')}>
                    <h3>Important Tasks</h3>
                </Link>
            </div>
            <Link to="/login"><button type="button" onClick={handleLogout}>Logout</button></Link>
        </div>
    );
}

export default Sidebar;
