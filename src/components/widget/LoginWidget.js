import { Col, Row } from 'react-bootstrap';
import Login from '../login/Login';

export default function LoginWidget(){
    return (            
        <Row>
            <Col xs={12} md={8} sm={4}>
                <Row>
                    <Col>Welcome to the weather forecast web application. Please login with your</Col>
                </Row>
                <Row>
                    <Col>GitHub user to use the application and view the weather in your city</Col>
                </Row>
                <Row>
                    <Col className="mx-auto pt-3"><Login /></Col>
                </Row>
            </Col>
        </Row>
    )
}