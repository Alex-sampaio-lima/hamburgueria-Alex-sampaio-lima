import { FiChevronRight } from "react-icons/fi"
import { formatPrice } from "../../services/format"
import style from "./style.module.scss"

export const CartBar = ({ count, total, onOpen }) => {
   return (
      <button className={style.bar} onClick={onOpen} aria-label={`Ver carrinho, ${count} ${count === 1 ? "item" : "itens"}, total ${formatPrice(total)}`}>
         <span key={count} className={style.count}>{count}</span>
         <span className={style.label}>Ver carrinho</span>
         <span className={style.total}>{formatPrice(total)}</span>
         <FiChevronRight size={18} aria-hidden="true" />
      </button>
   )
}
