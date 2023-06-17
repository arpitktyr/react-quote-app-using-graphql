import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { SIGNUP_USER } from "../graphql/mutations";
import Loading from "./Loading";
import ErrorHOC from "./ErrorHOC";
export default function Signup() {
  const [signupUser, { data, error, loading }] = useMutation(SIGNUP_USER);
  const [formData, setFormData] = useState({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(formData);
    signupUser({
      variables: {
        userNew: formData,
      },
    });
  };

  return (
    <div className="container my-container">
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorHOC>{error.message}</ErrorHOC>
      ) : (
        data?.user && (
          <div className="success green-text">
            {data.user.firstName} is Signedup. You can login now.
          </div>
        )
      )}
      <h5>Signup!!</h5>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          onChange={handleChange}
          required
          aria-label="First Name"
        />
        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          onChange={handleChange}
          aria-label="Last Name"
          required
        />
        <input
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
          aria-label="Email"
          required
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
          aria-label="Password"
          required
        />
        <Link to="/login">
          <p>Already have an account ?</p>
        </Link>

        <button
          className={loading ? "btn deep-purple disabled" : "btn deep-purple"}
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
