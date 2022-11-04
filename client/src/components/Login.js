import React,{useState} from 'react'
import { NavLink,useNavigate } from 'react-router-dom'

const Login = () => {

    const navigate = useNavigate()

    const [user,setUser] = useState({
         email: "", password: "",
    });

    let name,value;

    const handleChange = (e) => {
            name = e.target.name;
            value= e.target.value;

            setUser({...user,[name]:value});
    }

    const LoginBtn = async (e) => {
            e.preventDefault();
        const {email,password} = user;
        
        const res = await fetch('/signin',{

            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                email,password
            })
        });
 
        const data = res.json();

        if(res.status === 400 || !data) {
            window.alert("Invalid credistial");
        }
        else{
            window.alert("Login suessfull");
            navigate("/");
        }


        
    }


    return (
        <>
            <section className='main'>
                <div className='container'>
                    <div className='Login-content'>
                        <h2> Log in </h2>
                    <form method='POST' className='registerForm' id='registerForm'>
                                <div className="formGroup">
                                    <label htmlFor="Email1" className="form-label">Email address</label>
                                    <input name="email"  type="email" className="form-control" id="Email" autoComplete='off'
                                    value={user.email}
                                    onChange={handleChange}
                                    />
                                </div>
                                <div className="formGroup">
                                    <label htmlFor="Password" className="form-label">Password</label>
                                    <input name="password"  type="swowpassword" className="form-control" id="Password" autoComplete='off'
                                    value={user.password}
                                    onChange={handleChange}
                                    />
                                </div><br/>
                                <button type="submit" name='singin' id='signin' value='register' className="btn btn-primary"
                                onClick={LoginBtn}
                                >Log in</button>
                                <div>
                                <br/><NavLink to='/Signup'>Create an Account</NavLink>
                        </div>
                            </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login