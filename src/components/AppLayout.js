// src/components/AppLayout.js
"use client";

import { CartProvider } from "@/context/CartContext";
import NavigationBar from "./Navbar";

export default function AppLayout({ children }) {
  return (
    <CartProvider>
      <NavigationBar />
      <main>{children}</main>
    </CartProvider>
  );
}
