"use client";
import React from "react";
import { useSelector } from "react-redux";

export default function CartCount() {
  const cartItems = useSelector((store) => store.cart);
  
  const [cartLength, setCartLength] = React.useState(0);
  const [cartQty, setCartQty] = React.useState(0);

  React.useEffect(() => {
    setCartLength(cartItems?.length || 0);
  }, [cartItems]);

  React.useEffect(() => {
    const totalQty = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    setCartQty(totalQty);
  }, [cartItems, cartItems.map((item) => item.quantity)]);

  if (cartLength > 0) return <span>{cartLength}</span>;

  return <span>0</span>;
}
