import { useState } from "react"
import Logo from "../../assets/Logo.svg"
import { MdSearch, MdShoppingCart } from "react-icons/md"
import style from "./style.module.scss"


export const Header = ({ cartList, setIsOpen, productList, setProductList }) => {
   const [value, setValue] = useState("")
   // const [filteredItem, setfilteredItem] = useState([])

   const filterProducts = () => {
      const productsFiltered = productList.filter((product) => {
         return product.name === value
      })
      setProductList(productsFiltered)
   }


   return (
      <header className={`${style.headerContainer}`}>
         <img className={`${style.imgContainer}`} src={Logo} alt="Logo Kenzie Burguer" />
         <div className={`${style.searchContainer}`} >
            <button className={`${style.buttonCart}`} onClick={() => setIsOpen(true)}>
               <MdShoppingCart size={21} />
               <span>{cartList.length}</span>
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
                  <MdSearch size={21} />
               </button>
            </form>
         </div>
      </header>
   );
};
