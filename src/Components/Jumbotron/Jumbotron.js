import '../../Styles/Jumbotron/Jumbotron.css';
import bg from '../../Assets/bg-field-image.jpeg';

const Jumbotron = () => {
  return (
    <div className="jumbotron v-h-center-container" style={{
      background: `linear-gradient(rgba(0,0,0,0.58),rgba(0,0,0,0.58)), url(${bg})`
    }}>
      <div>
        <h1 className='title'>Test assignment for front-end developer</h1>
        <p>
          What defines a good front-end developer is one that has skilled knowledge of HTML,
          CSS, JS with a vast understanding of User design thinking as they'll be building
          web interfaces with accessibility in mind. They should also be excited to learn,
          as the world of Front-End Development keeps evolving.
        </p>
        <a href='#signup' className='btn btn-primary btn-center'>Sign up</a>
      </div>

    </div>
  );
}

export default Jumbotron;