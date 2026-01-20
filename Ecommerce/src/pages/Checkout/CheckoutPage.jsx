import './checkout.css'
import './checkout-header.css'
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';

const CheckoutPage = ({ cart, loadCart }) => {

    const [deliveryOptions, setDeliveryOptions] = useState([])
    const [paymentSummary, setPaymentSummary] = useState(null)

    useEffect(() => {
        const fetchCheckoutData = async () => {
            const response = await axios.get('http://localhost:3000/api/delivery-options?expand=estimatedDeliveryTime')
            setDeliveryOptions(response.data)
        }
        fetchCheckoutData()
    }, [])

    useEffect(() => {
        const fetchPaymentSummary = async () => {
            const response = await axios.get('http://localhost:3000/api/payment-summary')
            setPaymentSummary(response.data)
        }
        fetchPaymentSummary();
    }, [cart])

    return (
        <>
            <title>Checkout</title>

            <div className="checkout-header">
                <div className="header-content">
                    <div className="checkout-header-left-section">
                        <a href="/">
                            <img className="logo" src="images/logo.png" />
                            <img className="mobile-logo" src="images/mobile-logo.png" />
                        </a>
                    </div>

                    <div className="checkout-header-middle-section">
                        Checkout (<a className="return-to-home-link"
                            href="/">3 items</a>)
                    </div>

                    <div className="checkout-header-right-section">
                        <img src="images/icons/checkout-lock-icon.png" />
                    </div>
                </div>
            </div>

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <OrderSummary cart={cart} deliveryOptions={deliveryOptions} loadCart={loadCart} />

                    <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
                </div>
            </div>
        </>
    )
}

export default CheckoutPage
