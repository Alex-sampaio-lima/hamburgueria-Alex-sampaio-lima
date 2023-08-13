import style from "../ProductCard/style.module.scss"

export const ProductCard = ({ product, addToCart }) => {

    return (
        <li className={`${style.productsContainer}`}>
            <img className={`${style.productImg}`} src={product.img} alt={product.name} />
            <div>
                <h3 className="heading three">{product.name}</h3>
                <span className="headline">{product.category}</span>
                <span className="buttonPriceText">{product.price.toLocaleString('pt-BR', { style: "currency", currency: "BRL" })}</span>
                <button className="button-primary" onClick={() => addToCart(product)}>Adicionar</button>
            </div>
        </li>
    )
}