import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

function Signup(props) {

  const [credentials, setcredentials] = useState({name:"",email:"", password:"", confirmPassword:""});
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
      e.preventDefault();
      const {name,email, password}= credentials
      const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({name,email, password}),
      });
      const json = await response.json();
      console.log(json);
      if(json.success){
          //Save the token and redirect
          localStorage.setItem('token', json.authtoken);
          props.showAlert("success","Account Created Sucessfully")
          navigate('/');
          
      }else{
          props.showAlert("danger","Invalid Credentiials")
      }
  }

  const onChange = (e)=>{
      setcredentials({...credentials, [e.target.name]:e.target.value})
  }

  return (
    <div>
      <form onSubmit={handleSubmit} style={{margin: "auto", maxWidth: "800px"}}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name='name' required onChange={onChange} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' required onChange={onChange} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' required minLength={5} onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="confirmPassword" name='confirmPassword' required minLength={5} onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form></div>
  )
}

export default Signup