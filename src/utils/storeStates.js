export async function saveStates(states){
    localStorage.setItem("states",JSON.stringify(states));
    return states;
}

export async function hasSavedStates(){
    try{        
        JSON.parse(localStorage.getItem("states"))
        return localStorage.getItem("states") && typeof localStorage.getItem("states") !== 'undefined' ? true : false;
    }catch(err){
        return false;
    }
}

export function getSavedStates(states){
    try{
        const savedStates = hasSavedStates() ? JSON.parse(localStorage.getItem("states")) : states;
        console.log("savedStates",{...savedStates});
        return savedStates;
    }catch(err){
        console.log("savedStates err",err);
        return states;
    }
}