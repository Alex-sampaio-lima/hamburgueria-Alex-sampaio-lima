import { FiTrash2 } from "react-icons/fi"
import { formatPrice } from "../../../services/format"
import style from "./style.module.scss"

export const CartItemCard = ({ product, removeToCart }) => {
   return (
      <li className={style.item}>
         <img className={style.img} src={product.img} alt={product.name} />
         <div className={style.info}>
            <h3>{product.name}</h3>
            <span className={style.category}>{product.category}</span>
            <span className={style.price}>{formatPrice(product.price)}</span>
         </div>
         <button
            className={style.remove}
            onClick={() => removeToCart(product.id)}
            aria-label={`Remover ${product.name}`}
            title="Remover item"
         >
            <FiTrash2 size={17} />
         </button>
      </li>
   )
}
