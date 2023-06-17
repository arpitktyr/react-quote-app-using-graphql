import React from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_BY_ID } from "../graphql/queries";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import ErrorHOC from "./ErrorHOC";
export default function User() {
  const { userid } = useParams();
  const { loading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: { userid },
  });

  return (
    <div className="container my-container">
      {loading && <Loading />}
      {error && <ErrorHOC> {error.message} </ErrorHOC>}
      {!loading && (
        <>
          <div className="center-align">
            <img
              className="circle"
              style={{ border: "2px solid", marginTop: "10px" }}
              src={`https://robohash.org/${data.user.firstName}.png?size=150x150`}
              alt="pic"
            />
            <h5>
              {data.user.firstName} {data.user.lastName}
            </h5>
            <h6>Email - {data.user.email}</h6>
          </div>
          <h4 className="deep-purple-text">{data.user.firstName}'s quotes</h4>
          {data.user.quotes.map((quo: any) => {
            return (
              <blockquote key={quo.name}>
                <h6>{quo.name}</h6>
              </blockquote>
            );
          })}
        </>
      )}
    </div>
  );
}
