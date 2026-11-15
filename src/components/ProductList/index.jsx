import { ProductCard } from "./ProductCard"
import style from "./style.module.scss"

export const ProductList = ({
   productList,
   addToCart,
   cartIds,
   loading,
   categories,
   category,
   setCategory,
   onClearFilters,
}) => {
   const count = productList.length

   return (
      <section id="cardapio" className={style.section} aria-labelledby="menu-title">
         <div className={style.top}>
            <div>
               <h2 id="menu-title" className={style.title}>Cardápio</h2>
               {!loading && <p className={style.count}>{count} {count === 1 ? "item" : "itens"}</p>}
            </div>
         </div>

         <div className={style.chips} role="group" aria-label="Filtrar por categoria">
            {categories.map((name) => (
               <button
                  key={name}
                  type="button"
                  className={`${style.chip} ${name === category ? style.chipActive : ""}`}
                  aria-pressed={name === category}
                  onClick={() => setCategory(name)}
               >
                  {name}
               </button>
            ))}
         </div>

         {loading ? (
            <ul className={style.grid} aria-busy="true">
               {Array.from({ length: 8 }, (_, i) => <li key={i} className={style.skeleton} />)}
            </ul>
         ) : count === 0 ? (
            <div className={style.empty}>
               <p>Nenhum produto encontrado.</p>
               <button type="button" onClick={onClearFilters}>Limpar filtros</button>
            </div>
         ) : (
            <ul className={style.grid}>
               {productList.map((product, index) => (
                  <ProductCard
                     key={product.id}
                     index={index}
                     product={product}
                     inCart={cartIds.has(product.id)}
                     addToCart={addToCart}
                  />
               ))}
            </ul>
         )}
      </section>
   )
}
