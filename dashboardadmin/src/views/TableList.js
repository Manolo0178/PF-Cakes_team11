// import React, {useEffect, useState} from "react";
// // import { useParams } from "react-router-dom";
// import {  useSelector, useDispatch } from "react-redux";
// import { cartProducts, shopsCart} from "../redux/actions.js";
// import { format } from 'date-fns';
// // import Order from "./Order.jsx";
// // reactstrap components
// // reactstrap components
// import {Button,ButtonGroup,Card,CardHeader,CardBody,CardTitle,Table,Row,Col,} from "reactstrap";
// import {
//   chartExample1,
//   chartExample2,//precio total
//   chartExample3,
//   chartExample4,
// } from "../variables/charts.js";
// import classNames from "classnames";
// import { Line, Bar } from "react-chartjs-2"
// import OutletCard from "./OutletCard.jsx";

// function Tables() {
//   const [totalPrice, setTotalPrice] = useState([chartExample3.data]);
//   const [totalUnit, setTotalUnit] = useState([chartExample2.data]);
//   const [chartLabel, setChartLabel] = useState(chartExample2.label);
//   const [bigChartData, setBigChartData] = useState("data1");
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [showOutletCard, setShowOutletCard] = useState(false);
  
//   const dispatch = useDispatch();
//   const cartProduct = useSelector(state => state.cartProduct);
//   const shopsItem = useSelector(state => state.shopsItem);

//   const setBgChartData = (value) => {
//     setBigChartData(value);
//   };
// ///*************para editar un roducto al hace rclick en el producto que se muestra */
//   const handleProductEdit = (product) => {
//     setSelectedProduct(product);
//     setShowOutletCard(true);
//   };
// //**********************para manejar el boton del formualario ****** */
//   const handleOutletClose = () => {
//     setSelectedProduct(null);
//     setShowOutletCard(false);
//   };


//   // const handleEditButtonClick = () => {
//   //   setShowOutletCard(true);
//   // };
// //******************************* ****** */


//   // useEffect(() => {
//   //   const foundProduct = cartProduct?.find(cart => cart.createdAt);
//   //   if (foundProduct) {
//   //     const createAtDate = new Date(foundProduct.createdAt);
//   //     const formattedDate = format(createAtDate, "yyyy-MM-dd HH:mm:ss");
//   //     setChartLabel(formattedDate);
//   //   }
//   // }, [cartProduct]);

//   useEffect(() => {
//     const foundProduct = shopsItem?.find(shops => shops.createdAt);
//     if (foundProduct) {
//       const createAtDate = new Date(foundProduct.createdAt);
//       const formattedDate = format(createAtDate, "yyyy-MM-dd HH:mm:ss");
//       setChartLabel(formattedDate);
//     }
//   }, [shopsItem]);

//   useEffect(() => {
//     dispatch(cartProducts());
//   }, [dispatch]);

//   useEffect(() => {
//     const totalPrice = shopsItem.reduce(
//       (total, shops) =>
//         total + shops.price * shops.cantidad, 0)
     
//     setTotalPrice(totalPrice);

//     const totalUnit = shopsItem.reduce(
//       (total, shops) =>
//         total + shops.cantidad,0)
        
//     setTotalUnit(totalUnit);
//   }, [shopsItem]);
//   useEffect(() => {
//     dispatch(shopsCart())
//   }, [dispatch])

//   return (
//     <>
//       <div className="content">
//         <Row>
//           <Col xs="12">
//             <Card className="card-chart">
//               <CardHeader>
//                 <Row>
              
