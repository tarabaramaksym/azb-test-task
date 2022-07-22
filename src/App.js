import Header from './Components/Header/Header';
import Jumbotron from './Components/Jumbotron/Jumbotron';
import SignUpForm from './Components/SignUpForm/SignUpForm';
import UserCards from './Components/UserCards/UserCards';
import './Styles/BaseStyle.css'
import './Styles/Buttons/Buttons.css';
import './Styles/Text/Text.css';
import './Styles/Containers/Containers.css';

function App() {

  return (
    <div className="App">
      <Header />
      <div className='container'>
        <Jumbotron />
        <UserCards />
        <SignUpForm />
      </div>

    </div>
  );
}

export default App;
