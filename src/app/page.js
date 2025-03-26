"use client";

import HeroSection from "@/components/HeroSection"; // ✅ Import hero component
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import Link from "next/link";

export default function HomePage() {
  const trendingProducts = [
    {
      id: 1,
      name: "Classic Lemonade",
      price: 25,
      image: "https://images.unsplash.com/photo-1623084921164-4a8c5c37a912?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bGVtb25hZGV8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 2,
      name: "Strawberry Twist",
      price: 30,
      image: "https://images.unsplash.com/photo-1573500883698-e3ef47a95feb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3RyYXdiZXJyeSUyMGxlbW9uYWRlfGVufDB8fDB8fHww",
    },
    {
      id: 3,
      name: "Minty Fresh",
      price: 28,
      image: "https://images.unsplash.com/photo-1507281549113-040fcfef650e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWludCUyMGxlbW9uYWRlfGVufDB8fDB8fHww",
    },
    {
      id: 4,
      name: "Peachy Breeze",
      price: 32,
      image: "https://images.unsplash.com/photo-1616434963473-030c8f1ce663?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVhY2glMjBsZW1vbmFkZXxlbnwwfHwwfHx8MA%3D%3D",
    },
  ];

  return (
    <>
      <HeroSection />

      {/* Trending Products */}
      <Container className="mt-5">
        <h2 className="text-center mb-4">Trending Right Now</h2>
        <Row>
          {trendingProducts.map((product) => (
            <Col key={product.id} md={6} lg={3} className="mb-4">
              <Card className="shadow-sm h-100">
                <Card.Img
                  variant="top"
                  src={product.image}
                  alt={product.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body className="d-flex flex-column text-center">
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text className="text-success fw-semibold">
                    {product.price} DKK
                  </Card.Text>
                  <Link href="/products">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="mt-auto"
                    >
                      Buy now
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* CTA */}
      <div className="bg-light py-5 mt-4 text-center">
        <h3 className="mb-3">Thirsty for more?</h3>
        <Link href="/products">
          <Button variant="warning" size="lg">
            Explore all lemonades 🍹
          </Button>
        </Link>
      </div>
    </>
  );
}
