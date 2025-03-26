// src/components/ClientOnlyBootstrap.js
"use client";
import { useEffect } from "react";

export default function ClientOnlyBootstrap() {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return null;
}
