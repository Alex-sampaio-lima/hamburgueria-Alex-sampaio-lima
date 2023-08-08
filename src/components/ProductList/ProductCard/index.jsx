export const ProductCard = ({ product }) => {

    const addToCart = () => {
        localStorage.setItem("@ProductList", JSON.stringify(product))
    }
    
    return (
        <li>
            <img src={product.img} alt={product.name} />
            <div>
                <h3>{product.name}</h3>
                <span>{product.category}</span>
                <span>{product.price.toLocaleString('pt-BR', { style: "currency", currency: "BRL" })}</span>
                <button onClick={addToCart}>Adicionar</button>
            </div>
        </li>
    )
}