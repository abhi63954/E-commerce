import React, { useEffect, useState } from "react";
import Loading from "../assets/Loading4.webm";
import { getData } from "../context/DataContext";
import FilterSection from "../components/FilterSection";
import ProductCart from "../components/ProductCart";
import Pagination from "../components/Pagination";
import Lottie from "lottie-react";
import notfound from "../assets/notfound.json";
import MobileFilter from "../components/MobileFilter";

const Products = () => {
  const { data, fetchAllProducts } = getData();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [pricerange, setPriceRange] = useState([0, 5000]);
  const [page, setpage] = useState(1);
  const [openFilter, setOpenFilter] = useState(false);

  useEffect(() => {
    fetchAllProducts();
    window.scroll(0, 0);
  }, []);
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setpage(1);
    setOpenFilter(false);
  };
  const handleBrandChange = (e) => {
    setBrand(e.target.value);
    setpage(1);
    setOpenFilter(false);
  };
  const pageHandler = (selectedpage) => {
    setpage(selectedpage);
    window.scrollTo(0, 0);
  };
  const filterdata = data?.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLocaleLowerCase()) &&
      (category === "All" || item.category === category) &&
      (brand === "All" || item.brand === brand) &&
      item.price >= pricerange[0] &&
      item.price <= pricerange[1]
  );
  const dynamicPage = Math.ceil(filterdata?.length / 8);

  return (
    <div>
      <div className="max-w-6xl mx-auto px-4 mb-10">
        <MobileFilter
          openFilter={openFilter}
          setOpenFilter={setOpenFilter}
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          brand={brand}
          setBrand={setBrand}
          pricerange={pricerange}
          setPriceRange={setPriceRange}
          handleCategoryChange={handleCategoryChange}
          handleBrandChange={handleBrandChange}
        />
        {data?.length > 0 ? (
          <>
            <div className="flex gap-8">
              <FilterSection
                search={search}
                setSearch={setSearch}
                category={category}
                setCategory={setCategory}
                brand={brand}
                setBrand={setBrand}
                pricerange={pricerange}
                setPriceRange={setPriceRange}
                handleCategoryChange={handleCategoryChange}
                handleBrandChange={handleBrandChange}
              />
              {filterdata?.length > 0 ? (
                <div className="flex flex-col justify-center items-center">
                  {" "}
                  <div className="grid grid-cols-2  md:grid-cols-4 gap-2 md:gap-7 mt-10">
                    {filterdata
                      ?.slice(page * 8 - 8, page * 8)
                      .map((Product, index) => {
                        return <ProductCart key={index} Products={Product} />;
                      })}
                  </div>
                  <Pagination
                    pageHandler={pageHandler}
                    page={page}
                    dynamicPage={dynamicPage}
                  />
                </div>
              ) : (
                <div className="flex justify-center items-center md:h-[600px] md:w-[900px] mt-10">
                  <Lottie animationData={notfound} classID="w-[500px]" />
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-[400px]">
            <video muted autoPlay loop>
              <source src={Loading} type="video/webm" />
            </video>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
