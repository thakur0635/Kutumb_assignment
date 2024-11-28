import React from "react";
import { BrowserRouter , Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Quote from "./pages/Quote";
import CreateQuote from "./pages/CreateQuote";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    return (
        <BrowserRouter>
             <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} pauseOnHover theme="colored" />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/quotes" element={<Quote />} />
                <Route path="/create-quote" element={<CreateQuote />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
