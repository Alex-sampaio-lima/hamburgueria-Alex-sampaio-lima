import { useEffect, useState } from "react"
import { CartModal } from "../../components/CartModal"
import { Header } from "../../components/Header"
import { ProductList } from "../../components/ProductList"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { api } from "../../services/api"


export const HomePage = () => {
   const localCartList = localStorage.getItem("@cartList")
   const [productList, setProductList] = useState([])
   const [cartList, setCartList] = useState(localCartList ? JSON.parse(localCartList) : [])
   const [isOpen, setIsOpen] = useState(false)
   const [value, setValue] = useState("")


   useEffect(() => {
      const getProducts = async () => {
         const { data } = await api.get("/products", { params: { name_like: value } })
         setProductList(data)
      }
      getProducts()
   }, [value])

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
   }


   const removeAllFromCart = () => {
      setCartList([])
      setCount(0)
   }

   return (
      <>
         <ToastContainer />
         <Header value={value} setValue={setValue} cartList={cartList} setIsOpen={setIsOpen} productList={productList} setProductList={setProductList}></Header>
         <main>
            <ProductList productList={productList} addToCart={addToCart} />
            {isOpen ? <CartModal setIsOpen={setIsOpen} cartList={cartList} removeToCart={removeToCart} removeAllFromCart={removeAllFromCart} ></CartModal> : null}
         </main>
      </>
   )
}
