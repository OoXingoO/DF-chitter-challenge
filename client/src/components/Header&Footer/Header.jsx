/* eslint-disable */
import logo from '../../utils/logo.png'

const Header = ({ user, logOut }) => {
    if (user && user._id) {
        return (
            <nav>
                <ul className='topnav'>
                    <li className='logo'><a href="#">
                        <img className="img-fluid" src={logo} alt="Chitter Logo" />
                    </a>
                    </li>
                    <li id='logout-item' className='logOut' onClick={logOut}><a className='logOut-button'>Log out</a></li>
                </ul>
            </nav>
        )
    } else {
        return (
            <nav>
                <ul className='topnav'>
                    <li className='logo'><a href="/">
                        <img className="img-fluid" src={logo} alt="Chitter Logo" />
                    </a>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Header;