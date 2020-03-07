import React from "react";
import Card from "./Card";

const CardBlock = ({ title, list }) => {
  const renderCards = list =>
    list && list.map((card, i) => <Card key={i} {...card} />);

  return (
    <div className="card_block">
      <div className="container">
        {title && <div className="title">{title}</div>}
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {renderCards(list)}
        </div>
      </div>
    </div>
  );
};

export default CardBlock;
