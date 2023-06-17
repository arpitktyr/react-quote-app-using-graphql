//import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_QUOTES } from "../graphql/queries";
import ErrorHOC from "./ErrorHOC";
import Loading from "./Loading";
import { Link } from "react-router-dom";

export default function Home() {
  const { loading, data, error } = useQuery(GET_ALL_QUOTES);

  // Use Apollo Client for API as it has some performance and easy to use benefits

  // You can also use the fetch for graphQl API request
  // useEffect(() => {
  //   fetch(`https://graphql-api-server.onrender.com`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       query: `
  //   query getAllQuotes{
  //     quotes{
  //       name
  //       by{
  //         _id
  //         firstName
  //       }
  //     }
  //   }
  //   `,
  //       variables: {},
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //     });
  // }, []);

  return (
    <div className="container">
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorHOC>{error.message}</ErrorHOC>
      ) : (
        data?.quotes?.map((quote: any) => {
          return (
            <blockquote key={quote.name}>
              <p>{quote.name}</p>
              <Link to={`/user/${quote.by._id}`}>
                <div className="right-align author-name">
                  ~{quote.by.firstName}
                </div>
              </Link>
            </blockquote>
          );
        })
      )}
      {!loading && !error && !data?.quotes?.length && (
        <ErrorHOC>No Quotes Found.</ErrorHOC>
      )}
    </div>
  );
}
