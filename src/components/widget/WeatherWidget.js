import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalState';
import { getSavedStates, saveStates } from '../../utils/storeStates';

export default function WeatherWidget(){
    const navigate = useNavigate();
    const { state } = useContext(GlobalContext);
    const [weatherState, setweatherState] = useState(null);
    
    const onClick = () => {
        navigate('/home');
    };

    const openWeatherAPI = async (lat,lon) => {
        // const cnt = 16;
        const apiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
        // return await axios.get(
        //                `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=${cnt}&appid=${apiKey}`
        //             );
        return await axios.get(
                        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=${apiKey}`
                    );
    };

    useEffect(()=>{
        if(!!state?.city && state?.city?.trim()?.length === 0 && !!weatherState){
            const newState = getSavedStates(state);
            openWeatherAPI(state.lat,state.lon)
                .then(data => {
                    saveStates({...newState, ...data});
                    setweatherState(data);
                })
                .catch(err => console.log(err));
        }
    },[state,weatherState]);

    return (        
        <Row>
            <Col xs={12} md={8} sm={4}>
                <Row>
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                <th>#</th>
                                <th>Date (mm/dd/yyyy)</th>
                                <th>Temp (F)</th>
                                <th>Description</th>
                                <th>Main</th>
                                <th>Pressure</th>
                                <th>Humidity</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row>
                    <Col><Button variant='warning' onClick={onClick}>Back</Button></Col>
                </Row>
            </Col>
        </Row>
    );
}