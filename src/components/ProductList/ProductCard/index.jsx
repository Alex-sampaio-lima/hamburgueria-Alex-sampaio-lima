import { FiCheck, FiPlus } from "react-icons/fi"
import { formatPrice } from "../../../services/format"
import style from "./style.module.scss"

export const ProductCard = ({ product, addToCart, inCart, index = 0 }) => {
   return (
      <li className={style.card} style={{ "--i": index }}>
         <div className={style.media}>
            <img className={style.img} src={product.img} alt={product.name} loading="lazy" />
            <span className={style.category}>{product.category}</span>
         </div>
         <div className={style.body}>
            <div className={style.info}>
               <h3 className={style.name}>{product.name}</h3>
               <span className={style.price}>{formatPrice(product.price)}</span>
            </div>
            <button
               className={`${style.add} ${inCart ? style.added : ""}`}
               onClick={() => addToCart(product)}
               aria-label={inCart ? `${product.name} já está no carrinho` : `Adicionar ${product.name} ao carrinho`}
               title={inCart ? "Já está no carrinho" : "Adicionar ao carrinho"}
            >
               {inCart ? <FiCheck size={18} strokeWidth={2.75} /> : <FiPlus size={20} strokeWidth={2.5} />}
            </button>
         </div>
      </li>
   )
}
