

export function reducer(state=[],action){
    switch(action.type){
        case "addData":{
            let temp  = [...state];
            temp.push(action.payload);
            return temp;
        }
        case "Start":{
            console.log("Start");
            let temp = [...state];
            temp.forEach(elm=>{
                if(elm.id === action.payload.id){
                    elm.action[0] = {action:false};
                    elm.action[1] = {action:true};
                    elm.action[3] = {action:true};
                }

            })
            console.log(temp);
            return state;
        }
        default:{
            return [...state];
        }
    }
}