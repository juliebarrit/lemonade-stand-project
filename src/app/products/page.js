"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useCart } from "@/context/CartContext";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Button,
  ToastContainer,
  Toast,
} from "react-bootstrap";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productList);
      } catch (error) {
        console.error("Fejl ved hentning af produkter:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    setToastText(`${product.name} er tilføjet til kurven`);
    setShowToast(true);
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center text-primary fw-bold">Our lemonade products</h1>
      <p className="text-center text-muted">Wanting something sweet, sour or to try something new? We've got you!</p>

      {loading ? (
        <div className="d-flex justify-content-center mt-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Row className="mt-4">
          {products.map((product) => (
            <Col key={product.id} md={6} lg={4} className="mb-4">
              <Card className="shadow-lg border-0 rounded-3 h-100">
                <Card.Img
                  variant="top"
                  src={product.image}
                  alt={product.name}
                  className="img-fluid rounded-top"
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <Card.Body className="text-center d-flex flex-column">
                  <Card.Title className="fw-bold text-dark">{product.name}</Card.Title>
                  <Card.Text className="text-success fs-5 fw-semibold">{product.price} DKK</Card.Text>
                  <Card.Text className="text-muted">{product.description}</Card.Text>
                  <Button
                    variant="primary"
                    className="mt-auto"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* 🌟 Toast placeret i midten af viewporten */}
      <ToastContainer
        className="position-fixed top-50 start-50 translate-middle p-3"
        style={{ zIndex: 1060 }}
      >
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={2000}
          autohide
          bg="success"
        >
          <Toast.Header closeButton={false}>
            <strong className="me-auto">🛒 Tilføjet</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{toastText}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
}
