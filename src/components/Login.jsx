import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../graphql/mutations";
import Loading from "./Loading";
import ErrorHOC from "./ErrorHOC";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER);

  if (data?.user?.token) {
    localStorage.setItem("token", data.user.token);

    setTimeout(() => {
      navigate("/");
    }, 2000);
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    loginUser({
      variables: {
        userSignIn: formData,
      },
    });
    //navigate("/");
  };
  return (
    <div className="container my-container">
      {loading && <Loading />}
      {error && <ErrorHOC>{error.message}</ErrorHOC>}
      {data?.user.token && (
        <div className="success green-text">Successfully LoggedIn.</div>
      )}

      <h5>Login!!</h5>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
          required
        />
        <Link to="/signup">
          <p>Dont have an account ?</p>
        </Link>
        <button
          className={loading ? "btn deep-purple disabled" : "btn deep-purple"}
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}
