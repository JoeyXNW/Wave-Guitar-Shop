import React, { Component } from "react";
import UserLayout from "../../hoc/UserLayout";
import Button from "../utils/Button";

const UserDashboard = ({ user }) => {
  const { name, lastname, email } = user.userData;
  return (
    <UserLayout>
      <>
        <div className="user_nfo_panel">
          <h1>User Information</h1>
          <>
            <span>{name}</span>
            <span>{lastname}</span>
            <span>{email}</span>
          </>
          <Button
            type="default"
            linkTo="/user/user_profile"
            title="Edit Information"
          />
        </div>
        <div className="user_nfo_panel">
          <h1>Purchase History</h1>
          <div className="user_product_block_wrapper">History</div>
        </div>
      </>
    </UserLayout>
  );
};

export default UserDashboard;
