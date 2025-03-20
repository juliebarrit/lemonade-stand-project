import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Products() {
  const [products, setProducts] = useState([]);

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
      }
    }
    fetchProducts();
  }, []);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Vores Lemonade Produkter</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginTop: "20px" }}>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "5px" }}>
              <img src={product.image} alt={product.name} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
              <h3>{product.name}</h3>
              <p><strong>Pris:</strong> {product.price} DKK</p>
              <p>{product.description}</p>
            </div>
          ))
        ) : (
          <p>Indlæser produkter...</p>
        )}
      </div>
    </div>
  );
}
