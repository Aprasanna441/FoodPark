import React, { useEffect, useState } from "react";
import { useCart } from "../Features/ContextReducer";
import { useTheme } from "../Features/ThemeReducer";

const MyCart = () => {
  const { state, dispatch } = useCart();
  const { theme, changeTheme } = useTheme();
  const lo = localStorage.getItem("cartitem");
  const data = JSON.parse(lo);

  const totalPrice = () => {
    let sum = 0;
    data.forEach((element) => {
      sum += element.price;
    });

    return sum;
  };

  return (
    <div className={theme === "dark" ? " bg-dark" : ""}>
      <h1>MY CART</h1>
      {localStorage.getItem("cartitem") ? (
        <>
          <table className={theme === "dark" ? "table table-dark" : "table"}>
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Type</th>
                <th scope="col">Qty</th>
                <th scope="col">Rate</th>
                <th scope="col">Price</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((i, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{i.name}</td>
                  <td>{i.option}</td>
                  <td>{i.quantity}</td>
                  <td>{i.rate}</td>
                  <td>{i.price}</td>
                  <td className="d-flex justify justify-content-around">
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() =>
                        dispatch({
                          type: "DECREASE",
                          index: index,
                          payload: {
                            name: i.name,
                            option: i.option,
                            rate: i.rate,
                            quantity:
                              i.quantity === 0.5
                                ? i.quantity
                                : i.quantity-0.5,
                            price:i.quantity === 0.5?i.price: i.price * (i.quantity - 0.5),
                          },
                        })
                      }
                    >
                      -
                    </button>
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => dispatch({ type: "REMOVE", index: index })}
                    >
                      X
                    </button>
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() =>
                        dispatch({
                          type: "INCREASE",
                          index: index,
                          payload: {
                            name: i.name,
                            option: i.option,
                            rate: i.rate,
                            quantity: i.quantity + 0.5,
                            price: i.price * (i.quantity + 0.5),
                          },
                        })
                      }
                    >
                      +
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ float: "right", marginRight: 40, fontWeight: "bolder" }}>
            {" "}
            <span style={{ color: "green" }}>GRAND TOTAL:</span> Rs.
            {totalPrice()}{" "}
          </p>
        </>
      ) : (
        <h1>YOUR CART IS EMPTY</h1>
      )}
      <button
        className="btn btn-primary"
        onClick={() => console.log("order placed")}
      >
        CHECK OUT
      </button>
    </div>
  );
};

export default MyCart;
