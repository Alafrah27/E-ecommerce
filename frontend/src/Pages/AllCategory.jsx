

import ProductList from "../compoenent/ProductList";
import SearchInput from "../compoenent/Search";
import Footer from "../compoenent/footer";

import { UseProducts } from "../hooks/useProduct/UseProduct";

// const products = [
//   {
//     id: 1,
//     name: "Premium Wireless Headphones",
//     price: 299.99,
//     rating: 4.8,
//     image:
//       "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
//     category: "Electronics",
//   },
//   {
//     id: 2,
//     name: "Smart Watch Series X",
//     price: 399.99,
//     rating: 4.9,
//     image:
//       "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
//     category: "Electronics",
//   },
//   {
//     id: 3,
//     name: "4K Ultra HD Camera",
//     price: 899.99,
//     rating: 4.7,
//     image:
//       "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
//     category: "Electronics",
//   },
//   {
//     id: 4,
//     name: "Gaming Laptop Pro",
//     price: 1299.99,
//     rating: 4.9,
//     image:
//       "https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
//     category: "Electronics",
//   },
//   {
//     id: 5,
//     name: "Wireless Earbuds",
//     price: 159.99,
//     rating: 4.6,
//     image:
//       "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
//     category: "Electronics",
//   },
//   {
//     id: 6,
//     name: "Smart Home Hub",
//     price: 129.99,
//     rating: 4.5,
//     image:
//       "https://images.unsplash.com/photo-1558089687-f282ffcbc126?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
//     category: "Electronics",
//   },
//   {
//     id: 6,
//     name: "Smart Home Hub",
//     price: 129.99,
//     rating: 4.5,
//     image:
//       "https://images.unsplash.com/photo-1558089687-f282ffcbc126?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
//     category: "Electronics",
//   },
//   {
//     id: 6,
//     name: "Smart Home Hub",
//     price: 129.99,
//     rating: 4.5,
//     image:
//       "https://images.unsplash.com/photo-1558089687-f282ffcbc126?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
//     category: "Electronics",
//   },
//   {
//     id: 6,
//     name: "Smart Home Hub",
//     price: 129.99,
//     rating: 4.5,
//     image:
//       "https://images.unsplash.com/photo-1558089687-f282ffcbc126?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
//     category: "Electronics",
//   },
//   {
//     id: 6,
//     name: "Smart Home Hub",
//     price: 129.99,
//     rating: 4.5,
//     image:
//       "https://images.unsplash.com/photo-1558089687-f282ffcbc126?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
//     category: "Electronics",
//   },
//   {
//     id: 6,
//     name: "Smart Home Hub",
//     price: 129.99,
//     rating: 4.5,
//     image:
//       "https://images.unsplash.com/photo-1558089687-f282ffcbc126?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
//     category: "Electronics",
//   },
//   {
//     id: 6,
//     name: "Smart Home Hub",
//     price: 129.99,
//     rating: 4.5,
//     image:
//       "https://images.unsplash.com/photo-1558089687-f282ffcbc126?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
//     category: "Electronics",
//   },
//   {
//     id: 6,
//     name: "Smart Home Hub",
//     price: 129.99,
//     rating: 4.5,
//     image:
//       "https://images.unsplash.com/photo-1558089687-f282ffcbc126?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
//     category: "Electronics",
//   },
//   {
//     id: 6,
//     name: "Smart Home Hub",
//     price: 129.99,
//     rating: 4.5,
//     image:
//       "https://images.unsplash.com/photo-1558089687-f282ffcbc126?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
//     category: "Electronics",
//   },
//   {
//     id: 6,
//     name: "Smart Home Hub",
//     price: 129.99,
//     rating: 4.5,
//     image:
//       "https://images.unsplash.com/photo-1558089687-f282ffcbc126?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
//     category: "Electronics",
//   },
//   {
//     id: 6,
//     name: "Smart Home Hub",
//     price: 129.99,
//     rating: 4.5,
//     image:
//       "https://images.unsplash.com/photo-1558089687-f282ffcbc126?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
//     category: "Electronics",
//   },
//   {
//     id: 6,
//     name: "Smart Home Hub",
//     price: 129.99,
//     rating: 4.5,
//     image:
//       "https://images.unsplash.com/photo-1558089687-f282ffcbc126?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
//     category: "Electronics",
//   },
//   {
//     id: 6,
//     name: "Smart Home Hub",
//     price: 129.99,
//     rating: 4.5,
//     image:
//       "https://images.unsplash.com/photo-1558089687-f282ffcbc126?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
//     category: "Electronics",
//   },
//   {
//     id: 6,
//     name: "Smart Home Hub",
//     price: 129.99,
//     rating: 4.5,
//     image:
//       "https://images.unsplash.com/photo-1558089687-f282ffcbc126?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
//     category: "Electronics",
//   },
//   {
//     id: 6,
//     name: "Smart Home Hub",
//     price: 129.99,
//     rating: 4.5,
//     image:
//       "https://images.unsplash.com/photo-1558089687-f282ffcbc126?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
//     category: "Electronics",
//   },
//   {
//     id: 6,
//     name: "Smart Home Hub",
//     price: 129.99,
//     rating: 4.5,
//     image:
//       "https://images.unsplash.com/photo-1558089687-f282ffcbc126?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
//     category: "Electronics",
//   },
//   {
//     id: 6,
//     name: "Smart Home Hub",
//     price: 129.99,
//     rating: 4.5,
//     image:
//       "https://images.unsplash.com/photo-1558089687-f282ffcbc126?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
//     category: "Electronics",
//   },
// ];

function AllCategory() {
  const { Product } = UseProducts();
  const shawCategory =
    Product?.product?.filter((product) => product.category) || [];

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <SearchInput />
        <h1>filter</h1>
      </div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          All Category
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4   gap-6">
        {shawCategory?.map((product) => (
          <ProductList key={product.id} product={product} />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default AllCategory;
