import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { addUser, getPositions } from "../../API/users-api";
import '../../Styles/SignUpForm/SignUpForm.css';
import '../../Styles/Inputs/Inputs.css';
import { getUsers } from "../../Redux/actions";



const SignUpForm = props => {

  const [positions, setPositions] = useState();
  const [isFormValid, setIsFormValid] = useState(false);

  const [form, setForm] = useState({
    name:
    {
      type: 'text',
      value: '',
      placeholder: 'Your name',
      validate: (field) => field.length > 2 && field.length <= 60,
      isValid: false,
      triedInput: false,
      errorMessage: 'Name needs to be longer than 2 and shorter than 60 letters',
      inFocus: false
    },
    email: {
      type: 'email',
      value: '',
      placeholder: 'Email',
      validate: (field) => /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(field),
      isValid: false,
      triedInput: false,
      errorMessage: 'Not valid email format',
      inFocus: false
    },

    phone: {
      type: 'text',
      value: '',
      placeholder: 'Phone',
      validate: (field) => (field.indexOf('+380') == 0 || field.indexOf('380') == 0 || field.indexOf('+38 (0') == 0) && (field.length === 12 || field.length === 13),
      isValid: false,
      triedInput: false,
      errorMessage: 'Phone needs to start with the +380 code and have 12 digits',
      preSend: (value) => value[0] === '+' ? value : `+${value}`,
      inFocus: false
    },
    position_id: {
      value: 1,
      render: false,
      validate: () => true,
      isValid: true,
      triedInput: true
    },
    photo: {
      value: '',
      validate: (field) => field.size <= (5 * 1000000),
      isValid: false,
      triedInput: false,
      errorMessage: 'Photo needs to be smaller than 5 MB',
      render: false,
      inFocus: false,
    }
  })


  useEffect(() => {
    const fetchData = async () => {
      const data = await getPositions();
      setPositions(data.positions);
    }
    fetchData();
  }, [])

  useEffect(() => {
    let isFormValid = true;
    Object.keys(form).forEach(key => {
      if (!form[key].isValid) {
        isFormValid = false
      }
    })
    setIsFormValid(isFormValid);
  }, [form])

  const changeHandler = (value, fieldName) => {
    const newForm = { ...form };
    newForm[fieldName] = {
      ...form[fieldName],
      value,
      isValid: form[fieldName].validate(value),
      triedInput: true
    }
    setForm(newForm);
  }

  const focusHandler = (focused, fieldName) => {
    const newForm = { ...form };

    newForm[fieldName] = {
      ...form[fieldName],
      inFocus: focused
    }
    setForm(newForm);
  }


  const submitHandler = async event => {
    // create formdata and send it, after refresh the user cards
    event.preventDefault();
    const formData = new FormData();

    Object.keys(form).forEach(key => {
      const value = 'preSend' in form[key] ? form[key].preSend(form[key].value) : form[key].value;
      formData.append(key, value);
    });

    await addUser(formData);
    await props.getUsers(0);

    // reset form
    const newForm = { ...form };
    Object.keys(form).forEach(key => {
      newForm[key] = {
        ...form[key], value: '', isValid: false,
        triedInput: false,
      }
    });
  }

  if (!positions) {
    return null;
  }

  return (
    <div className="sign-up-form" >
      <h2 className="title h-center-container margin-title" id="signup">Working with POST request</h2>
      <form method="POST" onSubmit={submitHandler}>
        {
          Object.keys(form).map(field => {
            if (form[field].render !== false) {
              const obj = form[field];

              return (
                <div key={field} >
                  <input
                    onFocus={() => focusHandler(true, field)}
                    onBlur={() => focusHandler(false, field)}
                    className={`input-text ${!obj.isValid && obj.triedInput ? 'input-error' : ''}`}
                    placeholder={obj.placeholder}
                    name={field}
                    value={obj.value} onChange={(event) => changeHandler(event.target.value, field)}></input>

                  <label className={`label-error ${field === 'phone' ? 'label-phone' : ''}`} style={!obj.isValid && obj.triedInput && !obj.inFocus ? { display: 'block' } : { display: 'none' }}>{obj.errorMessage}</label>
                </div>
              )
            }
          })
        }
        <label className="phone-mask-label" htmlFor="phone"  >+38 (XXX) XXX-XX-XX</label>

        <label className="position-label" >Select your position</label>
        {
          positions.map(p => {
            return (
              <label key={p.id} className="radio-container">{p.name}
                <input type="radio" name="position" checked={p.id == form.position_id.value ? true : false} onChange={(event) => changeHandler(p.id, 'position_id')} />
                <span className="checkmark"></span>
              </label>
            );
          })
        }

        <label className="input-container-file">
          <input className="input-file" type="file" name="photo" accept="image/jpg, image/jpeg"
            onChange={(event) => changeHandler(event.target.files[0], 'photo')} />
          <div className="btn-upload" type="file"><p>Upload</p></div>
          <div className="upload-text" onClick={event => event.preventDefault()}><p>{form.photo.value === '' ? 'Upload your photo' : form.photo.value.name}</p></div>
        </label>
        <label className="label-error" style={!form.photo.isValid && form.photo.triedInput ? { display: 'block' } : { display: 'none' }}>{form.photo.errroMessage}</label>

        <button className="btn btn-primary" disabled={!isFormValid}>Sign up</button>

      </form >
    </div >
  )
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  getUsers: getUsers
}


export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);