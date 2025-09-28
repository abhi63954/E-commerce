import { IoCartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCart = ({ Products }) => {
  const navigate = useNavigate();
  const { addToCart, cartitem} = useCart();
  // console.log(cartitem);
  
  return (
    <div className="border relative border-gray-100 rounded-2xl cursor-pointer hover:scale-105 hover:shadow-2xl transition-all p-2 h-96">
      <img
        src={Products.image}
        alt=""
        className="bg-gray-100 aspect-square"
        onClick={() => navigate(`/products/${Products.id}`)}
      />

      <div className="h-[95px]">
        {" "}
        <h1 className="line-clamp-2 p-1 font-semibold">{Products.title}</h1>
        <p className="my-1 text-lg text-gray-800 font-bold">
          ${Products.price}
        </p>
      </div>
      <div className="mt-4">
        <button
          onClick={() => addToCart(Products)}
          className="bg-red-500 px-3 py-2 text-lg rounded-md  text-white w-full cursor-pointer flex gap-1 items-center justify-center font-semibold mt-auto"
        >
          <IoCartOutline className="w-6 h-6" />
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCart;
