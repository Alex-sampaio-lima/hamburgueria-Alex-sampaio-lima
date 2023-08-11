import { useEffect, useState } from "react"
import { CartModal } from "../../components/CartModal"
import { Header } from "../../components/Header"
import { ProductList } from "../../components/ProductList"
import { toast } from 'react-toastify';

export const HomePage = () => {
   const [productList, setProductList] = useState([])
   const [cartList, setCartList] = useState([])
   const [isOpen, setIsOpen] = useState(false)
   const [count, setCount] = useState(0)



   useEffect(() => {
      const getProducts = async () => {
         const response = await fetch("https://hamburgueria-kenzie-json-serve.herokuapp.com/products/")
         const json = await response.json()
         setProductList(json)
      }
      getProducts()
   }, [])

   useEffect(() => {
      localStorage.getItem("@ProductList", JSON.stringify(productList))
   }, [productList])

   const addToCart = (product) => {
      if (!cartList.some(addProduct => addProduct.id === product.id)) {
         setCartList([...cartList, product])
         localStorage.setItem("@ProductList", JSON.stringify([...cartList, product]))
         setCount(count + 1)
         toast("Produto adicionado no carrinho")
      } else {
         toast("Produto já existe no carrinho")
      }
   }





   // useEffect montagem - carrega os produtos da API e joga em productList 
   // useEffect atualização - salva os produtos no localStorage (carregar no estado)
   // adição, exclusão, e exclusão geral do carrinho
   // renderizações condições e o estado para exibir ou não o carrinho
   // filtro de busca
   // estilizar tudo com sass de forma responsiva



   return (
      <>
         <Header setIsOpen={setIsOpen} count={count} productList={productList} setProductList={setProductList}></Header>
         <main>
            <ProductList productList={productList} addToCart={addToCart} />
            {isOpen ? <CartModal setIsOpen={setIsOpen} cartList={cartList} ></CartModal> : null}
         </main>
      </>
   )
}
