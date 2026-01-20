import { useEffect, useState } from 'react';
import Header from '../Components/Header';
import './Tracking.css'
import axios from 'axios';
import { useParams } from 'react-router';
import dayjs from 'dayjs';

const Tracking = ({ cart }) => {

    const { orderId, productId } = useParams()
    const [order, setOrder] = useState(null)

    useEffect(() => {
        const fetchTrackingData = async () => {
            const response = await axios.get(`http://localhost:3000/api/orders/${orderId}?expand=products`)
            setOrder(response.data)
        }
        fetchTrackingData();
    }, [orderId])

    if (!order) {
        return null;
    }

    const orderProduct = order.products.find((orderProduct) => {
        return orderProduct.productId === productId;
    });

    return (
        <>
            <Header cart={cart} />

            <div className="tracking-page">
                <div className="order-tracking">
                    <a className="back-to-orders-link link-primary" href="/orders">
                        View all orders
                    </a>

                    <div className="delivery-date">
                        Arriving on {dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                    </div>

                    <div className="product-info">
                        {orderProduct.product.name}
                    </div>

                    <div className="product-info">
                        Quantity: {orderProduct.quantity}
                    </div>

                    <img className="product-image" src={orderProduct.product.image} alt={orderProduct.product.name} />

                    <div className="progress-labels-container">
                        <div className="progress-label">
                            Preparing
                        </div>
                        <div className="progress-label current-status">
                            Shipped
                        </div>
                        <div className="progress-label">
                            Delivered
                        </div>
                    </div>

                    <div className="progress-bar-container">
                        <div className="progress-bar"></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Tracking
