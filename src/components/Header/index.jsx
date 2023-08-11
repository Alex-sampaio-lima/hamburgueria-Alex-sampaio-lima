import { useState } from "react";
import Logo from "../../assets/Logo.svg";
import { MdSearch, MdShoppingCart } from "react-icons/md";

export const Header = ({ setIsOpen, count, productList, setProductList }) => {
   const [value, setValue] = useState("")
   const [filteredItem, setfilteredItem] = useState([])


   const filterProducts = () => {
      productList.filter((product) => {
         product.name == value
         return setProductList([...productList,])
      })
   }

   console.log(productList)
   console.log(value)

   return (
      <header>
         <img src={Logo} alt="Logo Kenzie Burguer" />
         <div>
            <button onClick={() => setIsOpen(true)}>
               <MdShoppingCart size={21} />
               <span>{count}</span>
            </button>
            <form>
               <input
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
               />
               <button type="submit" onClick={() => filterProducts()}>
                  <MdSearch size={21} />
               </button>
            </form>
         </div>
      </header>
   );
};
