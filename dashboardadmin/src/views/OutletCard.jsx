
import React from "react";
import { useState } from "react";
import { Table, Button } from "reactstrap";

const OutletCard = ({ product, onClose }) => {
    const [productId, setProductId] = useState("");
  const [editedProduct, setEditedProduct] = useState({
    name: product?.name || "",
    price: product?.price || 0,
    description: product?.description || "",
    summary: product?.summary || "",
    image: product?.image || "",
  });

  const [showMessage, setShowMessage] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };
  const handleProductIdChange = (e) => {
    setProductId(e.target.value);
  };
  const handleSaveChanges = async () => {
    try {
      if (product) {
        const response = await fetch(`http://localhost:3001/products/${productId || product?.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedProduct),
        });

        if (response.ok) {
          // Realizar las acciones necesarias después de guardar los cambios
          console.log("Cambios guardados exitosamente");
          setShowMessage(true);
          setEditedProduct({
            name: "",
            price: 0,
            description: "",
            summary: "",
            image: "",
          });
        } else {
          throw new Error("Error al guardar los cambios");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="outlet-card">
      <h2>Editando producto ID: {productId || product?.id}</h2>
      {showMessage && <p>Cambio realizado</p>}
      <Table>
        <tbody>
        <tr>
            <th>Id del producto:</th>
            <td>
                <input
        type="number"
        name="productId"
        value={productId}
        onChange={handleProductIdChange}
        />
    </td>
    </tr>
          <tr>
            <th>Nombre:</th>
            <td>
              <input
                type="text"
                name="name"
                value={editedProduct.name}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <th>Precio:</th>
            <td>
              <input
                type="number"
                name="price"
                value={editedProduct.price}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <th>Descripción:</th>
            <td>
              <textarea
                name="description"
                value={editedProduct.description}
                onChange={handleInputChange}
              ></textarea>
            </td>
          </tr>
          <tr>
            <th>Resumen:</th>
            <td>
              <textarea
                name="summary"
                value={editedProduct.summary}
                onChange={handleInputChange}
              ></textarea>
            </td>
          </tr>
          <tr>
            <th>Imagen:</th>
            <td>
              <input
                type="text"
                name="image"
                value={editedProduct.image}
                onChange={handleInputChange}
              />
            </td>
          </tr>
        </tbody>
      </Table>
      <div className="button-group">
        
        <Button 
        className="save-button" 
        color="info" size="sm" 
        onClick={handleSaveChanges}>
          Guardar cambios
        </Button>
        <Button
          className="close-button"
          color="info"
          size="sm"
          onClick={onClose}
        >
        Cerrar
      </Button>
      </div>
    </div>
  );
};

export default OutletCard;
