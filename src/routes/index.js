import {BrowserRouter as Router, Route, Routes as Switch} from "react-router-dom";
import Home from "../views/Home";
import Landing from "../views/Landing";
import Weather from "../views/Weather";

export default function Routes(){
    return (
        <Router>
            <Switch>
                <Route path="/" exact element={<Landing />} />
                <Route path="/home" element={<Home />} />
                <Route path="/weather/:city" element={<Weather />}/>    
            </Switch>
        </Router>
    )
}