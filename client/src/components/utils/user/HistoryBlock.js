import React from "react";
import moment from "moment"; // parse date

const HistoryBlock = ({ history }) => {
  const renderBlocks = () => {
    console.log(history);
    if (history) {
      return history.map((product, i) => (
        <tr key={i}>
          <td>{moment(product.dataOfPurchase).format("MM-DD-YYYY")}</td>
          <td>
            {product.brand} {product.name}
          </td>
          <td>${product.price}</td>
          <td>{product.quantity}</td>
        </tr>
      ));
    }
  };

  return (
    <div className="history_blocks">
      <table>
        <thead>
          <tr>
            <th>Data of Purchase</th>
            <th>Product</th>
            <th>Total price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>{renderBlocks()}</tbody>
      </table>
    </div>
  );
};

export default HistoryBlock;
