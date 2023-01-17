import { useContext, useEffect, useState } from "react";
import { Button, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";
import { getSavedStates, saveStates } from "../../utils/storeStates";
import cloudLogo from "../../cloud-clipart-md.png";

export default function Header(){
    const navigate = useNavigate();
    const { state, dispatch } = useContext(GlobalContext);
    const [isLogin, setisLogin] = useState(false)
    const onClick = () => {
        new Promise(resolve => {
            dispatch({
                type: "LOGOUT",
                payload: { ...state, isLogin: false }
            });            
            saveStates({ ...state, isLogin: false });
            resolve({ ...state, isLogin: false });
        })
        .then(() => navigate('/'))
        .catch(err => console.log(err));
    };
    
    useEffect(() => {
        if(!!state?.isLogin){
            const storedStates = getSavedStates(state);
            setisLogin(storedStates?.isLogin ?? false);
        }
            
    },[state]);

    return (
        <>
        <Stack direction="horizontal" gap={3}>
                <img
                src={cloudLogo}
                className='img-thumbnail border-0 w-25 me-auto'
                alt='...'
                />
            {
            isLogin && <Button onClick={onClick} variant="danger">Logout</Button>
            }         
        </Stack>
        <hr />
        </>
    )
}