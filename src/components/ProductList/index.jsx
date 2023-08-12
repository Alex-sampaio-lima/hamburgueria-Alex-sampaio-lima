import { ProductCard } from "./ProductCard";
import style from "../ProductList/style.module.scss"
export const ProductList = ({ productList, addToCart }) => {


   return (
      <ul className={`${style.containerCards}`}>
         {productList.map((product) => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
         ))}
      </ul>
   )
}
