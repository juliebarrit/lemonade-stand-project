import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore"; // Opdateret import

export default function Admin() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", image: "", description: "" });

  const ADMIN_PASSWORD = "1234"; // 🔐 Skift denne til en sikker kode!

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert("Forkert adgangskode!");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      async function fetchProducts() {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productList);
      }
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

    await addDoc(collection(db, "products"), newProduct);
    alert("Produkt tilføjet!");
    setNewProduct({ name: "", price: "", image: "", description: "" });
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      {!isAuthenticated ? (
        <div>
          <h2>Admin Login</h2>
          <input
            type="password"
            placeholder="Indtast adgangskode"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Log ind</button>
        </div>
      ) : (
        <div>
          <h2>Tilføj nyt produkt</h2>
          <form onSubmit={addProduct}>
            <input type="text" name="name" placeholder="Produktnavn" value={newProduct.name} onChange={handleChange} required />
            <input type="number" name="price" placeholder="Pris (DKK)" value={newProduct.price} onChange={handleChange} required />
            <input type="text" name="image" placeholder="Billede URL" value={newProduct.image} onChange={handleChange} required />
            <textarea name="description" placeholder="Beskrivelse" value={newProduct.description} onChange={handleChange} required />
            <button type="submit">Tilføj produkt</button>
          </form>

          <h2>Eksisterende produkter</h2>
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                <img src={product.image} alt={product.name} width="50" />
                <p>{product.name} - {product.price} DKK</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
