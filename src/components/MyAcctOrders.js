import React, { useState, useEffect } from "react";
import { Table } from "semantic-ui-react";
// import { getOrder } from '../api'

const MyAccountOrders = ({ orders }) => {
  // const [orders, setOrders] = useState()

  const totalArr = [];

  return (
    <>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Order Number</Table.HeaderCell>
            {/* <Table.HeaderCell>Cart Number</Table.HeaderCell> */}
            <Table.HeaderCell>Order Details</Table.HeaderCell>
            <Table.HeaderCell>Total</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {orders.cartArr.map((cart) => {
            return (
              <Table.Row>
                <Table.Cell>{cart.rows.id}</Table.Cell>
                {/* <Table.Cell>{cart.rows.cartId}</Table.Cell> */}
                <Table.Cell>
                  {cart.cart.products.map((product) => {
                    totalArr.push(parseFloat(product.price));
                    return (
                      <div>
                        {product.name} - ${product.price} x {product.count}
                      </div>
                    );
                  })}
                </Table.Cell>
                <Table.Cell>${cart.total}</Table.Cell>
                <Table.Cell>{cart.cart.status}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </>
  );
};

export default MyAccountOrders;
