import React from "react";
import { BrowserRouter , Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Quote from "./pages/Quote";
import CreateQuote from "./pages/CreateQuote";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/quotes" element={<Quote />} />
                <Route path="/create-quote" element={<CreateQuote />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
