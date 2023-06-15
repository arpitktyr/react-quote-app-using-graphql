import React, { useState } from "react";

export default function CreateQuote() {
  const [quote, setQuote] = useState("");
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(quote);
  };
  return (
    <div className="container my-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          placeholder="write your quote here"
        />
        <button className="btn deep-purple">create</button>
      </form>
    </div>
  );
}
