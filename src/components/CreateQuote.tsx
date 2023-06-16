import React, { useState } from "react";
import { CREATE_QUOTE } from "../graphql/mutations";
import { GET_ALL_QUOTES } from "../graphql/queries";
import { useMutation } from "@apollo/client";
import Loading from "./Loading";
import ErrorHOC from "./ErrorHOC";
import { useNavigate } from "react-router-dom";

export default function CreateQuote() {
  const navigate = useNavigate();
  const [createQuote, { error, loading, data }] = useMutation(CREATE_QUOTE, {
    refetchQueries: ["getAllQuotes", "getMyProfile"],
  });

  const [quote, setQuote] = useState("");
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(quote);
    createQuote({
      variables: {
        quote,
      },
    });
  };

  if (!localStorage.getItem("token")) {
    navigate("/login");
    return <ErrorHOC>unauthorized</ErrorHOC>;
  }

  return (
    <div className="container my-container">
      {loading && <Loading />}
      {error && <ErrorHOC>{error.message}</ErrorHOC>}
      {data?.quote && <div className="success green-text">{data.quote}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          placeholder="write your quote here"
        />
        <button
          className={loading ? "btn deep-purple disabled" : "btn deep-purple"}
        >
          create
        </button>
      </form>
    </div>
  );
}
