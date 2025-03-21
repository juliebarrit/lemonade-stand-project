"use client";

import { useEffect, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

export default function ToastMessage({ show, message }) {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timeout = setTimeout(() => setVisible(false), 2500);
      return () => clearTimeout(timeout);
    }
  }, [show]);

  return (
    <ToastContainer position="bottom-end" className="p-3">
      <Toast show={visible} bg="success">
        <Toast.Header>
          <strong className="me-auto">Lemonade Stand</strong>
        </Toast.Header>
        <Toast.Body className="text-white">{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}
