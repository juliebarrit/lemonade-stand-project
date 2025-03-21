"use client";

import { useCart } from "@/context/CartContext";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

export default function CartPage() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">🛒 Din kurv</h1>
      {cart.length === 0 ? (
        <p className="text-center">Din kurv er tom.</p>
      ) : (
        <>
          <Row>
            {cart.map((item, index) => (
              <Col key={index} md={6} lg={4} className="mb-4">
                <Card className="h-100">
                  <Card.Img
                    variant="top"
                    src={item.image}
                    alt={item.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>{item.price} DKK</Card.Text>
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        −
                      </Button>
                      <span>{item.quantity}</span>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => increaseQuantity(item.id)}
                      >
                        +
                      </Button>
                    </div>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Fjern
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Total pris og checkout */}
          <div className="text-center mt-5">
            <h4>Samlet pris: {totalPrice.toFixed(2)} DKK</h4>
            <Button variant="success" size="lg" className="mt-3">
              Go to checkout
            </Button>
          </div>
        </>
      )}
    </Container>
  );
}
