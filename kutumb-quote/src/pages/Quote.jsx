import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getQuotesList } from "../utils/api";

const QuotePage = () => {
  const [quotes, setQuotes] = useState([]);
  const [qoutesLeft, setQoutesLeft] = useState(true);
  const navigate = useNavigate();
  const [offset, setOffset] = useState(0);

  const fetchQuotes = async () => {
    if (!qoutesLeft) return;
    const token = localStorage.getItem("token"); // for API authentication
    const response = await getQuotesList(token, 10, offset);
    const newQuotes = response?.data;
    if (newQuotes.length === 0) setQoutesLeft(false);
    setQuotes((prev) => {
      //checking if same data it there then no need to re render
      const prevString = JSON.stringify(prev);
      const newString = JSON.stringify(newQuotes);
      if (prevString !== newString) {
        return [...prev, ...newQuotes];
      } else {
        return prev;
      }
    });
    setOffset((prev) => prev + 10);
  };

  useEffect(() => {
    fetchQuotes();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Quotes</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        { !quotes.length && <p>No Quotes Available. Click on the '+ Create' to create a new one</p> }
        {quotes.map((quote, index) => (
          <div key={index} className="relative bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative">
              <img
                src={quote.mediaUrl}
                alt="quote"
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <p className="text-white text-lg font-semibold text-center px-4">
                  {quote.text}
                </p>
              </div>
            </div>
            <div className="p-4">
              <p className="text-gray-600 text-sm">By: {quote.username}</p>
              <p className="text-gray-500 text-xs">Created At: {new Date(quote.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
      {qoutesLeft && quotes?.length !== 0 && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={fetchQuotes}
            className="bg-[#f9ae39] text-white py-2 px-4 rounded-lg hover:bg-[#d8902f]"
          >
            Load More
          </button>
        </div>
      )}
      <button
        onClick={() => navigate("/create-quote")}
        className="fixed bottom-6 right-6 bg-[#fa3f4a]  text-white p-4 rounded-full shadow-lg  hover:bg-[#d1363f]"
      >
        + Create
      </button>
    </div>
  );
};

export default QuotePage;
