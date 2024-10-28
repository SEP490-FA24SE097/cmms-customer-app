import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const fakeData = [
    {
      title: "Cơ bản",
      imgSrc: "https://gachtrangtridep.net/wp-content/uploads/2021/05/1-bao-xi-mang-nang-bao-nhieu-kg.jpg",
      items: ["Headlights", "Tail Lights", "Fog Lights", "Turn Signals", "Switches & Relays"]
    },
    {
      title: "Kết cấu",
      imgSrc: "https://phugiachongtham.net/kcfinder/upload/images/phu-gia-be-tong-phun-PCON-1kg.jpg",
      items: ["Fuel Pumps", "Motor Oil", "Spark Plugs", "Fuel Injector", "Control Motor"]
    },
    {
      title: "Hoàn thiện",
      imgSrc: "https://product.hstatic.net/1000288788/product/z2232844194712_ca52107a4642158d6aa441f76762b512_34e0d44951264bc0b24038e47761bfda_master.jpg",
      items: ["Bumpers", "Hoods", "Grilles", "Fog Lights", "Door Handles"]
    }
];  

const HomePage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? sliders.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === sliders.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const sliders = [
    { url: '/banner1.jpg' },
    { url: '/banner2.jpg' },
    { url: '/banner3.jpg' },
    { url: '/banner4.jpg' },
    { url: '/banner5.jpg' },
  ];

  return (
    <section className="bg-gray-100">
        <div className="max-w-[85%] sm:h-[700px] h-[40vh]  w-full m-auto py-5 px-4 relative group">
            <div
                style={{ backgroundImage: `url(${sliders[currentIndex].url})` }}
                className="w-full h-full rounded-xl bg-center bg-cover duration-500"
            >
                <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-10 text-xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                <FaChevronLeft onClick={prevSlide} size={30} />
                </div>
                <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-10 text-xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                <FaChevronRight onClick={nextSlide} size={30} />
                </div>
                <div className="flex absolute bottom-7 left-1/2 transform -translate-x-1/2 justify-center py-2 gap-5">
                {sliders.map((slide, slideIndex) => (
                    <div
                    key={slideIndex}
                    onClick={() => goToSlide(slideIndex)}
                    className={`hidden group-hover:block p-2 border-2 rounded-full cursor-pointer ${currentIndex === slideIndex ? 'bg-red-300 border-red-300' : ''}`}
                    ></div>
                ))}
                </div>
            </div>
        </div>
        
        <div>           
            <div className="flex items-center justify-center p-5 w-[50%] mx-auto border-b-2">
                    <h2 className="text-xl sm:text-xl lg:text-3xl font-bold">Vật liệu xây dựng</h2>
            </div> 
            <div className="my-5 py-5 max-w-[80%] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {fakeData.map((category, index) => (
                        <div key={index} className="bg-white flex justify-around p-6 rounded-lg shadow-md">
                        <div className="flex items-center justify-center">
                            <img
                                alt={`Image for ${category.title}`}
                                className="mx-auto mb-4 object-cover"
                                height="200"
                                src={category.imgSrc}
                                width="200"
                            />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                            <ul className="list-disc list-inside text-gray-600 mb-4">
                                {category.items.map((item, itemIndex) => (
                                <li key={itemIndex}>{item}</li>
                                ))}
                            </ul>
                            <a className="text-blue-600" href="#">
                                Shop All
                            </a>
                        </div>
                        </div>
                    ))}
                </div>
            </div>     
        </div>        
        <div>           
            <div className="flex items-center justify-center p-5 w-[50%] mx-auto border-b-2">
                    <h2 className="text-xl sm:text-xl lg:text-3xl font-bold">Sản phẩm mới</h2>
            </div> 
            <div className="my-5 py-5 max-w-[80%] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {fakeData.map((category, index) => (
                        <div key={index} className="bg-white flex justify-around p-6 rounded-lg shadow-md">
                        <div className="flex items-center justify-center">
                            <img
                                alt={`Image for ${category.title}`}
                                className="mx-auto mb-4 object-cover"
                                height="200"
                                src={category.imgSrc}
                                width="200"
                            />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                            <ul className="list-disc list-inside text-gray-600 mb-4">
                                {category.items.map((item, itemIndex) => (
                                <li key={itemIndex}>{item}</li>
                                ))}
                            </ul>
                            <a className="text-blue-600" href="#">
                                Shop All
                            </a>
                        </div>
                        </div>
                    ))}
                </div>
            </div>     
        </div> 
        
    </section>

  );
};

export default HomePage;