//                   <Col className="text-left" sm="6">
//                     <h5 className="card-category">Total Shipments</h5>
//                     <CardTitle tag="h2">Performance</CardTitle>
//                   </Col>
//                   <Col sm="6">
//                     <ButtonGroup className="btn-group-toggle float-right" data-toggle="buttons">
//                     {/* <Button
//             className="btn-round"
//             color="info"
//             size="sm"
//             onClick={handleEditButtonClick}
//           >
//              Editar Producto
//           </Button> */}
//                       <Button
//                         tag="label"
//                         className={classNames("btn-simple", { active: bigChartData === "data1" })}
//                         color="info"
//                         id="0"
//                         size="sm"
//                         onClick={() => setBgChartData("data1")}
//                       >
//                         <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
//                           Accounts
//                         </span>
//                         <span className="d-block d-sm-none">
//                           <i className="tim-icons icon-single-02" />
//                         </span>
//                       </Button>
//                       <Button
//                         color="info"
//                         id="1"
//                         size="sm"
//                         tag="label"
//                         className={classNames("btn-simple", { active: bigChartData === "data2" })}
//                         onClick={() => setBgChartData("data2")}
//                       >
//                         <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
//                           Purchases
//                         </span>
//                         <span className="d-block d-sm-none">
//                           <i className="tim-icons icon-gift-2" />
//                         </span>
//                       </Button>
//                       <Button
//                         color="info"
//                         id="2"
//                         size="sm"
//                         tag="label"
//                         className={classNames("btn-simple", { active: bigChartData === "data3" })}
//                         onClick={() => setBgChartData("data3")}
//                       >
//                         <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
//                           Sessions
//                         </span>
//                         <span className="d-block d-sm-none">
//                           <i className="tim-icons icon-tap-02" />
//                         </span>
//                       </Button>
//                     </ButtonGroup>
//                   </Col>
//                 </Row>
//               </CardHeader>
//               <CardBody>
//                 <div className="chart-area">
//                   <Line data={chartExample1[bigChartData]} options={chartExample1.options} />
//                 </div>
//               </CardBody>
//             </Card>
//           </Col>
//         </Row>
//         <Row>
//           <Col lg="4">
//             <Card className="card-chart">
//               <CardHeader>
//                 <h5 className="card-category">Total Shipments</h5>
//                 <CardTitle tag="h3">
//                   <i className="tim-icons icon-bell-55 text-info" />{totalUnit}
//                 </CardTitle>
//               </CardHeader>
//               <CardBody>
//                 <div className="chart-area">
//                   <Line data={chartExample2.data} options={chartExample2.options} label={chartLabel} />
//                 </div>
//               </CardBody>
//             </Card>
//           </Col>
//           <Col lg="4">
//             <Card className="card-chart">
//               <CardHeader>
//                 <h5 className="card-category">Daily Sales</h5>
//                 <CardTitle tag="h3">
//                   <i className="tim-icons icon-delivery-fast text-primary" />{totalPrice}
//                 </CardTitle>
//               </CardHeader>
//               <CardBody>
//                 <div className="chart-area">
//                   <Bar data={chartExample3.data} options={chartExample3.options} />
//                 </div>
//               </CardBody>
//             </Card>
//           </Col>
//           <Col lg="4">
//             <Card className="card-chart">
//               <CardHeader>
//                 <h5 className="card-category">Completed Tasks</h5>
//                 <CardTitle tag="h3">
//                   <i className="tim-icons icon-send text-success" /> 12,100K
//                 </CardTitle>
//               </CardHeader>
//               <CardBody>
//                 <div className="chart-area">
//                   <Line data={chartExample4.data} options={chartExample4.options} />
//                 </div>
//               </CardBody>
//             </Card>
//           </Col>
//         </Row>
//         <Row>
//           <Col md="12">
//             <Card>
//               <CardHeader>
//                 <CardTitle tag="h4">Ingreso de un Producto al Carrito</CardTitle>
//         {showOutletCard && (
//   <OutletCard product={selectedProduct} onClose={handleOutletClose} />
// )}
//               </CardHeader>
//               <CardBody>
//                 <Table className="tablesorter" responsive>
//                   <thead className="text-primary">
//                     <tr>
//                       <th>Usuario</th>
//                       <th >Nombre</th>
//                       <th >Fecha de ingreso al carrito</th>
//                       <th >Producto</th>
//                       <th>Cantidad</th>
//                       <th>Imagen</th>
//                       {/* <th className="text-center">Precio</th> */}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {cartProduct?.map(cart => (
//                       <tr key={cart.id}>
//                         <td><h6>{cart.userId}</h6></td>
//                         <td ><h6>{cart.user.name}</h6></td>
//                         <td ><h6>{format(new Date(cart.createdAt), "yyyy-MM-dd HH:mm:ss")}</h6></td>
//                         <td>{cart.products?.map(product =>  <h6 key={product.id} onClick={() => handleProductEdit(product)}>* {product.name}</h6>)}</td>
//                         <td>{cart.products?.map(product => <h6 key={product.id}>Unid: {product.orderItem.quantity}</h6>)}</td>
//                         <td>{cart.products?.map(product => <h6 key={product.id}><img style={{ width: "50px", height: "50px" }} src={product.image} alt={product.name} /></h6>)}</td>
//                         {/* <td className="text-center">{cart.products?.map(product =>s <h6 key={product.id}>{product.price}</h6>)}</td> */}
//                         {/* {
//                           shopsItem?.map(shops => <td><h6 key={shops.id}>{shops.cantidad}</h6></td>)
//                         } */}
//                       </tr>
//                     ))}
//                   </tbody>
//                 </Table>
//               </CardBody>




