import React, { Component } from 'react';
import { SERVER_IP } from '../../private';
import './alter.css'

const EDIT_ORDER_URL = `${SERVER_IP}/api/edit-order`

class EditOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order_item: props.order.order_item,
            quantity: props.order.quantity,
            ordered_by: props.order.ordered_by,
            prev_item: props.order.order_item,
            prev_quantity: props.order.quantity,
            prev_ordered_by: props.order.ordered_by
        }
        this.closePopup = props.closeCallback.bind(this);
        this.onFormChange = this.onFormChange.bind(this);
        this.onEditSubmit = this.onEditSubmit.bind(this);
        this.hasChanged = this.hasChanged.bind(this);
    }

    hasChanged() {
        let isDisabled = true;
        if (this.state.prev_item !== this.state.order_item || this.state.quantity !== this.state.prev_quantity || this.state.ordered_by !== this.state.prev_ordered_by) {
            console.log('1')
            isDisabled = false;
        }
        console.log(isDisabled)
        return isDisabled
    }

    onFormChange(name, value) {
        console.log(`NEW STATE: {${name}: ${value} }}`)
        this.setState({ ...this.state, [name]: value })
    }

    onEditSubmit(e) {
        e.preventDefault();
        console.log(this.state);
        fetch(EDIT_ORDER_URL, {
            method: 'POST',
            body: JSON.stringify({
                id: this.props.order._id,
                ordered_by: this.props.ordered_by,
                order_item: this.state.order_item,
                quantity: this.state.quantity
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(response => {
                console.log("Edit Successfully Submitted: \n", JSON.stringify(response));
                this.props.fetchCallback();
                this.props.closeCallback();
            })
            .catch(err => console.log("An Error Occurred with Editing the Order:\n", err));
    }

    render() {
        return (
            <div>
                <div className="alter-group">
                    <strong>Select Item</strong>
                    <select onChange={(e) => this.onFormChange("order_item", e.target.value)}>
                        <option value="" selected disabled hidden>Choose New Menu Item</option>
                        <option disabled={this.state.prev_item === "Soup of the Day"} value="Soup of the Day">Soup of the Day</option>
                        <option disabled={this.state.prev_item === "Linguini With White Wine Sauce"} value="Linguini With White Wine Sauce">Linguini With White Wine Sauce</option>
                        <option disabled={this.state.prev_item === "Eggplant and Mushroom Panini"} value="Eggplant and Mushroom Panini">Eggplant and Mushroom Panini</option>
                        <option disabled={this.state.prev_item === "Chili Con Carne"} value="Chili Con Carne">Chili Con Carne</option>
                    </select>
                </div>
                <div className="alter-group">
                    <strong>Select quantity</strong>
                    <div>
                        <select onChange={(e) => this.onFormChange("quantity", e.target.value)}>
                            <option value="" selected disabled hidden>Choose New Quantity</option>
                            <option disabled={String(this.state.prev_quantity) === "1"} value="1">1</option>
                            <option disabled={String(this.state.prev_quantity) === "2"} value="2">2</option>
                            <option disabled={String(this.state.prev_quantity) === "3"} value="3">3</option>
                            <option disabled={String(this.state.prev_quantity) === "4"} value="4">4</option>
                            <option disabled={String(this.state.prev_quantity) === "5"} value="5">5</option>
                            <option disabled={String(this.state.prev_quantity) === "6"} value="6">6</option>
                        </select>
                    </div>
                </div>
                <div className="alter-group">
                    <input onChange={(e) => this.onFormChange("ordered_by", e.target.value)} />
                </div>
                <div className="mt-3">
                    <button
                        disabled={this.hasChanged()}
                        onClick={this.onEditSubmit}
                        className="alter-button btn btn-success">
                        Edit
                    </button>
                </div>
            </div>
        );
    }
}

export default EditOrder;