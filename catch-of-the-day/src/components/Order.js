import React, { Component } from 'react'
import {formatPrice} from '../helpers'

class Order extends Component {
   
    renderOrder = (key) =>{
        const fish = this.props.fishes[key];
        const count = this.props.order[key];
        const isavailable = fish && fish.status === "available"
        if(!fish) return null
        if(!isavailable){
            return <li key ={key}> sorry {fish ? fish.name : 'fish'}  is no longer available </li>
        }
        return <li key={key}>
            {count} lbs {fish.name}
            {formatPrice(count * fish.price)}
             <button onClick={() => this.props.deleteOrder(key)}>&times;</button>
            <hr/>
            </li>
    }
    render() {
        const orderIds = Object.keys(this.props.order)
        const total = orderIds.reduce((prevTotal,key) => {
            const fish = this.props.fishes[key];
            const count = this.props.order[key];
            const isavailable =fish && fish.status ==="available";
            if(isavailable){
                return prevTotal + (count * fish.price);
            }
            return prevTotal;
        },0)
        
        return (
        <div className="order-wrap">
            <h2>Your Order</h2>
            <ul className="order">
            {orderIds.map(this.renderOrder)}
            </ul>
            <div className="total">
                Total: <strong>{formatPrice(total)}</strong>
            </div>
        </div>
        )
    }
}
export default Order