//               <CardBody>
//                 <CardTitle tag="h4">Record de Compras</CardTitle>
//                 <Table className="tablesorter" responsive>
//                   <thead className="text-primary">
//                     <tr>
//                       <th>Usuario Id</th>
//                       <th>Cantidad por postre</th>
//                       <th>Precio</th>
//                       <th >Producto Id</th>
//                       <th >Fecha y hora de pago</th>
                      
//                     </tr>
//                   </thead>
//                   <tbody className="text-primary">
//                     {/* {cartProduct?.map(cart => (
//                       <tr key={cart.id}>
//                         <td><h6>{cart.userId}</h6></td>
//                         <td>{cart.products?.map(product =>  <h6 key={product.id} onClick={() => handleProductEdit(product)}>* {product.name}</h6>)}</td> */}
//                         {/* <td>{cart.products?.map(product => <h6 key={product.id}>Unid: {product.orderItem.quantity}</h6>)}</td>
//                         <td className="text-center">{cart.products?.map(product => <h6 key={product.id}>{product.price}</h6>)}</td> */}
//                         {
//                           shopsItem?.map(shops => (
//                             <tr key={shops.id}>
//                               <td><h6>{shops.userId}</h6></td>
//                               <td ><h6>{shops.cantidad}</h6></td>
//                                <td><h6>$ {shops.price}</h6></td>
//                                <td ><h6>{shops.productId}</h6></td>
//                                <td ><h6>{format(new Date(shops.createdAt), "yyyy-MM-dd HH:mm:ss")}</h6></td>
//                                </tr>
//                           ))}
                        
//                         {/* <td><h6>{format(new Date(cart.createdAt), "yyyy-MM-dd HH:mm:ss")}</h6></td>
//                         <td>{cart.products?.map(product => <h6 key={product.id}><img style={{ width: "50px", height: "50px" }} src={product.image} alt={product.name} /></h6>)}</td> */}
//                       {/* </tr> */}
//                     {/* ))} */}
//                   </tbody>
//                 </Table>
//               </CardBody>
//             </Card>
//           </Col>
//         </Row>
//       </div>
//     </>
//   );
// }

// export default Tables;
import React, {useEffect, useState} from "react";
// import { useParams } from "react-router-dom";
import {  useSelector, useDispatch } from "react-redux";
import { cartProducts, shopsCart} from "../redux/actions.js";
import { format } from 'date-fns';
// import Order from "./Order.jsx";
// reactstrap components
// reactstrap components
import {Button,ButtonGroup,Card,CardHeader,CardBody,CardTitle,Table,Row,Col,} from "reactstrap";
import {
  chartExample1,
  chartExample2,//precio total
  chartExample3,
  chartExample4,
} from "../variables/charts.js";
import classNames from "classnames";
import { Line, Bar } from "react-chartjs-2"
import OutletCard from "./OutletCard.jsx";

