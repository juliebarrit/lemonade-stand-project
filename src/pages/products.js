"use client"; // 🌟 Sikrer, at komponenten kun kører på klienten
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <Container className="mt-5">
      <h1 className="text-center text-primary fw-bold">
        Vores Lemonade Produkter 🍋
      </h1>
      <p className="text-center text-muted">
        Oplev vores friske udvalg af lækre lemonader!
      </p>

      {loading ? (
        <div className="d-flex justify-content-center mt-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Row className="mt-4">
          {products.length > 0 ? (
            products.map((product) => (
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
                    <Card.Title className="fw-bold text-dark">
                      {product.name}
                    </Card.Title>
                    <Card.Text className="text-success fs-5 fw-semibold">
                      {product.price} DKK
                    </Card.Text>
                    <Card.Text className="text-muted">{product.description}</Card.Text>
                    <button className="btn btn-primary mt-auto">Køb nu</button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col className="text-center mt-5">
              <p className="text-danger">Ingen produkter tilgængelige.</p>
            </Col>
          )}
        </Row>
      )}
    </Container>
  );
}
