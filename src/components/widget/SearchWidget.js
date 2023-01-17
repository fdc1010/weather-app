import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalState';
import { saveStates } from '../../utils/storeStates';

export default function SearchWidget(){
    const navigate = useNavigate();
    const { state, dispatch } = useContext(GlobalContext);
    const [validated, setValidated] = useState(false);
    const [searchTxt, setSearchTxt] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.stopPropagation();
        }else{
            setValidated(true);
        }
      };
    
    const onChange = e => {
        setSearchTxt(e.target.value);
   
        // saveStates({...state, city: e.target.value});

        const searchLL = searchLatLon(e.target.value)
                            .then(data => {
                                if(!!data[0])
                                    saveStates({...state, city: data[0].name, lat: data[0].lat, lon: data[0].lon});
                                    
                                return data[0] ?? state;
                            })
                            .catch(err =>{
                                console.log(err);
                                return state;
                            })

        console.log("searchLL",searchLL);
    };

    const searchLatLon = async(city) => {
        const limit = 5;
        const apiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
        return await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${apiKey}`)
    }
    useEffect(()=>{
        if(validated){
            new Promise(resolve => {
                dispatch({
                    type: "USER_SEARCH_WEATHER",
                    payload: { ...state, city: searchTxt }
                });            
                saveStates({ ...state, city: searchTxt });
                resolve({ ...state, city: searchTxt });
            })
            .then(() => navigate(`/weather/${searchTxt}`))
            .catch(err => console.log(err));
        }
    },[dispatch,navigate,searchTxt,state,validated]);

    return (
        <Row>
            <Col xs={12} md={8} sm={4}>
                <Form validated={validated} onSubmit={handleSubmit}>
                    <Row>
                        <Form.Group as={Col} controlId="validationCustomSearchCity">                            
                            <InputGroup hasValidation className="mb-4">
                                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                <Form.Control
                                type="text"
                                placeholder="Search City"
                                aria-label="Search City"
                                aria-describedby="inputGroupPrepend"
                                value={searchTxt}
                                onChange={onChange}
                                required
                                />
                                <Form.Control.Feedback type="invalid">
                                Please input city you wish to search.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Row>
                    <Button variant="success" type="submit">Display Weather</Button>
                </Form>
            </Col>
        </Row>
    );
}