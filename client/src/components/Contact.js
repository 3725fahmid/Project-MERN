import React,{ useEffect, useState } from 'react'


function Contact() {

  const [UserData, setUserData] = useState({name:'',email:'',phone:'',message:''});


  const callAboutPage = async () => {
    try{
      const aboutData = await fetch("/getData",{
        method:'get',
        headers:{
            //  Accept: "appllication/json",
             "Content-Type":"application/json"
        },
        // credentials:"include",
      });

      const data = await aboutData.json();
      console.log(data);
      setUserData({...UserData,name:data.name,email:data.email,phone:data.phone});

      if(!aboutData.status === 200) {
        const error = new Error(aboutData.error);
        throw error;
      }

    } catch (err){
      console.log(err);
    }
  }

  useEffect(() => {
    callAboutPage();
    // eslint-disable-next-line
  },[]);

  const contactMessage = (e) => {
     const name = e.target.name;
     const  value = e.target.value;

      setUserData({...UserData, [name]:value})
  }

  //SEND DATA TO BACKEND

  const smsPush = async (e) => {
    e.preventDefault();

    const {name,email,phone,message} = UserData;

    const res = await fetch('/contact',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        name,email,phone,message
      })
    });
    const data = await res.json();

    if(!data) {
      console.log('message not send');
    }else {
      alert("Message Send");
      setUserData({...UserData,message:''})
    }

  }


  return (
    <>
      <div className="main">
        <div className="con-content">
          <div className="details">
            <div className='PEA' id="phone">Phone: {UserData.phone}</div>
            <div className='PEA' id="email">Email: {UserData.email}</div>
            <div className='PEA' id="Address">Address: {UserData.phone}</div>
          </div>
          <div className="container-contact">
            <h1 className='mt-3'>Get in Touch</h1>
            <form method='POST' className='contact-form p-2' id='contactForm'>
              <div className='registerForm mb-2 p-2 d-flex justify-content-space-between'>
                <div className="formGroup">
                  {/* <label for="Email1" className="form-label">Email address</label> */}
                  <input placeholder='your name' autoComplete='off' type="text" className="form-control" id="name" 
                  name='name'
                  value={UserData.name}
                  onChange={contactMessage}
                  />
                </div>
                <div className="formGroup">
                  {/* <label for="Email1" className="form-label">Email address</label> */}
                  <input placeholder='your email' autoComplete='off' type="email" className="form-control" id="Email"
                  name='email'
                  value={UserData.email}
                  onChange={contactMessage}
                  />
                </div>
                <div className="formGroup">
                  {/* <label for="Password" className="form-label">Password</label> */}
                  <input placeholder='your phone' autoComplete='off' type="text" className="form-control" id="phone no"
                  name='phone'
                  value={UserData.phone}
                  onChange={contactMessage}
                  />
                </div>
              </div>
              <div className="form-floating">
              <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea" style={{height:'100px',width:'85%'}}
              name='message'
              value={UserData.message}
              onChange={contactMessage}
              ></textarea>
              <label htmlFor="floatingTextarea2">Comments</label>
            </div>
              <div  className="contact-button pt-3">
                <button type='submmit' className='btn btn-primary btn-lg contact-submit' onClick={smsPush}>Message Send</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact