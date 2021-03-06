import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";
import MetaData from "../layout/MetaData";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["#065749"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "In Stock       "],
    datasets: [
      {
        backgroundColor: ["#d53f3f", "#7cd583"],
        hoverBackgroundColor: ["#ad2626", "#60d66a"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Inventory Management</Typography>

        <div className="dashboardSummary">
          <div className = "summarybox">
            <p>
              Summary <br />
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Item Availability</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders Received</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Manage Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
          <hr></hr>
          <div>
            <p>
              Stock Status <br />
            </p>
          </div>
          <div className="doughnutChart">
            <Doughnut data={doughnutState} />
          </div>
          <hr></hr>

          <div>
            <p>
              Order Status <br />
            </p>
          </div>
          <img src={"https://i.ibb.co/3T7xTB4/Group-76-2.png"} alt={"Pie"} />
        </div>

        {/* <div className="lineChart">
          <Line data={lineState} />
        </div> */}

        {/* <div className="doughnutChart">
          <Doughnut data={doughnutState} />
          <img src={"https://i.ibb.co/H459Rf0/order-status.png"} alt={"Pie"} />
        </div> */}
        
      </div>
    </div>
  );
};

export default Dashboard;
