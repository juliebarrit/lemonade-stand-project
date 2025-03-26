"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import { CartProvider } from "@/context/CartContext";
import React from "react";

export default function RootLayout({ children }) {
  return (
    <html lang="da">
      <body>
        <CartProvider>
          <React.StrictMode>{children}</React.StrictMode>
        </CartProvider>
      </body>
    </html>
  );
}
