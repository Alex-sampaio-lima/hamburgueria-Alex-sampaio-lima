import { useEffect } from "react"
import { FiShoppingBag, FiX } from "react-icons/fi"
import { formatPrice } from "../../services/format"
import { CartItemCard } from "./CartItemCard"
import style from "./style.module.scss"

export const CartModal = ({ cartList, children, setIsOpen, removeToCart, removeAllFromCart }) => {
   const total = cartList.reduce((prevValue, product) => prevValue + product.price, 0)
   const count = cartList.length
   const close = () => setIsOpen(false)

   useEffect(() => {
      const onKeyDown = (e) => e.key === "Escape" && setIsOpen(false)
      document.addEventListener("keydown", onKeyDown)
      document.body.style.overflow = "hidden"
      return () => {
         document.removeEventListener("keydown", onKeyDown)
         document.body.style.overflow = ""
      }
   }, [setIsOpen])

   return (
      <div
         className={style.overlay}
         role="dialog"
         aria-modal="true"
         aria-labelledby="cart-title"
         onClick={(e) => e.target === e.currentTarget && close()}
      >
         <div className={style.box}>
            <span className={style.handle} aria-hidden="true" />
            <header className={style.head}>
               <div className={style.headTitle}>
                  <h2 id="cart-title">Seu carrinho</h2>
                  {count > 0 && <span className={style.headCount}>{count} {count === 1 ? "item" : "itens"}</span>}
               </div>
               <button className={style.close} onClick={close} aria-label="Fechar carrinho" title="Fechar">
                  <FiX size={18} />
                  {children}
               </button>
            </header>

            {count === 0 ? (
               <div className={style.empty}>
                  <span className={style.emptyIcon}><FiShoppingBag size={26} /></span>
                  <p>Seu carrinho está vazio</p>
                  <span>Adicione itens do cardápio para começar.</span>
                  <button type="button" className={style.emptyCta} onClick={close}>Ver cardápio</button>
               </div>
            ) : (
               <ul className={style.list}>
                  {cartList.map((product) => (
                     <CartItemCard key={product.id} product={product} removeToCart={removeToCart} />
                  ))}
               </ul>
            )}

            {count > 0 && (
               <footer className={style.foot}>
                  <div className={style.total}>
                     <p>Total</p>
                     <span data-testid="cart-total">{formatPrice(total)}</span>
                  </div>
                  <button className={style.removeAll} onClick={() => removeAllFromCart()}>
                     Remover todos
                  </button>
               </footer>
            )}
         </div>
      </div>
   )
}
