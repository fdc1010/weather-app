import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalState';
import GitHubLogin from '../../utils/github-login';
import { saveStates } from '../../utils/storeStates';

export default function Login(){
    const navigate = useNavigate();
    const { state, dispatch } = useContext(GlobalContext);

    const onSuccess = async (data) => {
    
        await axios.get('https://api.github.com/user', {
            headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`
            }
        }).then((res) => {
            const { data } = res;
            new Promise(resolve => {
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: { ...state, ...data, isLogin: true }
                })
                resolve({ ...state, ...data, isLogin: true });
            })
            .then(newState => {
                saveStates({ ...state, ...data, ...newState })
                    .then(() => navigate('/home'))
                    .catch(err => onFailure(err));
                
            }).catch(err => onFailure(err));
            return res;
        }).catch(err => onFailure(err));
    };
    const onFailure = response => {
        console.error(response);
    };

    useEffect(() => {
        if(!!state?.isLogin){
            navigate('/home')
        }
    },[state, navigate]);

    return (<>
            <GitHubLogin 
            clientId={process.env.REACT_APP_GITHUB_APP_CLIENT_ID}
            clientSecret={process.env.REACT_APP_GITHUB_APP_CLIENT_SECRET}
            personalAccessToken={process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}
            onSuccess={onSuccess}
            onFailure={onFailure} 
            >Login</GitHubLogin></>)
}