import React, { useState} from 'react'
import { useNavigate } from 'react-router-dom'
import signin from '../components/image/login.png';
import { NavLink } from 'react-router-dom';


function Signup() {
    const Navigate = useNavigate();
    const [user, setUser] = useState({
        name:"", email: "", work: "", phone: "", password: "", cpassword: ""
    });
    
    let targetName,value;

    const handleInput = (e) => {
        console.log(e);
        targetName = e.target.name;
        value = e.target.value;

        setUser({...user,[targetName]:value})
    }

    //Here we pass this value to database

const Register = async (e) => {
        e.preventDefault();

        const {name,email,phone,work,password,cpassword} = user;

      const res =  await fetch('/register',{

      method:"POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name:name,
        email:email,
        phone:phone,
        work:work,
        password:password,
        cpassword:cpassword,
      })
    });

    const data = await res.json();

    if(data.status === 422 || !data){
        window.alert('INVALID REGISTRATIN');
        console.log('INVALID REGISTRATIN');
    }else {
        window.alert('Sucessful');
        console.log('Sucessful');
        // <NavLink to='/Login' />
        Navigate('/Login');
    }
}



    return (
        <>
            <section className='main'>
                <div className='container'>         
                    <div className='signup-content'>
                        <div className='left-Sigup'>
                        <h2>Signup Page</h2>
                            <form method='POST' className='registerForm' id='registerForm'>
                                <div className="formGroup">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input  name='name' type="text" className="form-control" id="name" 
                                        value={user.name}
                                        onChange={handleInput} 
                                        autoComplete='off'                                 
                                    />
                                </div>
                                <div className="formGroup">
                                    <label htmlFor="Email1" className="form-label">Email address</label>
                                    <input  name='email' type="email" className="form-control" id="Email" 
                                        value={user.email}
                                        onChange={handleInput} 
                                        autoComplete='off'                                 
                                    />
                                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                </div>
                                <div className="formGroup">
                                    <label htmlFor="phone" className="form-label">Phone No</label>
                                    <input name='phone' type="phone" className="form-control" id="phone" 
                                        value={user.phone}
                                        onChange={handleInput} 
                                        autoComplete='off'                                  
                                    />
                                </div>
                                <div className="formGroup">
                                    <label htmlFor="work" className="form-label">Work</label>
                                    <input  name='work' type="text" className="form-control" id="work" 
                                        value={user.work}
                                        onChange={handleInput} 
                                        autoComplete='off'                                 
                                    />
                                </div>
                                <div className="formGroup">
                                    <label htmlFor="Password" className="form-label">Password</label>
                                    <input name='password' type="showpassword" className="form-control" id="Password" 
                                        value={user.password}
                                        onChange={handleInput}
                                        autoComplete='off'
                                    />
                                </div>
                                <div className="formGroup">
                                    <label htmlFor="cPassword" className="form-label">Confirm Password</label>
                                    <input  name='cpassword' type="showpassword" className="form-control" id="cPassword" 
                                        value={user.cpassword}
                                        onChange={handleInput} 
                                        autoComplete='off'                                 
                                    />
                                </div>
                                {/* <div className="formGroup form-check">
                                    <input autoComplete='off' type="checkbox" className="form-check-input" id="Check1"/>
                                    <label className="form-check-label" htmlFor="Check1">Check me out</label>
                                </div> */}
                                <button  className="btn btn-primary" type="submit" name='singup' id='signup' 
                                value='register'
                                onClick={Register}
                                >Register</button>
                            </form>
                        </div>
                        <div className='right_Sigup mt-5'>
                            <img src={signin} alt='signupimage' width={400} height={300}></img>
                        </div>
                            <div>
                            <NavLink to='/Login' className='registerUser mt-10'>Already register</NavLink>
                            </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Signup