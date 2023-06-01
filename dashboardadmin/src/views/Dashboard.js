
import React, { useState, useEffect} from "react";

import { useDispatch, useSelector } from "react-redux";
// import { Button } from "reactstrap";
import { allUser, sortUser } from "../redux/actions";
// import OutletCard from "./OutletCard";
import Usuario from "./Usuario";

function Dashboard() {
  const [ordered, setOrdered] = useState("")
  // const [selectedProduct, setSelectedProduct] = useState(null);
  // const [showOutletCard, setShowOutletCard] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userData)
 
 
  useEffect(() => {
    dispatch(allUser())
  
   }, [dispatch])

const handleChange = (value) => {
  setOrdered(value);
  dispatch(sortUser(value));
};


// const handleProductEdit = (product) => {
//   setSelectedProduct(product);
//   setShowOutletCard(true);
// };
//**********************para manejar el boton del formualario ****** */
// const handleOutletClose = () => {
//   setSelectedProduct(null);
//   setShowOutletCard(false);
// };

// const handleEditButtonClick = () => {
//     setShowOutletCard(true);
//   };
return (
  <>
    <div className="content">
       {/* <Button
            className="btn-round"
            color="info"
            size="sm"
            onClick={handleEditButtonClick}
          >
             Editar Producto
          </Button>
          {showOutletCard && (
  <OutletCard  />
)} */}
      <Usuario userData={userData} ordered={ordered} handleChange={handleChange} />
    </div>
  </>
);
}

export default Dashboard;
