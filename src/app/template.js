// src/app/template.js
"use client";

import { CartProvider } from "@/context/CartContext";
import NavigationBar from "@/components/Navbar";
import ClientOnlyBootstrap from "@/components/ClientOnlyBootstrap";

export default function Template({ children }) {
  return (
    <CartProvider>
      <NavigationBar />
      <ClientOnlyBootstrap />
      <main>{children}</main>
    </CartProvider>
  );
}
