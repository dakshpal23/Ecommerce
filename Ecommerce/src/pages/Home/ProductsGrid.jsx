
import { Product } from "./Product";

export const ProductsGrid = ({ products, loadCart }) => {


    return (
        <div>
            <div className="products-grid">

                {products.map((product) => {
                    return (
                        <Product key={product.id} product={product} loadCart={loadCart}/>
                    );
                })}



            </div>
        </div>
    )
}


