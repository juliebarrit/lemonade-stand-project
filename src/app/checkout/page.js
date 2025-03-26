"use client";

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, ListGroup, Button, Image } from "react-bootstrap";

export default function Checkout() {
  const [checkoutProducts, setCheckoutProducts] = useState([]);

  useEffect(() => {
    // Retrieve products from localStorage
    const storedProducts = localStorage.getItem("checkoutProducts");
    if (storedProducts) {
      setCheckoutProducts(JSON.parse(storedProducts));
      localStorage.removeItem("checkoutProducts"); // Clear localStorage after retrieval
    }
  }, []);

  const calculateTotal = () =>
    checkoutProducts.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Order Confirmation</h1>
      {checkoutProducts.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <Row className="justify-content-center">
          <Col md={8}>
            <Card>
              <Card.Header as="h5" className="text-center">
                Products
              </Card.Header>
              <ListGroup variant="flush">
                {checkoutProducts.map((item) => (
                  <ListGroup.Item key={item.id} className="d-flex align-items-center">
                    <Image
                      src={item.image}
                      alt={item.name}
                      rounded
                      style={{ width: "50px", height: "50px", objectFit: "cover", marginRight: "15px" }}
                    />
                    <div className="flex-grow-1">
                      <strong>{item.name}</strong> <br />
                      {item.quantity} x ${Number(item.price).toFixed(2)}
                    </div>
                    <div>${(item.price * item.quantity).toFixed(2)}</div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Card.Footer className="text-center">
                <h4>Total: ${calculateTotal().toFixed(2)}</h4>
                <p>Your order is being processed. Thank you for your purchase!</p>
                <Button variant="primary" className="mt-3">
                  Continue Shopping
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}
