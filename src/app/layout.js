"use client"; // Markér layout som en Client Component

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Bootstrap JS
import "@/styles/globals.css";
import NavigationBar from "@/components/Navbar";
import { CartProvider } from "@/context/CartContext"; // ✅ Importér CartProvider

export default function RootLayout({ children }) {
  return (
    <html lang="da">
      <body>
        <CartProvider> {/* ✅ Wrap hele appen */}
          <NavigationBar />
          <main className="container mt-4">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
