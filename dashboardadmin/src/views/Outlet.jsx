// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { updateProduct } from "../redux/actions";

// function Outlet({ product, onEdit }) {
//   const [name, setName] = useState(product.name);
//   const [price, setPrice] = useState(product.price);
//   const [description, setDescription] = useState(product.description);
//   const [summary, setSummary] = useState(product.summary);
//   const [image, setImage] = useState(product.image);

//   const dispatch = useDispatch();

//   const handleEdit = () => {
//     const updatedProduct = {
//       id: product.id,
//       name,
//       price,
//       description,
//       summary,
//       image,
//     };

//     dispatch(updateProduct(updatedProduct));
//     onEdit();
//   };

//   return (
//     <div className="card">
//       <div className="card-body">
//         <h5 className="card-title">Editar Producto</h5>
//         <div className="form-group">
//           <label htmlFor="name">Nombre</label>
//           <input
//             type="text"
//             className="form-control"
//             id="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="price">Precio</label>
//           <input
//             type="number"
//             className="form-control"
//             id="price"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="description">Descripción</label>
//           <textarea
//             className="form-control"
//             id="description"
//             rows="3"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           ></textarea>
//         </div>
//         <div className="form-group">
//           <label htmlFor="summary">Resumen</label>
//           <textarea
//             className="form-control"
//             id="summary"
//             rows="3"
//             value={summary}
//             onChange={(e) => setSummary(e.target.value)}
//           ></textarea>
//         </div>
//         <div className="form-group">
//           <label htmlFor="image">Imagen</label>
//           <input
//             type="text"
//             className="form-control"
//             id="image"
//             value={image}
//             onChange={(e) => setImage(e.target.value)}
//           />
//         </div>
//         <button className="btn btn-primary" onClick={handleEdit}>
//           Guardar
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Outlet;
