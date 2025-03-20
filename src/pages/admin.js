import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

export default function Admin() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", image: "", description: "" });

  const ADMIN_PASSWORD = "1234"; // 🔐 Skift til en sikker kode!

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      {!isAuthenticated ? (
        // 🔹 Admin Login UI
        <div className="bg-white p-8 rounded-lg shadow-md max-w-sm text-center">
          <h2 className="text-2xl font-semibold mb-4">Admin Login</h2>
          <input
            type="password"
            placeholder="Indtast adgangskode"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Log ind
          </button>
        </div>
      ) : (
        <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
          {/* 🔹 Produkt Tilføjelse */}
          <h2 className="text-2xl font-semibold mb-4">Tilføj nyt produkt</h2>
          <form onSubmit={addProduct} className="grid grid-cols-1 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Produktnavn"
              value={newProduct.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Pris (DKK)"
              value={newProduct.price}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="text"
              name="image"
              placeholder="Billede URL"
              value={newProduct.image}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <textarea
              name="description"
              placeholder="Beskrivelse"
              value={newProduct.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Tilføj produkt
            </button>
          </form>

          {/* 🔹 Eksisterende Produkter */}
          <h2 className="text-2xl font-semibold mt-6">Eksisterende produkter</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product.id}
                  className="bg-gray-50 p-4 rounded-lg shadow-md flex flex-col items-center text-center"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <h3 className="font-semibold mt-2">{product.name}</h3>
                  <p className="text-gray-600">{product.price} DKK</p>
                  <p className="text-gray-500 text-sm">{product.description}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Ingen produkter tilføjet endnu.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
