"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, doc, updateDoc } from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form, Button, Table, Spinner } from "react-bootstrap";

export default function Admin() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
  });
  const [editingProductId, setEditingProductId] = useState(null);

  const ADMIN_PASSWORD = "1234";

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert("Forkert adgangskode!");
    }
  };

  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const productList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProducts(productList);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated]);

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const addProduct = async (e) => {
    e.preventDefault();

    if (!newProduct.name || !newProduct.price || !newProduct.image || !newProduct.description) {
      alert("Udfyld alle felter!");
      return;
    }

    if (editingProductId) {
      // 🔄 Opdater eksisterende produkt
      const productRef = doc(db, "products", editingProductId);
      await updateDoc(productRef, newProduct);
      alert("Produkt opdateret!");
    } else {
      // ➕ Tilføj nyt produkt
      await addDoc(collection(db, "products"), newProduct);
      alert("Produkt tilføjet!");
    }

    setNewProduct({ name: "", price: "", image: "", description: "" });
    setEditingProductId(null);
    fetchProducts();
  };

  const handleEdit = (product) => {
    setNewProduct({
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
    });
    setEditingProductId(product.id);
  };

  return (
    <Container className="mt-5">
      {!isAuthenticated ? (
        <div className="text-center">
          <h2>Admin Login</h2>
          <Form.Control
            type="password"
            placeholder="Indtast adgangskode"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-3"
          />
          <Button onClick={handleLogin}>Log ind</Button>
        </div>
      ) : (
        <div>
          <h2 className="text-center">
            {editingProductId ? "Rediger produkt" : "Tilføj nyt produkt"}
          </h2>
          <Form onSubmit={addProduct} className="mb-4">
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="name"
                placeholder="Produktnavn"
                value={newProduct.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="number"
                name="price"
                placeholder="Pris (DKK)"
                value={newProduct.price}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="image"
                placeholder="Billede URL"
                value={newProduct.image}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                name="description"
                placeholder="Beskrivelse"
                value={newProduct.description}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button type="submit">
              {editingProductId ? "Opdater produkt" : "Tilføj produkt"}
            </Button>{" "}
            {editingProductId && (
              <Button
                variant="secondary"
                onClick={() => {
                  setNewProduct({ name: "", price: "", image: "", description: "" });
                  setEditingProductId(null);
                }}
              >
                Annuller
              </Button>
            )}
          </Form>

          <h2 className="text-center">Eksisterende produkter</h2>
          {products.length === 0 ? (
            <div className="text-center">
              <Spinner animation="border" />
              <p>Indlæser produkter...</p>
            </div>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Billede</th>
                  <th>Navn</th>
                  <th>Pris</th>
                  <th>Beskrivelse</th>
                  <th>Handling</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <img src={product.image} alt={product.name} width="50" />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.price} DKK</td>
                    <td>{product.description}</td>
                    <td>
                      <Button variant="warning" size="sm" onClick={() => handleEdit(product)}>
                        Rediger
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      )}
    </Container>
  );
}
