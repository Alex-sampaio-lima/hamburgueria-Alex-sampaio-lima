import { FiArrowDown, FiCheck, FiPlus } from "react-icons/fi"
import { formatPrice } from "../../services/format"
import style from "./style.module.scss"

export const Hero = ({ featured, inCart, addToCart }) => {
   return (
      <section className={style.hero}>
         <div className={style.content}>
            <span className={style.eyebrow}>
               <span className={style.dot} aria-hidden="true" />
               Feito na hora
            </span>
            <h1 className={style.title}>
               Seu burger <em>favorito</em>, do jeito que você gosta.
            </h1>
            <p className={style.text}>
               Sanduíches, acompanhamentos, bebidas e sobremesas. Escolha, adicione ao carrinho e pronto.
            </p>
            <a className={style.cta} href="#cardapio">
               Ver cardápio
               <FiArrowDown size={18} aria-hidden="true" />
            </a>
         </div>

         <div className={style.visual}>
            <img src={featured?.img ?? "/products/big-burguer.jpg"} alt="" className={style.img} />
            {featured && (
               <div className={style.floating}>
                  <div>
                     <span>Destaque da casa</span>
                     <strong>{featured.name} · {formatPrice(featured.price)}</strong>
                  </div>
                  <button
                     type="button"
                     className={`${style.floatingAdd} ${inCart ? style.floatingAdded : ""}`}
                     onClick={() => addToCart(featured)}
                     aria-label={inCart ? `${featured.name} já está no carrinho` : `Adicionar ${featured.name} ao carrinho`}
                  >
                     {inCart ? <FiCheck size={16} strokeWidth={2.75} /> : <FiPlus size={18} strokeWidth={2.5} />}
                  </button>
               </div>
            )}
         </div>
      </section>
   )
}
