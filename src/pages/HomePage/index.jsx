import { useEffect, useState } from "react"
import { CartBar } from "../../components/CartBar"
import { CartModal } from "../../components/CartModal"
import { Header } from "../../components/Header"
import { Hero } from "../../components/Hero"
import { ProductList } from "../../components/ProductList"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FiTrash2 } from "react-icons/fi"
import Logo from "../../assets/Logo.svg"
import { api } from "../../services/api"

const ALL = "Todos"
const FEATURED_ID = 3

const notifyRemoval = (message) =>
   toast(message, { icon: <FiTrash2 size={18} color="var(--color-secondary)" /> })


export const HomePage = () => {
   const localCartList = localStorage.getItem("@cartList")
   const [productList, setProductList] = useState([])
   const [cartList, setCartList] = useState(localCartList ? JSON.parse(localCartList) : [])
   const [isOpen, setIsOpen] = useState(false)
   const [value, setValue] = useState("")
   const [category, setCategory] = useState(ALL)
   const [loading, setLoading] = useState(true)


   useEffect(() => {
      const getProducts = async () => {
         try {
            const { data } = await api.get("products.json")
            setProductList(data)
         } catch (error) {
            toast.error("Não foi possível carregar os produtos")
         } finally {
            setLoading(false)
         }
      }
      getProducts()
   }, [])

   const categories = [ALL, ...new Set(productList.map((product) => product.category))]
   const search = value.trim().toLowerCase()
   const filteredProducts = productList.filter((product) =>
      (category === ALL || product.category === category) &&
      (product.name.toLowerCase().includes(search) || product.category.toLowerCase().includes(search))
   )

   const cartIds = new Set(cartList.map((product) => product.id))
   const total = cartList.reduce((sum, product) => sum + product.price, 0)
   const featured = productList.find((product) => product.id === FEATURED_ID)

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
      const removed = cartList.find(product => product.id === removeId)
      const removeCart = cartList.filter(product => product.id !== removeId)
      setCartList(removeCart)
      if (removed) notifyRemoval(`${removed.name} removido do carrinho`)
   }


   const removeAllFromCart = () => {
      const count = cartList.length
      if (count === 0) return
      setCartList([])
      notifyRemoval(count === 1 ? "1 produto removido do carrinho" : `Todos os ${count} produtos foram removidos do carrinho`)
   }

   const clearFilters = () => {
      setValue("")
      setCategory(ALL)
   }

   return (
      <>
         <ToastContainer position="bottom-right" autoClose={2200} hideProgressBar newestOnTop />
         <Header value={value} setValue={setValue} cartList={cartList} total={total} setIsOpen={setIsOpen} />
         <main>
            {!search && (
               <Hero featured={featured} inCart={featured ? cartIds.has(featured.id) : false} addToCart={addToCart} />
            )}
            <ProductList
               productList={filteredProducts}
               addToCart={addToCart}
               cartIds={cartIds}
               loading={loading}
               categories={categories}
               category={category}
               setCategory={setCategory}
               onClearFilters={clearFilters}
            />
         </main>
         <footer className="siteFooter">
            <img src={Logo} alt="Burguer Kenzie" />
            <p>© {new Date().getFullYear()} Burguer Kenzie</p>
         </footer>
         {cartList.length > 0 && !isOpen && (
            <CartBar count={cartList.length} total={total} onOpen={() => setIsOpen(true)} />
         )}
         {isOpen ? <CartModal setIsOpen={setIsOpen} cartList={cartList} removeToCart={removeToCart} removeAllFromCart={removeAllFromCart} ></CartModal> : null}
      </>
   )
}
