"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function NavigationBar() {
  const { cart } = useCart();
  const [isMounted, setIsMounted] = useState(false);
  const collapseRef = useRef(null);
  let collapseInstance = useRef(null);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && collapseRef.current) {
      import("bootstrap/js/dist/collapse").then(({ default: Collapse }) => {
        collapseInstance.current = new Collapse(collapseRef.current, { toggle: false });
      });
    }
  }, []);

  const collapseNavbar = () => {
    if (collapseInstance.current) {
      collapseInstance.current.hide();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" href="/" onClick={collapseNavbar}>
          🍋 Lemonade Stand
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav" ref={collapseRef}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" href="/" onClick={collapseNavbar}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/products" onClick={collapseNavbar}>
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/cart" onClick={collapseNavbar}>
                Cart 🛒 ({isMounted ? cart.length : "..."})
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
