import { useEffect, useState } from "react"
import { CartModal } from "../../components/CartModal"
import { Header } from "../../components/Header"
import { ProductList } from "../../components/ProductList"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const HomePage = () => {
   const localCartList = localStorage.getItem("@cartList")
   const [productList, setProductList] = useState([])
   const [cartList, setCartList] = useState(localCartList ? JSON.parse(localCartList) : [])
   const [isOpen, setIsOpen] = useState(false)

   console.log(cartList)

   useEffect(() => {
      const getProducts = async () => {
         const response = await fetch("https://hamburgueria-kenzie-json-serve.herokuapp.com/products")
         const json = await response.json()
         setProductList(json)
      }
      getProducts()
   }, [])

   useEffect(() => {
      localStorage.setItem("@cartList", JSON.stringify(cartList))
   }, [cartList])

   const addToCart = (product) => {
      if (!cartList.some(addProduct => addProduct.id === product.id)) {
         setCartList([...cartList, product])
         toast.success("Produto adicionado")
      } else {
         toast.warn("Produto já existe no carrinho")
      }
   }

   const removeToCart = (removeId) => {
      const removeCart = cartList.filter(product => product.id !== removeId)
      setCartList(removeCart)
      console.log(removeId)
   }


   const removeAllFromCart = () => {
      setCartList([])
      setCount(0)
   }

   // useEffect montagem - carrega os produtos da API e joga em productList 
   // useEffect atualização - salva os produtos no localStorage (carregar no estado)
   // adição, exclusão, e exclusão geral do carrinho
   // renderizações condições e o estado para exibir ou não o carrinho
   // filtro de busca
   // estilizar tudo com sass de forma responsiva

   return (
      <>
         <ToastContainer />
         <Header cartList={cartList} setIsOpen={setIsOpen}  productList={productList} setProductList={setProductList}></Header>
         <main>
            <ProductList productList={productList} addToCart={addToCart} />
            {isOpen ? <CartModal setIsOpen={setIsOpen} cartList={cartList} removeToCart={removeToCart} removeAllFromCart={removeAllFromCart} ></CartModal> : null}
         </main>
      </>
   )
}
