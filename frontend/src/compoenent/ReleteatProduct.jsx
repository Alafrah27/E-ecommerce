import { useEffect, useState } from "react";
import { UseProducts } from "../hooks/useProduct/UseProduct";
import ProductList from "../compoenent/ProductList";

function RelatedProduct({ category }) {
  const { Products } = UseProducts();
  const [relatedItems, setRelatedItems] = useState([]);

  useEffect(() => {
    const filteredItems = Products?.product?.filter(
      (product) => product?.category?.name === category
    );

    setRelatedItems(filteredItems);
  }, [category, Products]);

  // If no related items, return null or a message
  if (relatedItems?.length === 0) {
    return <h1>No related items found</h1>;
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8 my-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
        Related Products
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {relatedItems &&
          relatedItems.map((product) => (
            <ProductList key={product.productId} product={product} />
          ))}
      </div>
    </div>
  );
}

export default RelatedProduct;
