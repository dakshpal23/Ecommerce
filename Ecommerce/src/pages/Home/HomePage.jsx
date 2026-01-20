import Header from '../../Components/Header';
import './HomePage.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ProductsGrid } from './ProductsGrid';

window.axios = axios
const HomePage = ({ cart, loadCart}) => {

    
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getHomeData = async () => {
            const response = await axios.get('http://localhost:3000/api/products')
            setProducts(response.data)
        }

        getHomeData()
    }, [])



    return (
        <>
            <Header cart={cart} />

            <div className="home-page">
                <ProductsGrid products={products} loadCart={loadCart}/>
            </div>
        </>
    )
}

export default HomePage
