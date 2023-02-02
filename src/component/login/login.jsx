import "./login.css";
import axios from "axios";
import { useState } from "react";
import{useNavigate} from "react-router-dom";
export default function Login(){

    const [errorCom,setErrorComp]= useState({
        name:false,
        password:false
    });

    let nav = useNavigate(); 


    function submitHandle(e){
        e.preventDefault();
        let input = new FormData(e.target);
        
        
        axios("https://todo-api-87id.onrender.com/login",{
            method:"post",
            data:input,
        }).then(res=>{
            // console.log(res.data);
            localStorage.setItem("token",res.data.token);
            nav("/todo");

        })
        .catch(err=>{
            // console.log(err.response.data);
            if(err.response.data.message === "invalid password"){
                setErrorComp(pre=>{
                    let temp = {...pre,password:true}
                    return temp;
                })
            }else if(err.response.data.message === "user not exist"){
                setErrorComp(pre=>{
                    let temp = {...pre,user:true}
                    return temp;
                })
            }
        })
    }


    return<div id="login-container">
    <h2>Log in</h2>
    <form onSubmit={submitHandle}>
        <input type={"text"} placeholder={"Username"} name="user"  required />
        <br/>
        {
            errorCom.user && <span className="danger">*Invalid User</span>
        }
        <br/>
        <input type={ "password"} placeholder={"Password"} name="password"  required />
        <br/>
        {
            errorCom.password && <span className="danger">*Invalid password</span>
        }
        <br/>
        <button>Log In</button>
    </form>
    <div>
        <button id="reg-btn" onClick={()=>{
            nav("/register");
        }}>Register Here</button>
    </div>
    </div>
}