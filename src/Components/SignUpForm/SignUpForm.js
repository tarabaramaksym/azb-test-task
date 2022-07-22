import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { addUser, getPositions } from "../../API/users-api";
import '../../Styles/SignUpForm/SignUpForm.css';
import '../../Styles/Inputs/Inputs.css';
import { getUsers } from "../../Redux/actions";



const SignUpForm = props => {

  const [positions, setPositions] = useState();
  const [isValid, setIsValid] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    position_id: 1,
    photo: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPositions();
      setPositions(data.positions);
    }
    fetchData();
  }, [])

  useEffect(() => {
    validate();
  }, [form])

  const validate = async () => {
    // check if form is valid, if yes, buttons is gonna stop being disabled
    if (
      form.name.length < 2 || form.name.length > 60 ||
      !/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(form.email) ||
      form.phone.indexOf('+380') != 0 ||
      form.photo === '' || !form.photo || form.phone === '' ||
      form.photo.size >= (5 * 1000000)
    ) {
      setIsValid(false);
    }
    else {
      setIsValid(true);
    }
  }

  const submitHandler = async event => {

    // create formdata and send it, after refresh the user cards
    event.preventDefault();
    const formData = new FormData();

    formData.append('position_id', form.position_id);
    formData.append('name', form.name);
    formData.append('email', form.email);
    formData.append('phone', form.phone);
    formData.append('photo', form.photo);

    await addUser(formData);
    await props.getUsers(0);
  }

  if (!positions) {
    return null;
  }

  return (
    <div className="sign-up-form" >
      <h2 className="title h-center-container margin-title" id="signup">Working with POST request</h2>
      <form method="POST" onSubmit={submitHandler}>
        <input className="input-text" placeholder="Your name" name="name" value={form.name} onChange={event => setForm({ ...form, name: event.target.value })}></input>
        <input className="input-text" placeholder="Email" name="email" type="email" value={form.email} onChange={event => setForm({ ...form, email: event.target.value })}></input>
        <input className="input-text" placeholder="Phone" name="phone" value={form.phone} onChange={event => setForm({ ...form, phone: event.target.value })}></input>
        <label className="phone-mask-label" htmlFor="phone"  >+38 (XXX) XXX-XX-XX</label>

        <label className="position-label" >Select your position</label>
        {
          positions.map(p => {
            return (
              <label key={p.id} className="radio-container">{p.name}
                <input type="radio" name="position" checked={p.id == form.position_id ? true : false} onChange={event => setForm({ ...form, position_id: p.id })} />
                <span className="checkmark"></span>
              </label>
            );
          })
        }
        <label className="input-container-file">
          <input className="input-file" type="file" name="photo" accept="image/jpg, image/jpeg"
            onChange={event => { setForm({ ...form, photo: event.target.files[0] }) }} />
          <div className="btn-upload" type="file"><p>Upload</p></div>
          <div className="upload-text" onClick={event => event.preventDefault()}><p>{form.photo === '' ? 'Upload your photo' : form.photo.name}</p></div>
        </label>

        <button className="btn btn-primary" disabled={!isValid}>Sign up</button>

      </form >
    </div >
  )
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  getUsers: getUsers
}


export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);