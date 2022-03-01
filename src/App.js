import React from "react";
import "./App.css";
import Header from "./header";
import Member from "./pages/member";
import Paket from "./pages/paket";
import User from "./pages/user";
import Login from "./pages/login";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

export default function App(){
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/member">Member</Link>
          </li>
          <li>
            <Link to="/paket">Paket</Link>
          </li>
          <li>
            <Link to="/user">User</Link>
          </li>
        </ul>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/member" element={<Member />} />
          <Route path="/paket" element={<Paket />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </div>
    </Router>
  );
} 

function Home() {
  return <h2>Home</h2>;
}