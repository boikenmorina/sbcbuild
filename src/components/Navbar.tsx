import React from 'react';
import './Navbar.module.css';

const Navbar: React.FC = () => {
    const styles = {
        nav: {
            backgroundColor: '#333',
            padding: '10px 20px',
        },
        ul: {
            listStyle: 'none',
            padding: 0,
            display: 'flex',
            justifyContent: 'space-around',
        },
        li: {
            color: '#fff',
            cursor: 'pointer',
        }
    };

    return (
        <nav style={styles.nav}>
            <ul style={styles.ul}>
                <li style={styles.li}>Home</li>
                <li style={styles.li}>Search Players</li>
                <li style={styles.li}>View Players</li>
                <li style={styles.li}>Make Team</li>
            </ul>
        </nav>
    );
}

export default Navbar;
