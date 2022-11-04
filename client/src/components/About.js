import React, { useEffect, useState } from 'react'
import profile from  './image/profile.jpg'
import { useNavigate } from 'react-router-dom'

function About() {

  const navigate = useNavigate();
  const [UserData, setUserData] = useState({});


  const callAboutPage = async () => {
    try{
      const aboutData = await fetch("/about",{
        method:'get',
        headers:{
             Accept: "appllication/json",
             "Content-Type":"application/json"
        },
        credentials:"include",
      });

      const data = await aboutData.json();
      console.log(data);
      setUserData(data);

      if(!aboutData.status === 200) {
        const error = new Error(aboutData.error);
        throw error;
      }

    } catch (err){
      // console.log(err);
      navigate('/Login');
    }
  }

  useEffect(() => {
    callAboutPage();
    // eslint-disable-next-line
  },[]);

  return (
    <>
        <section className='main'>
            <div className="profile-conatiner">
              <form method='get'>
              <div className="row">
                <div className="col-md-4 p-3">
                  <img src={profile} alt="profile" width={200} height={250} />
                </div>
                <div className="col-md-6" height={100}>
                  <h2>{UserData.name}</h2>
                  <span className='pt-5 mb-5'>
                    {UserData.work}
                    </span>
                  <p>RANKING <span>1/10</span></p>
                </div>
                <div className="col-md-2">
                <input type="submit" value='edit profile' className='rounded'/>
                </div>
              </div>
              <div className="row pt-5">
                <div className="col-md-4">
                  <div className="profile-work">
                  <h6>work link</h6>
                  <a className='linkD link-secondary' href="https://www.youtube.com/watch?v=kHEhhV3EyPU&list=PLwGdqUZWnOp3t3qT7pvAznwUDzKbhEcCc&index=27">you Tube</a><br />
                  <a className='linkD link-secondary' href="https://www.youtube.com/watch?v=kHEhhV3EyPU&list=PLwGdqUZWnOp3t3qT7pvAznwUDzKbhEcCc&index=27">Facebook</a><br />
                  <a className='linkD link-secondary' href="https://www.youtube.com/watch?v=kHEhhV3EyPU&list=PLwGdqUZWnOp3t3qT7pvAznwUDzKbhEcCc&index=27">Twiter</a><br />
                  <a className='linkD link-secondary' href="https://www.youtube.com/watch?v=kHEhhV3EyPU&list=PLwGdqUZWnOp3t3qT7pvAznwUDzKbhEcCc&index=27">Instragram</a><br />
                  <a className='linkD link-secondary' href="https://www.youtube.com/watch?v=kHEhhV3EyPU&list=PLwGdqUZWnOp3t3qT7pvAznwUDzKbhEcCc&index=27">Discord</a><br />
                  <a className='linkD link-secondary' href="https://www.youtube.com/watch?v=kHEhhV3EyPU&list=PLwGdqUZWnOp3t3qT7pvAznwUDzKbhEcCc&index=27">Git hub</a><br />
                  </div>
                </div>
                <div className="col-md-8 pl-5 about-pro">
                  <div className="header-pro" id='profileTab'>
                  <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                      <button className="nav-link active" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="true">Profile</button>
                      <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Timeline</button>
                    </div>
                  </nav>           
                  </div>
                  <div className="tab-content" id="nav-tabContent">
                  <div className="tab-pane fade show active" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                    <div className="row">
                      <div className="col-md-6">
                        <label htmlFor="User id">user id</label>
                      </div>
                      <div className="col-md-6">
                        <p>{UserData._id}</p>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="User id">Name</label>
                      </div>
                      <div className="col-md-6">
                        <p>{UserData.name}</p>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="User id">collage</label>
                      </div>
                      <div className="col-md-6">
                        <p>SRCC</p>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="User id">home</label>
                      </div>
                      <div className="col-md-6">
                        <p>Raj</p>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="User id">Address</label>
                      </div>
                      <div className="col-md-6">
                        <p>Dhaka</p>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                    <div className="row">
                      <div className="col-md-6">
                        <label htmlFor="User id">Experience</label>
                      </div>
                      <div className="col-md-6">
                        <p>expart</p>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="User id">Hourly Rate</label>
                      </div>
                      <div className="col-md-6">
                        <p>10$/hr</p>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="User id">Total project</label>
                      </div>
                      <div className="col-md-6">
                        <p>200</p>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="User id">working on </label>
                      </div>
                      <div className="col-md-6">
                        <p>51</p>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="User id">position</label>
                      </div>
                      <div className="col-md-6">
                        <p>{UserData.work}</p>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
              </form>
            </div>
        </section>
    </>
  )
}

export default About