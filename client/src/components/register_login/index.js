import React from "react";
import Button from "../../components/utils/Button";
import Login from "./Login";

const RegisterLogin = () => {
  return (
    <div className="page_wrapper">
      <div className="container">
        <div className="register_login_container">
          <div className="left">
            <h1>New Customers</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Accusantium reiciendis, cupiditate autem exercitationem animi
              eius, odio vero quibusdam, aliquam optio asperiores quae delectus
              quia. Assumenda libero molestias nemo! Doloremque, sit.
            </p>
            <Button
              type="default"
              title="Create an accout"
              linkTo="./register"
              addStyle={{ margin: "10px 0 0 0" }}
            />
          </div>
          <div className="right">
            <h2>Registered customers</h2>
            <p>Please log in if you have an account</p>
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterLogin;
