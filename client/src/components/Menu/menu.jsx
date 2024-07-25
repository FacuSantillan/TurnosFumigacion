import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaClock, FaSignOutAlt } from 'react-icons/fa';
import { GrServices } from "react-icons/gr";
import './style.css';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const clearLocalStorage = () => {
    localStorage.clear();
    window.location.reload();
  };

  const overlayClickHandler = () => {
    setIsOpen(false);
  };

  return (
    <div>
      {/* Overlay se muestra cuando la barra está expandida */}
      {isOpen && <div className="overlay" onClick={overlayClickHandler}></div>}

      <div className={isOpen ? 'sidebar active' : 'sidebar'}>
        <div className="toggle-button" onClick={toggleSidebar}>
          ☰
        </div>

        <div className="sidebar-content">
          <ul>
            <Link className='link' to={"/admin"}> 
              <li className={isOpen ? 'sidebar-item-active' : ''}>
                <div className="icon-container">
                  <FaCalendarAlt size="1.8em" />
                </div>
                <span className={isOpen ? 'sidebar-item-active' : ''}>Reservas</span>
              </li>
            </Link>

            <Link className='link' to={"/admin/diasyhoras"}> 
              <li className={isOpen ? 'sidebar-item-active' : ''}>
                <div className="icon-container">
                  <FaClock size="1.8em" />
                </div>
                <span className={isOpen ? 'sidebar-item-active' : ''}>Horarios</span>
              </li>
            </Link>

            <Link className='link' to={"/admin/servicios"}> 
              <li className={isOpen ? 'sidebar-item-active' : ''}>
                <div className="icon-container">
                  <GrServices size="1.8em" />
                </div>
                <span className={isOpen ? 'sidebar-item-active' : ''}>Servicios</span>
              </li>
            </Link>
          </ul>
        </div>

        <div>
          <button onClick={clearLocalStorage} className='button-Logout'><FaSignOutAlt size="1.8em" /></button>
        </div>
      </div>

      <div className="images-container" onClick={toggleSidebar}></div>
    </div>
  );
}
