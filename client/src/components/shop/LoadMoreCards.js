import React from "react";
import CardBlockShop from "../utils/card/CardBlockShop";

const LoadMoreCards = ({ grid, list, limit, size, loadMore }) => {
  return (
    <>
      <CardBlockShop grid={grid} list={list} />
      {size >= limit && (
        <div className="load_more_container">
          <span onClick={loadMore}>Load more</span>
        </div>
      )}
    </>
  );
};

export default LoadMoreCards;
