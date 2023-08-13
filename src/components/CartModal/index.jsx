import { MdClose } from "react-icons/md"
import { CartItemCard } from "./CartItemCard"
import style from "./style.module.scss"

export const CartModal = ({ cartList, children, setIsOpen, removeToCart, removeAllFromCart }) => {
   const total = cartList.reduce((prevValue, product) => {
      return prevValue + product.price;
   }, 0);

   return (
      <div className={`${style.modalOverlay}`} role="dialog">
         <div className={`${style.modalBox}`}>
            <div className={`${style.titleCart}`}>
               <h2>Carrinho de compras</h2>
               <button className={`${style.closeButton}`} onClick={() => setIsOpen(false)} aria-label="close" title="Fechar">
                  <MdClose size={21} className={`${style.iconButtonCloseModal}`} />
                  {children}
               </button>
            </div>
            <ul className={`${style.containerCartItem}`}>
               {cartList.map((product) => (
                  <CartItemCard key={product.id} product={product} removeToCart={removeToCart} />
               ))}
            </ul>
            <div className={`${style.cartTotalMoney}`}>
               <p>Total</p>
               <span>{total.toLocaleString('pt-BR', { style: "currency", currency: "BRL" })}</span>
            </div>
            <button className="buttonRemoveAll" onClick={() => removeAllFromCart()}>Remover todos</button>
         </div>
      </div>
   );
};