function Tables() {
  const [totalPrice, setTotalPrice] = useState([chartExample3.data]);
  const [totalUnit, setTotalUnit] = useState([chartExample2.data]);
  const [chartLabel, setChartLabel] = useState(chartExample2.label);
  const [bigChartData, setBigChartData] = useState("data1");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showOutletCard, setShowOutletCard] = useState(false);
  // const [selectedProduct, setSelectedProduct] = useState(null);

  const dispatch = useDispatch();
  const cartProduct = useSelector(state => state.cartProduct);
  const shopsItem = useSelector(state => state.shopsItem);

  const setBgChartData = (value) => {
    setBigChartData(value);
  };
///*************para editar un roducto al hace rclick en el producto que se muestra */
  const handleProductEdit = (product) => {
    setSelectedProduct(product);
    setShowOutletCard(true);
  };
//**********************para manejar el boton del formualario ****** */
  // const handleOutletClose = () => {
  //   setSelectedProduct(null);
  //   setShowOutletCard(false);
  // };


  // const handleEditButtonClick = () => {
  //   setShowOutletCard(true);
  // };
//******************************* ****** */


  // useEffect(() => {
  //   const foundProduct = cartProduct?.find(cart => cart.createdAt);
  //   if (foundProduct) {
  //     const createAtDate = new Date(foundProduct.createdAt);
  //     const formattedDate = format(createAtDate, "yyyy-MM-dd HH:mm:ss");
  //     setChartLabel(formattedDate);
  //   }
  // }, [cartProduct]);

  useEffect(() => {
    const foundProduct = shopsItem?.find(shops => shops.createdAt);
    if (foundProduct) {
      const createAtDate = new Date(foundProduct.createdAt);
      const formattedDate = format(createAtDate, "yyyy-MM-dd HH:mm:ss");
      setChartLabel(formattedDate);
    }
  }, [shopsItem]);

  useEffect(() => {
    dispatch(cartProducts());
  }, [dispatch]);

  useEffect(() => {
    const totalPrice = shopsItem.reduce(
      (total, shops) =>
        total + shops.price * shops.cantidad, 0)
     
    setTotalPrice(totalPrice);

    const totalUnit = shopsItem.reduce(
      (total, shops) =>
        total + shops.cantidad,0)
        
    setTotalUnit(totalUnit);
  }, [shopsItem]);
  useEffect(() => {
    dispatch(shopsCart())
  }, [dispatch])
  // const handleProductEdit = (product) => {
  //   setSelectedProduct(product);
  //   setShowOutletCard(true);
  // };
  return (
    <>
      <div className="content">
        <Row>
          <Col xs="12">
            <Card className="card-chart">
              <CardHeader>
                <Row>
              
                  <Col className="text-left" sm="6">
                    <h5 className="card-category">Gráfico de Compras</h5>
                    <CardTitle tag="h2">Actuación</CardTitle>
                  </Col>
                  <Col sm="6">
                    <ButtonGroup className="btn-group-toggle float-right" data-toggle="buttons">
                    {/* <Button
            className="btn-round"
            color="info"
            size="sm"
            onClick={handleEditButtonClick}
          >
             Editar Producto
          </Button> */}
                      <Button
                        tag="label"
                        className={classNames("btn-simple", { active: bigChartData === "data1" })}
                        color="info"
                        id="0"
                        size="sm"
                        onClick={() => setBgChartData("data1")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Accounts
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-single-02" />
                        </span>
                      </Button>
                      <Button
                        color="info"
                        id="1"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", { active: bigChartData === "data2" })}
                        onClick={() => setBgChartData("data2")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Purchases
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-gift-2" />
                        </span>
                      </Button>
                      <Button
                        color="info"
                        id="2"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", { active: bigChartData === "data3" })}
                        onClick={() => setBgChartData("data3")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Sessions
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-tap-02" />
                        </span>
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line data={chartExample1[bigChartData]} options={chartExample1.options} />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Envíos Totales</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-bell-55 text-info" />{totalUnit}
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line data={chartExample2.data} options={chartExample2.options} label={chartLabel} />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Ventas Diarias</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-delivery-fast text-primary" />{totalPrice}
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar data={chartExample3.data} options={chartExample3.options} />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Completed Tasks</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-send text-success" /> 12,100K
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line data={chartExample4.data} options={chartExample4.options} />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Ingreso de un Producto al Carrito</CardTitle>
        {/* {showOutletCard && (
  <OutletCard product={selectedProduct} onClose={handleOutletClose} />
)} */}
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Usuario</th>
                      <th >Nombre</th>
                      <th >Fecha de ingreso al carrito</th>
                      <th >Producto</th>
                      <th>Cantidad</th>
                      <th>Imagen</th>
                      {/* <th className="text-center">Precio</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {cartProduct?.map(cart => (
                      <tr key={cart.id}>
                        <td><h6>{cart.userId}</h6></td>
                        <td ><h6>{cart.user.name}</h6></td>
                        <td ><h6>{format(new Date(cart.createdAt), "yyyy-MM-dd HH:mm:ss")}</h6></td>
                        <td>{cart.products?.map(product =>  <h6 key={product.id} onClick={() => handleProductEdit(product)}>* {product.name}</h6>)}</td>
                        <td>{cart.products?.map(product => <h6 key={product.id}>Unid: {product.orderItem.quantity}</h6>)}</td>
                        <td>{cart.products?.map(product => <h6 key={product.id}><img style={{ width: "50px", height: "50px" }} src={product.image} alt={product.name} /></h6>)}</td>
                        {/* <td className="text-center">{cart.products?.map(product =>s <h6 key={product.id}>{product.price}</h6>)}</td> */}
                        {/* {
                          shopsItem?.map(shops => <td><h6 key={shops.id}>{shops.cantidad}</h6></td>)
                        } */}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>




              <CardBody>
                <CardTitle tag="h4">Record de Compras</CardTitle>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Usuario Id</th>
                      <th>Cantidad por postre</th>
                      <th>Precio</th>
                      <th >Producto Id</th>
                      <th >Fecha y hora de pago</th>
                      
                    </tr>
                  </thead>
                  <tbody className="text-primary">
                    {/* {cartProduct?.map(cart => (
                      <tr key={cart.id}>
                        <td><h6>{cart.userId}</h6></td>
                        <td>{cart.products?.map(product =>  <h6 key={product.id} onClick={() => handleProductEdit(product)}>* {product.name}</h6>)}</td> */}
                        {/* <td>{cart.products?.map(product => <h6 key={product.id}>Unid: {product.orderItem.quantity}</h6>)}</td>
                        <td className="text-center">{cart.products?.map(product => <h6 key={product.id}>{product.price}</h6>)}</td> */}
                        {
                          shopsItem?.map(shops => (
                            <tr key={shops.id}>
                              <td><h6>{shops.userId}</h6></td>
                              <td ><h6>{shops.cantidad}</h6></td>
                               <td><h6>$ {shops.price}</h6></td>
                               <td ><h6>{shops.productId}</h6></td>
                               <td ><h6>{format(new Date(shops.createdAt), "yyyy-MM-dd HH:mm:ss")}</h6></td>
                               </tr>
                          ))}
                        
                        {/* <td><h6>{format(new Date(cart.createdAt), "yyyy-MM-dd HH:mm:ss")}</h6></td>
                        <td>{cart.products?.map(product => <h6 key={product.id}><img style={{ width: "50px", height: "50px" }} src={product.image} alt={product.name} /></h6>)}</td> */}
                      {/* </tr> */}
                    {/* ))} */}
                  </tbody>
                </Table>
              </CardBody>
              <Button
  className="btn-round"
  color="info"
  size="sm"
  onClick={() => setShowOutletCard(true)}
>
  Editar Producto
</Button>
              {showOutletCard && (
  <OutletCard product={selectedProduct} onClose={() => setShowOutletCard(false)} />
)}
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Tables;
