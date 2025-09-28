import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartitem, setcartItem] = useState([]);

  const addToCart = (product) => {
    const itemInCart = cartitem.find((item) => item.id === product.id);
    if (itemInCart) {
      const updatedCart = cartitem.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setcartItem(updatedCart);
      toast.success("Product quantity increased!")
    } else {
      setcartItem([...cartitem, { ...product, quantity: 1 }]);
      toast.success("Product is added to cart!")
    }
  };
  const updateQuantity = (cartitem, productId, action) => {
    setcartItem(
      cartitem
        .map((item) => {
          if (item.id === productId) {
            let newUnit = item.quantity;
            if (action === "increase") {
              newUnit = newUnit + 1
              toast.success("Quantity is increased!")
            } else if (action === "decrease") {
              newUnit = newUnit - 1
              toast.success("Quantity is decreased!")
            }
            return newUnit > 0 ? { ...item, quantity: newUnit } : null;
          }
          return item;
        })
        .filter((item) => item != null)
    );
  };
  const deleteItem = (productId)=>{
    setcartItem(cartitem.filter((item)=> item.id != productId))
    toast.success("Product is deleted from cart!")
  }
  return (
    <CartContext.Provider
      value={{ cartitem, setcartItem, addToCart, updateQuantity, deleteItem}}
    >
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => useContext(CartContext);
