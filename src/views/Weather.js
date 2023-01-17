import { Col, Container, Row } from "react-bootstrap";
import Header from "../components/header/Header";
import WeatherWidget from "../components/widget/WeatherWidget";

export default function Weather(){
    return (
        <Container className="p-3">
            <Header />
            <Row>
                <Col sm={3}></Col>
                <Col sm={9}><WeatherWidget /></Col>
                <Col></Col>
            </Row>            
        </Container>
    )
}