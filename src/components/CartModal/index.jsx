import { MdClose } from "react-icons/md"
import { CartItemCard } from "./CartItemCard"
import style from "./style.module.css"

export const CartModal = ({ cartList, children, setIsOpen }) => {
   const total = cartList.reduce((prevValue, product) => {
      return prevValue + product.price;
   }, 0);

   return (
      <div className={`${style.modalOverlay}`} role="dialog">
         <div className={`${style.modalBox}`}>
            <h2>Carrinho de compras</h2>
            <button className={`${style.closeButton}`} onClick={() => setIsOpen(false)} aria-label="close" title="Fechar">
               <MdClose size={21} />
               {children}
            </button>

            <ul>
               {cartList.map((product) => (
                  <CartItemCard key={product.id} product={product} />
               ))}
            </ul>

            <div>
               <span>Total</span>
               <span>{total.toLocaleString('pt-BR', { style: "currency", currency: "BRL" })}</span>
            </div>
            <button>Remover todos</button>
         </div>
      </div>
   );
};
