import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_QUOTES } from "../graphql/queries";

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
        <div className="progress" aria-label="Loading">
          <div className="indeterminate"></div>
        </div>
      ) : error ? (
        `<span className="red-text error">${error.message}</span>`
      ) : (
        data.quotes.map((quote: any) => {
          return (
            <blockquote>
              <h6>{quote.name}</h6>
              <p className="right-align">~{quote.by.firstName}</p>
            </blockquote>
          );
        })
      )}
      {!data.quotes.length && (
        <span className="red-text error">No Quotes Found.</span>
      )}
    </div>
  );
}
