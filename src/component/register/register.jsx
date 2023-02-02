import "./register.css";
import {useNavigate}from "react-router-dom"
import { useState } from "react";
import axios from "axios";

export default function Register(){

    const [data,setData] = useState({
        user:"",
        password:"",
        confirm:""
    })

    const [erro,setError] = useState({
        user:false
    }) 

    function handleSubmit(e){
        e.preventDefault();
        let input = new FormData(e.target);

        axios("https://todo-api-87id.onrender.com/register",{
            method:"post",
            data:input,
        }).then(res=>{
            // console.log(res.data);
            if(res.data.status === "Success"){
                setError(pre=>{
                    let temp = {...pre,user:false}
                    return temp;
                });
                nav("/");
            }
        }).catch(err=>{
            // console.log(err.response.data);
            if(err.response.data.message === "user already exist" ){
                setError(pre=>{
                    let temp = {...pre,user:true}
                    return temp;
                })
            }
        })
        

    }

    let nav = useNavigate();
    return<div id="reg-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
            <input type={"text"} onChange={(e)=>{
                setData(pre=>{
                    let temp = {...pre,user:e.target.value};
                    return temp;
                })
            }} placeholder={"User Name"} name={"user"} value ={data.user} required />

            {
                erro.user &&<>
                            <br/>
                <span className="danger">*User already exist</span>
                </> 
            }
            <br/>
            <input type={"password"} onChange={(e)=>{
                setData(pre=>{
                    let temp = {...pre,password:e.target.value};
                    return temp;
                });
            }} placeholder={"Password"} value={data.password} name= {"password"} required/>
            <br/>
            <input type={"password"} onChange={(e)=>{
                setData(pre=>{
                    let temp = {...pre,confirm:e.target.value};
                    return temp;
                });
            }} placeholder={"Confirm Password"} value={data.confirm} name = {"confirm password"} required />
            <br/>
            {
              data.password !== data.confirm &&  <span className="danger">Both Password is not equal</span>
            }
            <br/>
            <button disabled={(data.password === data.confirm && data.password !== "" && data.user !== "") ? false:true}>Register</button>
        </form>
        <div>
            <button id="log-btn" onClick={()=>{
                nav("/");
            }}>Log In</button>
        </div>
    </div>
}