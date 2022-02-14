import React, { Fragment, useRef } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import "./ConfirmOrder.css";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import ReactToPrint from "react-to-print";
import PrintIcon from "@mui/icons-material/Print";
import { addItemsToCart } from "../../actions/cartAction";
import store from "../../store.js";

const ConfirmOrder = ({ history }) => {
  const dispatch = useDispatch();
  const { shippingInfo, cartItems } = useSelector((state) =>state.cart);
  const { user } = useSelector((state) => state.user);

  const componentRef = useRef();

  // const subtotal = cartItems.reduce(
  //   (acc, item) => acc + item.quantity * item.price,
  //   0
  // );
  const cartItemss = useSelector(() => store.getState().cart.cartItems)

  const subtotal = 0;

  const shippingCharges = 0;

  const tax = subtotal * 0;

  const totalPrice = 0;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  
  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
      cartItemss
    };
    console.log("cartItems updated",cartItemss);
    localStorage.setItem("cartItemss",cartItemss);
    //const username = useSelector(() => getState().cart.cartItems)
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
   
    history.push("/process/payment");
  };

  return (
    <Fragment>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage" ref={componentRef}>
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>User Placed Order:</p>
                <span>{user.name}</span>
                <hr></hr>
                <span>&nbsp;</span>
                <p>Designation:</p>
                <span>{shippingInfo.userLoggedInDesignation}</span>
              </div>              
              <div>
                <p>Deliver To Student Id:</p>
                <span>{shippingInfo.receivingPersonName}</span>
              </div>
              <div>
                <p>Order Date:</p>
                <span>{shippingInfo.orderDate}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div className="cartitemholder" key={item.product}>
                    <div className="cartitemholderimage">
                      <img src={item.image} alt="Product" />
                    </div>
                    <div className="cartitemholdername">
                     <span>{item.name}</span>
                    </div>
                    <div className="cartitemholdercat">
                      <span>Subcategory({item.SubCategory})</span>
                    </div>
                    <div className="cartitemholdersize">
                      <span>Size({item.ProductSize})</span>
                    </div>
                    <div className="cartitemholderquantity">
                      <span>
                        Quantity({item.quantity})
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="printComponent">
            <ReactToPrint
              trigger={() => <PrintIcon className="PrintIcon" />}
              content={() => componentRef.current}
            />{" "}
            <p>
              <span>Print</span>
            </p>
          </div>
        </div>

        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Order Summery</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>${subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>${shippingCharges}</span>
              </div>
              <div>
                <p>Tax:</p>
                <span>${tax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>${totalPrice}</span>
            </div>

            <button onClick={proceedToPayment}>Confirm Order</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
