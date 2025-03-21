"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function NavigationBar() {
  const { cart } = useCart();
  const [cartChanged, setCartChanged] = useState(false);
  const prevCartCount = useRef(cart.length);

  // Lukker navbaren efter klik
  const collapseNavbar = () => {
    const navbarCollapse = document.getElementById("navbarNav");
    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
    if (bsCollapse) bsCollapse.hide();
  };

  // Visuel effekt når noget tilføjes til kurv
  useEffect(() => {
    if (cart.length > prevCartCount.current) {
      setCartChanged(true);
      setTimeout(() => setCartChanged(false), 700);
    }
    prevCartCount.current = cart.length;
  }, [cart]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" href="/">🍋 Lemonade Stand</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" href="/" onClick={collapseNavbar}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/products" onClick={collapseNavbar}>Products</Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link position-relative ${cartChanged ? "text-success fw-bold" : ""}`}
                href="/cart"
                onClick={collapseNavbar}
              >
                🛒 Cart
                <span className="badge bg-primary ms-1">{cart.length}</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
