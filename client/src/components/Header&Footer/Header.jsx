/* eslint-disable */
import logo from '../../utils/logo.png'

const Header = () => {
    return (
        <nav>
            <ul className='topnav'>
                <li className='logo'><a href="#">
                    <img className="img-fluid" src={logo} alt="Chitter Logo" />
                </a>
                </li>
                <li id='home-item' ><a className="home" href="#">Home</a></li>
                <li id='logout-item' className='logOut'><a className='logOut-button' href='#'>Log out</a></li>
            </ul>
        </nav>
    )
}

export default Header;