import React, { useState } from "react";
import { Button, Input, Modal, Dropdown, Menu, Checkbox } from "semantic-ui-react";
import { updateProduct } from "../api";
import EditInStock from "./EditInStock";

//import EditProductCard from './EditProductCard'

export default function EditProductModal({ id, name, inStock, setProducts }) {
  const [open, setOpen] = useState(false);
  const [itemInStock, setItemInStock] = useState('')

  const [productDetails, setProductDetails] = useState({
    name: "",
    description: "",
    photoUrl: "",
    price: "",
    inStock: itemInStock,
  });

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => {
        setOpen(true);
      }}
      open={open}
      trigger={<Button icon="edit" color="orange" />}
      size="tiny"
    >
      <Modal.Header>{name}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <p style={{ margin: 0 }}>Name: </p>
          <Input
            fluid
            autoComplete="off"
            style={{ marginBottom: "1rem" }}
            name="name"
            value={productDetails.name}
            onChange={(event) => {
              setProductDetails({
                ...productDetails,
                [event.target.name]: event.target.value,
              });
            }}
            placeholder="Edit the product title..."
          />
          <p style={{ margin: 0 }}>Description: </p>
          <Input
            fluid
            autoComplete="off"
            style={{ marginBottom: "1rem" }}
            name="description"
            value={productDetails.description}
            onChange={(event) => {
              setProductDetails({
                ...productDetails,
                [event.target.name]: event.target.value,
              });
            }}
            placeholder="Edit the product description..."
          />
          <p style={{ margin: 0 }}>Photo Link: </p>
          <Input
            fluid
            autoComplete="off"
            style={{ marginBottom: "1rem" }}
            name="photoUrl"
            type="textarea"
            value={productDetails.photoUrl}
            onChange={(event) => {
              setProductDetails({
                ...productDetails,
                [event.target.name]: event.target.value,
              });
            }}
            placeholder="Add a link to the Photo..."
          />
          <p style={{ margin: 0 }}>Price: </p>
          <Input
            fluid
            autoComplete="off"
            style={{ marginBottom: "1rem" }}
            name="price"
            type="number"
            value={productDetails.price}
            onChange={(event) => {
              setProductDetails({
                ...productDetails,
                [event.target.name]: event.target.value,
              });
            }}
            placeholder="Edit the product price..."
          />

          <Checkbox label='is this item in Stock?' checked={inStock}/>
          
 
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" icon="cancel" onClick={() => setOpen(false)} />

        <Button
          icon="checkmark"
          onClick={async () => {
            const updatedProducts = await updateProduct(
              productDetails.name,
              productDetails.description,
              productDetails.photoUrl,
              productDetails.price,
              productDetails.inStock,
              id
            );
            if (Array.isArray(updatedProducts)) {
              updatedProducts.sort((a, b) => a.id - b.id);
              setProducts(updatedProducts);
              setProductDetails({
                name: "",
                description: "",
                photoUrl: "",
                price: "",
                inStock: '',
              });
              setOpen(false);
            } else {
              setOpen(false);
            }
          }}
        />
      </Modal.Actions>
    </Modal>
  );
}
