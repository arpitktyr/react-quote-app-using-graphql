import React from "react";
import Loading from "./Loading";
import ErrorHOC from "./ErrorHOC";
import { useQuery } from "@apollo/client";
import { GET_MY_PROFILE } from "../graphql/queries";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_MY_PROFILE, {
    fetchPolicy: "no-cache",
  });
  console.log(data);
  if (!localStorage.getItem("token")) {
    navigate("/login");
    return <ErrorHOC>unauthorized</ErrorHOC>;
  }

  return (
    <div className="container my-container">
      {loading && <Loading />}
      {error && <ErrorHOC> {error.message} </ErrorHOC>}
      {!loading && data?.user && (
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
          <h4 className="deep-purple-text">Your quotes</h4>
          {data.user.quotes.map((quo: any) => {
            return (
              <blockquote key={quo.name}>
                <h6>{quo.name}</h6>
              </blockquote>
            );
          })}{" "}
        </>
      )}
    </div>
  );
}
