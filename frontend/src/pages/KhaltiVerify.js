import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const KhaltiVerify = () => {
  const navigate = useNavigate();
  const [message,setMessage]=useState('')
  

  const verifyOrder = async (purchaseOrderId) => {
    const res = await fetch("http://localhost:8080/api/orders/payorder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id:purchaseOrderId
      }),
    });
    const result = await res.json();
    console.log(result.message)
      console.log( result.status);
    setTimeout(() => {
      navigate("/");
    }, 5000);
  };

  useEffect(() => {
    // Get the current URL
    const url = new URL(window.location.href);

    // Parse the query parameters
    const params = new URLSearchParams(url.search);

    // Get specific query parameters
    const pidx = params.get("pidx");
    const txnId = params.get("txnId");
    const amount = params.get("amount");
    const mobile = params.get("mobile");
    const purchaseOrderId = params.get("purchase_order_id");
    const purchaseOrderName = params.get("purchase_order_name");
    const transactionId = params.get("transaction_id");
    console.log(purchaseOrderId);
    verifyOrder(purchaseOrderId);
  }, []);
  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
};

export default KhaltiVerify;
