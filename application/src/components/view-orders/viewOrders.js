import React, { Component } from 'react';
import { Template } from '../../components';
import { SERVER_IP } from '../../private';
import './viewOrders.css';

import Popup from '../common/popup';
import EditOrder from '../alter-orders/editOrder';
import DeleteOrder from '../alter-orders/deleteOrder';

class ViewOrders extends Component {
    constructor(props) {
        super(props);
        this.deleteOrder = this.deleteOrder.bind(this);
        this.editOrder = this.editOrder.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.fetchOrders = this.fetchOrders.bind(this);
    }

    state = {
        orders: [],
        selectedOrder: null,
        showEdit: false,
        showDelete: false
    }

    deleteOrder(order) {
        console.log("Delete order: ", order);
        this.setState({ ...this.state, selectedOrder: order, showDelete: true });
    }

    editOrder(order) {
        console.log("Edit order: ", order);
        this.setState({ ...this.state, selectedOrder: order, showEdit: true });
    }

    closePopup() {
        console.log("Close the popup")
        if (this.state.showEdit || this.state.showDelete) {
            this.setState({ ...this.state, selectedOrder: null, showDelete: false, showEdit: false });
        }
    }

    fetchOrders() {
        fetch(`${SERVER_IP}/api/current-orders`)
            .then(response => response.json())
            .then(response => {
                if(response.success) {
                    this.setState({ orders: response.orders });
                } else {
                    console.log('Error getting orders');
                }
            });
    }

    componentDidMount() {
        this.fetchOrders();
    }

    render() {
        return (
            <Template closeCallback={this.closePopup}>
                <div className="container-fluid">
                    {this.state.orders.map(order => {
                        const createdDate = new Date(order.createdAt);
                        return (
                            <div className="row view-order-container" key={order._id}>
                                <div className="col-md-4 view-order-left-col p-3">
                                    <h2>{order.order_item}</h2>
                                    <p>Ordered by: {order.ordered_by || ''}</p>
                                </div>
                                <div className="col-md-4 d-flex view-order-middle-col">
                                    <p>Order placed at {`${createdDate.getHours()}:${createdDate.getMinutes()}:${createdDate.getSeconds()}`}</p>
                                    <p>Quantity: {order.quantity}</p>
                                 </div>
                                 <div className="col-md-4 view-order-right-col">
                                    <button 
                                        className="btn btn-success" 
                                        onClick={() => this.editOrder(order)}
                                        disabled={this.state.showDelete || this.state.showEdit}>
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger" 
                                        onClick={() => this.deleteOrder(order)}
                                        disabled={this.state.showDelete || this.state.showEdit}>
                                        Delete
                                    </button>
                                 </div>
                            </div>
                        );
                    })}
                </div>
                <>
                    {this.state.showEdit && (
                        <Popup>
                            <strong className="popup-header">Edit Order</strong>
                            <EditOrder order={this.state.selectedOrder} closeCallback={this.closePopup} fetchCallback={this.fetchOrders} />
                        </Popup>
                    )}
                </>
                <>
                    {this.state.showDelete && (
                        <Popup>
                            <strong className="popup-header">Delete Order</strong>
                            <DeleteOrder order={this.state.selectedOrder} closeCallback={this.closePopup} fetchCallback={this.fetchOrders} />
                        </Popup>
                    )}
                </>
            </Template>
        );
    }
}

export default ViewOrders;
