import React from "react";
import UserLayout from "../../hoc/UserLayout";
import Button from "../utils/Button";
import HistoryBlock from "../utils/user/HistoryBlock";

const UserDashboard = ({ user }) => {
  const { name, lastname, email, history } = user.userData;
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
        {history && (
          <div className="user_nfo_panel">
            <h1>Purchase History</h1>
            <div className="user_product_block_wrapper">
              <HistoryBlock history={history} />
            </div>
          </div>
        )}
      </>
    </UserLayout>
  );
};

export default UserDashboard;
