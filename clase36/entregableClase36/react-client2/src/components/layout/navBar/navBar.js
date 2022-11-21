import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './navBar.css';
import logo from '../../../recursos/logo-color-negro.png';
import bajada from '../../../recursos/bajada-blanco.png';
import {LogoutButton} from '../../logoutButton/logoutButton.jsx'

function NavBar() {

    const handleLogout = () => {
        console.log("handle logout")
    }



    return (
        <div className='navBar'>
            <Link className='link' exact to='/'>
                <img src={logo} height='50px' width='50px' alt='logo'/>
                <img src={bajada} height='40px' alt='bajada'/>
            </Link>
            <ul>
                <li>
                    <NavLink activeClassName='link-active' className='link' exact to='/'>Productos</NavLink>
                </li>
                <li>
                    <NavLink activeClassName='link-active' className='link' exact to='/carrito' >Carrito</NavLink>
                </li>                
                <li>
                    <NavLink activeClassName='link-active' className='link' to='/profile'>Mi perfil</NavLink>
                </li>
                <li>
                    <LogoutButton/>
                </li>
            </ul>

        </div>


    );
}

export { NavBar }