import { FiSearch, FiShoppingBag, FiX } from "react-icons/fi"
import Logo from "../../assets/Logo.svg"
import { formatPrice } from "../../services/format"
import style from "./style.module.scss"

export const Header = ({ value, setValue, cartList, total, setIsOpen }) => {
   const count = cartList.length

   return (
      <header className={style.header}>
         <div className={style.inner}>
            <a href="#" className={style.logoLink} aria-label="Burguer Kenzie, voltar ao topo">
               <img className={style.logo} src={Logo} alt="Burguer Kenzie" />
            </a>

            <form className={style.search} role="search" onSubmit={(e) => e.preventDefault()}>
               <FiSearch className={style.searchIcon} aria-hidden="true" />
               <input
                  className={style.input}
                  type="text"
                  value={value}
                  placeholder="Buscar lanches, bebidas…"
                  aria-label="Buscar produtos"
                  onChange={(e) => setValue(e.target.value)}
               />
               {value && (
                  <button type="button" className={style.clear} onClick={() => setValue("")} aria-label="Limpar busca">
                     <FiX size={14} />
                  </button>
               )}
            </form>

            <button
               className={`${style.cart} ${count > 0 ? style.cartFilled : ""}`}
               onClick={() => setIsOpen(true)}
               aria-label={`Abrir carrinho, ${count} ${count === 1 ? "item" : "itens"}`}
               title="Carrinho"
            >
               {count > 0 && <span key={count} className={style.badge}>{count}</span>}
               <FiShoppingBag size={19} />
               {count > 0 && <span className={style.cartTotal}>{formatPrice(total)}</span>}
            </button>
         </div>
      </header>
   )
}
