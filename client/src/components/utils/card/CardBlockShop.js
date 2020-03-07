import React from "react";
import Card from "../../utils/card/Card";

const CardBlockShop = ({ grid, list = [] }) => {
  const renderCards = cards =>
    cards && cards.map(card => <Card key={card._id} {...card} grid={grid} />);
  return (
    <div className="card_block_shop">
      {!list.length && <div className="no_result">Sorry no result</div>}
      {renderCards(list)}
    </div>
  );
};

export default CardBlockShop;
