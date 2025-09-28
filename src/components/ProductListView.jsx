import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductListView({ product }) {
  const navigate = useNavigate();
  const {addToCart} = useCart();
  return (
    <div className="space-y-4 mt-2 rounded-md">
      <div className="bg-gray-100 flex gap-7 items-center p-2 rounded-md">
        <img
          src={product.image}
          alt={product.title}
          className="md:h-60 md:w-60 h-25 w-25 rounded-md cursor-pointer "
          onClick={() => navigate(`/products/${product.id}`)}
        />
        <div className="space-y-2">
          <h1 className="font-bold text-lg md:text-xl line-clamp-3 hover:text-red-400 md:w-full w-[220px]">{product.title}</h1>
          <p className="font-semibold flex items-center md:text-lg text-sm">$<span className="md:text-4xl text-3xl">{product.price}</span>(20% OFF)</p>
          <p className="text-sm">FREE delivery <span className="font-semibold">Fri, 18 Apr</span> <br /> or fastest deliver <span className="font-semibold">Tommorrow, 17 Apr</span></p>
          <button onClick={() => addToCart(product)} className="bg-red-500 text-white rounded-md px-3 py-1">Add to cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductListView;
