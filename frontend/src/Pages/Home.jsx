import { Helmet } from "react-helmet";
import DisplayCategory from "../compoenent/DisplayCategory";
import CategoryProducts from "../compoenent/FeaturedProducts";
import Footer from "../compoenent/footer";
import KidsClothDisplay from "../compoenent/KidsClothDisplay";
import MenClothDisplay from "../compoenent/MenClothDisplay";
import Navbar from "../compoenent/Navbar";
import WomenDisplayCloth from "../compoenent/WomenDisplayCloth";
import Slider from "../ui/Slider";

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Welcome to Musdar E-commerce</title>
        <meta
          name="description"
          content="Discover Musdar E-commerce, your one-stop online shop for a wide range of quality products at unbeatable prices. Enjoy fast shipping, exceptional customer service, and exclusive offers. Start shopping today!"
        />
      </Helmet>
      <Navbar />
      <Slider />
      <main>
        <CategoryProducts />
        <DisplayCategory />
        <MenClothDisplay />
        <KidsClothDisplay />
        <WomenDisplayCloth />
        <Footer />
      </main>
    </div>
  );
}

export default Home;
