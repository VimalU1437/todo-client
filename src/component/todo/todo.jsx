import axios from "axios";
import { useEffect } from "react";
import "./todo.css";
import {useNavigate} from "react-router-dom"
import { useState } from "react";
import { useReducer } from "react";
import {reducer} from "./reducer";

export default function Todo (){

    const [user,setUser]= useState("user");

    let date = new Date();
    const todoTemp = {
        id:new Date().getTime().toString(),
        activity:"",
        status:"Pending",
        timeTaken:"",
        action:[{
                name:"Start",
                action:true,
            },{
                name:"End",
                action:false
            },{
                name:"Resume",
                action:false
            },{
                name:"Pause",
                action:false
            }],
        start:"00:00:00",
        totalTime:"00:00:00",       
    }

    const [activity,setActivity]= useState({
        display:false,
        data:""
    });

    const [todoData,dispatch] = useReducer(reducer,[]);

    // console.log(todoData);
    const nav = useNavigate();

    function handleAction(e,id){
        switch(e.target.textContent){
            case "Start":{
                dispatch({action:"Start",payload:{id:id}});
                break;
            }
            default:{
                return null;
            }
        }
    }


    async function FCall(){
        try{
            let res = await axios("https://todo-api-87id.onrender.com/todo",{
                method:"get",
                headers:{
                    Authorization:localStorage.getItem("token")
                }
            })
            setUser(res.data.data.user);

        }catch(e){

            nav("/");
        }

    }
    useEffect(()=>{
        FCall();
    })
    return <div>
        <h2 id="heading-todo">Todos</h2>
        <header id="header-todo">
            <section>{user}</section>
        </header>
        <aside id="aside-todo">
            <div>
            <h3>To do List</h3>
            <p><b>History</b></p>
            </div>
            <div>

            <button onClick={()=>{
                localStorage.removeItem("token");
                nav("/");
            }}
            >Log Out</button>
            </div>
        </aside>
        <main>
            <div>
                <button id="activity-todo" onClick={()=>{
                    setActivity(pre=>{
                        let temp = {...pre,display:true};
                        return temp;
                    })
                }}>Add new activity</button>
            </div>
            <section id="table-section">
                <table>
                    <thead >
                        <tr>
                            <th>Activity</th>
                            <th>Status</th>
                            <th>Time taken<br/>{"(Hrs:Min:Sec)"}</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                          todoData.length !== 0 && todoData.map(elm=>{
                            return <tr key={elm.id}>
                                <td>{elm.activity}</td>
                                <td>{elm.status}</td>
                                <td>{elm.timeTaken}</td>
                                <td>{elm.action.map((action,i)=>{
                                    if(action.action){
                                        return<span onClick={(e)=>{handleAction(e,elm.id)}} key={i}>{action.name}</span>
                                    }
                                })}</td>
                            </tr>
                          })  
                        }
                    </tbody>
                </table>
            </section>
        </main>
        {
            activity.display && <div id="add-container">
            
            <input type="text" onChange={(e)=>setActivity(pre=>{
                let temp = {...pre,data:e.target.value}
                return temp;
            })} placeholder="Enter Activity"  />
            <button onClick={()=>{
                dispatch({type:"addData",payload:{...todoTemp,activity:activity.data}});
                setActivity(pre=>{
                    let temp = {...pre,display:false}
                    return temp;
                })
            }}>Add</button>
        
    </div>
        }
        
    </div>
}