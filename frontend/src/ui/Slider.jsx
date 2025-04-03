import { useState, useEffect } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slider = [
    {
      id: 0,
      img: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80",
      alt: "Tech image 1",
    },
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
      alt: "Tech image 2",
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80",
      alt: "Tech image 3",
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2253&q=80",
      alt: "Tech image 4",
    },
    {
      id: 4,
      img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80",
      alt: "Tech image 5",
    },
  ];

  const prevSlide = () => {
    const newIndex = currentIndex === 0 ? slider.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const newIndex = currentIndex === slider.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className=" max-w-[2000px] mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Main Slider */}
        <div className="w-full lg:w-3/4 h-[200px] md:h-[400px] lg:h-[500px] relative group">
          {/* Left Arrow */}
          <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 z-10">
            <button
              className="rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-black/40 transition-colors"
              onClick={prevSlide}
              aria-label="Previous slide"
            >
              <BsChevronCompactLeft size={30} />
            </button>
          </div>

          {/* Images */}
          {slider.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={slide.img}
                alt={slide.alt}
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          ))}

          {/* Right Arrow */}
          <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 z-10">
            <button
              className="rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-black/40 transition-colors"
              onClick={nextSlide}
              aria-label="Next slide"
            >
              <BsChevronCompactRight size={30} />
            </button>
          </div>

          {/* Dots indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {slider.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-white" : "bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Side Images */}
        <div className="hidden lg:flex flex-col gap-4 w-1/4">
          <div className="h-[242px] overflow-hidden rounded-lg shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2015&q=80"
              alt="Featured product 1"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="h-[242px] overflow-hidden rounded-lg shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
              alt="Featured product 2"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Slider;
