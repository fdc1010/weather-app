import { Col, Container, Row } from "react-bootstrap";
import Header from "../components/header/Header";
import LoginWidget from "../components/widget/LoginWidget";

export default function Landing(){
    return (
        <Container className="p-3">
            <Header />
            <Row>
                <Col sm={3}></Col>
                <Col sm={9}><LoginWidget /></Col>
                <Col></Col>
            </Row>
        </Container>
    )
}