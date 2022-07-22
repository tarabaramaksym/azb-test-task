import '../../Styles/Header/Header.css';
import logo from '../../Assets/Logo.svg';

const Header = () => {
  return (
    <header>
      <div className='container header-container'>
        <img src={logo} alt="Site logo" />
        <div className="buttons-container">
          <a href='#users' className='btn btn-primary'>Users</a>
          <a href='#signup' className='btn btn-primary'>Sign up</a>
        </div>
      </div>
    </header>
  )
}

export default Header;