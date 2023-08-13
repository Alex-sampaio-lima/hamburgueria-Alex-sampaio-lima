import { useState } from "react"
import Logo from "../../assets/Logo.svg"
import style from "./style.module.scss"
import cart from "../../assets/cart.svg"
import searchButton from "../../assets/searchButton.svg"

export const Header = ({ cartList, setIsOpen, productList, setProductList }) => {
   const [value, setValue] = useState("")

   const filterProducts = () => {
      const productsFiltered = productList.filter((product) => {
         return product.name === value
      })
      setProductList(productsFiltered)
   }


   return (
      <header className={`${style.headerContainer} spaceSection`}>
         <img className={`${style.imgContainer}`} src={Logo} alt="Logo Kenzie Burguer" />
         <div className={`${style.searchContainer}`} >
            <button className={`${style.buttonCart}`} onClick={() => setIsOpen(true)}>
               <img src={cart} alt="Logo do carrinho de compras " />
               <span className={`${style.countCart}`}>{cartList.length}</span>
            </button>
            <form className={`${style.formContainer}`}>
               <input
                  className={`${style.inputHeader}`}
                  type="text"
                  value={value}
                  placeholder="Digite sua pesquisa"
                  onChange={(e) => setValue(e.target.value)}
               />
               <button className={`${style.buttonSearch}`} type="submit" onClick={(event) => {
                  filterProducts()
                  event.preventDefault()
               }}>
                  <img src={searchButton} alt="Imagem do botão de pesquisa" />
               </button>
            </form>
         </div>
      </header>
   )
}
