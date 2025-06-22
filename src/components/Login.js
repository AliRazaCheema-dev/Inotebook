import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

function Login(props) {
    const [credentials, setcredentials] = useState({email:"", password:""});
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });
        const json = await response.json();
        
        if (json.success) {
            localStorage.setItem('token', json.authToken);
            console.log(json.authToken)

            props.showAlert("success", "Logged In Successfully");
            navigate('/');
        } else {
            props.showAlert("danger", "Invalid Credentials");
        }
    }

    const onChange = (e)=>{
        setcredentials({...credentials, [e.target.name]:e.target.value})
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group my-2">
                    <label className="my-2" htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="email" value={credentials.email} name="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange} />
                </div>
                <div className="form-group my-2">
                    <label className="my-2" htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="password" name='password'  value={credentials.password} placeholder="Password" onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login