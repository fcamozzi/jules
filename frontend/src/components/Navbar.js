import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const navStyle = {
        display: 'flex',
        justifyContent: 'space-around',
        padding: '1rem',
        background: '#f0f0f0',
        borderBottom: '1px solid #ccc',
    };

    const linkStyle = {
        textDecoration: 'none',
        color: '#333',
        fontWeight: 'bold',
    };

    return (
        <nav style={navStyle}>
            <Link to="/" style={linkStyle}>Início</Link>
            <Link to="/clients" style={linkStyle}>Clientes</Link>
            <Link to="/contracts" style={linkStyle}>Contratos</Link>
        </nav>
    );
};

export default Navbar;
