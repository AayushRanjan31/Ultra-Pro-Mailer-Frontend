// src/App.jsx
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebaseConfig";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import { Spin } from "antd";

export default function App() {
  const [user, setUser] = useState(null);
  const [isAuthResolved, setIsAuthResolved] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u || null);
      setIsAuthResolved(true);
    });

    return () => unsub();
  }, []);

  const Loader = (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Spin size="large" tip="Checking authentication..." />
    </div>
  );

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="min-h-screen flex flex-col">
        {isAuthResolved && user && <Navbar user={user} />}

        <div>
          {!isAuthResolved ? (
            Loader
          ) : !user ? (
            <AuthPage onAuth={(u) => setUser(u)} />
          ) : (
            <HomePage user={user} />
          )}
        </div>

        {isAuthResolved && user && (
          <footer className="mt-12 text-center text-sm text-slate-500 border-t border-gray-200 py-4">
            <div className="text-center mt-2 text-gray-400 text-xs md:text-[12px]">
              Built with ♥ using React & Firebase — © {new Date().getFullYear()}{" "}
              <b className="text-gray-600">Aayush Ranjan</b>
            </div>
          </footer>
        )}
      </div>
    </>
  );
}
