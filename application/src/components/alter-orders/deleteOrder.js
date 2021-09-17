import React, { Component } from 'react';
import { SERVER_IP } from '../../private';
import './alter.css';

const DELETE_ORDER_URL = `${SERVER_IP}/api/delete-order`

class DeleteOrder extends Component {
    constructor(props) {
        super(props);
        this.closeCallback = props.closeCallback.bind(this);
        this.fetchCallback = props.fetchCallback.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
    }

    onDeleteClick () {
        fetch(DELETE_ORDER_URL, {
            method: 'POST',
            body: JSON.stringify({
                id: this.props.order._id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(raw => raw.json())
        .then(res => {
            this.fetchCallback();
            this.closeCallback();
        })
        .catch(err => console.log("Something went wront with deleting the order", err));
    }

    render() {
        return (
            <div>
                <p>Are you sure you'd like to delete this order?</p>
                <button onClick={this.onDeleteClick} className="alter-button btn btn-danger">
                    Delete
                </button>
            </div>
        );
    }
}

export default DeleteOrder;