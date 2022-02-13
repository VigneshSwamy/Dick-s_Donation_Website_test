import React, { Fragment, useEffect } from "react";
// import { DataGrid } from "@material-ui/data-grid";
import { DataGrid } from '@mui/x-data-grid';
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminProduct,
  deleteProduct,
} from "../../actions/productAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";


const ProductList = ({ history }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, products } = useSelector((state) => state.products);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {

    
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Product Deleted Successfully");
      history.push("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());
    
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  const columns = [
    { field: "id", headerName: "SKU ID", Width:100, flex: 0.2 },

    {
      field: "name",
      cssClass: "custom",  
      headerName: "Name",
      minWidth: 50,
      flex: 0.1,
    },
    {
      field: "category",
      headerName: "Category",
      minWidth: 70,
      flex: 0.15,
    },
    {
      field: "subcategory",
      headerName: "SubCategory",
      minWidth: 70,
      flex: 0.15,
    },
    {
      field: "size",
      headerName: "Size",
      minWidth: 50,
      flex: 0.1,
    },
    {
      field: "stock",
      headerName: "Stock",     
      minWidth: 50,
      flex: 0.1,
      cellClassName: (params) => {
        
          if(params.getValue(params.id, "stock")> 55){
            return "greenColor";
          }
          else if((params.getValue(params.id, "stock"))<55 && (params.getValue(params.id, "stock"))>0){
            return "yellowColor";
          }
          else if((params.getValue(params.id, "stock"))===0){
            return "redColor";
          }
      },
    },
    {
      field: "actions",     
      headerName: "Actions",
      minWidth: 50,
      flex: 0.1,         
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
        size:item.Size,
        category:item.category,
        subcategory:item.SubCategory
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL Items Available - Admin`} />

      <div className="dashboard">
        <SideBar />
        <img src={"https://i.ibb.co/6Zv0kF9/bar.png"} alt={"Bar"} />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL ITEMS </h1>
         

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"           
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ProductList;
