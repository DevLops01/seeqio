import React, { useState, useContext, useEffect } from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

function Stars({ rating }) {
  return (
    <>
      {/*If there is a rating show stars*/}
      {rating && rating > 0
        ? Array.from({ length: Math.floor(rating) }, (_, k) => (
            <span key={k} style={{ color: "gold" }}>
              {BsStarFill()}
            </span>
          ))
        : Array.from({ length: 5 }, (_, k) => (
            <span key={k} style={{ color: "gold" }}>
              {BsStar()}
            </span>
          ))}

      {rating && rating > 0 <= 5 && rating % 1 === 0 ? (
        Array.from({ length: 5 - Math.floor(rating) }, (_, k) => (
          <>
            <span key={k} style={{ color: "gold" }}>
              {BsStar()}
            </span>
          </>
        ))
      ) : (
        <></>
      )}

      {rating && rating % 1 !== 0 ? (
        <>
          <span style={{ color: "gold" }}>{BsStarHalf()}</span>
          {Array.from({ length: 5 - Math.floor(rating) - 1 }, (_, k) => (
            <>
              <span key={k} style={{ color: "gold" }}>
                {BsStar()}
              </span>
            </>
          ))}
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default Stars;
