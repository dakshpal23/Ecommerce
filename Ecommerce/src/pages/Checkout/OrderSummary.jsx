import dayjs from "dayjs";
import { money } from "../../utils/money";
import { DeliveryOptions } from "./DeliveryOptions";
import axios from "axios";
import { useState } from "react";


export const OrderSummary = ({ cart, deliveryOptions, loadCart }) => {


    return (
        <div>
            <div className="order-summary">

                {deliveryOptions.length > 0 && cart.map((cartItem) => {
                    const [updateQuantity, setUpdateQuantity] = useState(false)

                    const selectedDeliveryOption = deliveryOptions
                        .find((deliveryOption) => {
                            return deliveryOption.id === cartItem.deliveryOptionId
                        })

                    const deleteCartItem = async () => {
                        await axios.delete(`http://localhost:3000/api/cart-items/${cartItem.productId}`)
                        await loadCart();
                    }

                    const updateCartItem = () => {
                        setUpdateQuantity(true)
                    }

                    return (
                        <div key={cartItem.productId} className="cart-item-container">
                            <div className="delivery-date">
                                Delivery date: {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                            </div>

                            <div className="cart-item-details-grid">
                                <img className="product-image"
                                    src={cartItem.product.image} />

                                <div className="cart-item-details">
                                    <div className="product-name">
                                        {cartItem.product.name}
                                    </div>
                                    <div className="product-price">
                                        ${money(cartItem.product.priceCents)}
                                    </div>
                                    <div className="product-quantity">
                                        <span>
                                            Quantity: {updateQuantity && <input className="textbox" type="text" />}<span className="quantity-label">{cartItem.quantity}</span>
                                        </span>
                                        <span className="update-quantity-link link-primary" onClick={updateCartItem}>
                                            Update
                                        </span>
                                        <span className="delete-quantity-link link-primary" onClick={deleteCartItem}>
                                            Delete
                                        </span>
                                    </div>
                                </div>

                                <DeliveryOptions deliveryOptions={deliveryOptions} cartItem={cartItem} loadCart={loadCart} />
                            </div>
                        </div>
                    );
                })}

            </div>
        </div>
    )
}

