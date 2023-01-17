import { Col, Container, Row } from "react-bootstrap";
import Header from "../components/header/Header";
import SearchWidget from "../components/widget/SearchWidget";

export default function Home(){
    
    return (
        <Container className="p-3">
            <Header />
            <Row>
                <Col sm={3}></Col>
                <Col sm={9} className="text-center"><SearchWidget /></Col>
                <Col></Col>
            </Row>
        </Container>
    )
}