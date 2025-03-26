"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { Container, Card, Row, Col, Spinner } from "react-bootstrap";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const orderList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(orderList);
      } catch (err) {
        console.error("Fejl ved hentning af ordrer:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">📦 Mine ordrer</h1>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : orders.length === 0 ? (
        <p className="text-center">Ingen ordrer fundet.</p>
      ) : (
        orders.map((order) => (
          <Card key={order.id} className="mb-4">
            <Card.Body>
              <Card.Title>Ordre ID: {order.orderId}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Leveres senest: {order.deliveryDate}
              </Card.Subtitle>
              <Row>
                {order.items.map((item, i) => (
                  <Col key={i} md={4} className="mb-2">
                    <Card className="h-100">
                      <Card.Img
                        variant="top"
                        src={item.image}
                        alt={item.name}
                        style={{ height: "150px", objectFit: "cover" }}
                      />
                      <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text>Antal: {item.quantity}</Card.Text>
                        <Card.Text>{item.price * item.quantity} DKK</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
              <div className="mt-3 fw-bold">Total: {order.total} DKK</div>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
}
