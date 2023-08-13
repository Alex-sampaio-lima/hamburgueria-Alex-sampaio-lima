import { MdDelete } from "react-icons/md"
import style from "../CartItemCard/style.module.scss"

export const CartItemCard = ({ product, removeToCart }) => {
   return (
      <li className={`${style.containerProducts}`} >
         <div className={`${style.containerCartTitle}`}>
            <img src={product.img} alt={product.name} />
            <h3>{product.name}</h3>
         </div>
         <button onClick={() => removeToCart(product.id)} aria-label="delete" title="Remover item">
            <MdDelete size={21} />
         </button>
      </li>
   );
};
