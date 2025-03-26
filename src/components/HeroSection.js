"use client";

import { Container, Row, Col, Button } from "react-bootstrap";

export default function HeroSection() {
    return (
        <Container className="hero-section" style={{
            width: "90%", // Ensure it spans the full container width
            maxWidth: "100vw", // Prevent horizontal overflow
            marginLeft: "auto", // Set left margin to 40px
            marginRight: "auto", // Set right margin to 40px
            padding: "0", // Remove any padding
            boxSizing: "border-box", // Include padding and border in width calculation
            overflowX: "hidden", // Prevent horizontal scrolling
        }}>
            <Row className="align-items-center">
                <Col xs={12} md={6} xl={7} className="mb-4 py-5">
                    <div className="mb-4 lh-1">
                        <h1 className="display-4 text-warning fw-bold">
                            Sip into Summer 🍋
                        </h1>
                    </div>
                    <p className="fs-5 mb-4 text-muted">
                        Discover handcrafted lemonade blends made with love, sunshine, and a twist of creativity. Fresh, fruity, and made for summer days!
                    </p>
                    <Button size="lg" variant="warning" href="/products">
                        Browse Lemonades
                    </Button>
                </Col>
                <Col xs={12} md={6} xl={5} className="px-md-4 px-lg-5">
                    <p className="fs-5">
                        Whether you’re into classic lemons or fruity favorites like strawberry, mint, or peach – we’ve got the perfect sip for you. Cool off and treat yourself.
                    </p>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col md={12} className="g-0">
                    <a
                        href="https://images.unsplash.com/photo-1558640479-8247f2c9f4a1"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            className="img-fluid w-100"
                            src="https://images.unsplash.com/photo-1602104623433-2dd8b8b35548?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Refreshing Lemonade"
                            style={{
                                objectFit: "cover",
                                width: "80%", // Ensure the image respects the container width
                                maxHeight: "40vh",
                            }} />
                    </a>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col md={12} className="d-flex justify-content-center align-items-baseline">
                    <div className="py-4 me-3">
                        <h4 className="fw-bold text-muted">Est.</h4>
                    </div>
                    <div className="py-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="2em"
                            height="2em"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="text-warning"
                        >
                            <path d="M23,12L19,16V13H6.83C6.42,14.17 5.31,15 4,15A3,3 0 0,1 1,12A3,3 0 0,1 4,9C5.31,9 6.42,9.83 6.83,11H19V8L23,12Z"></path>
                        </svg>
                    </div>
                    <div className="py-4 ms-3">
                        <h4 className="fw-bold text-muted">2024</h4>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
