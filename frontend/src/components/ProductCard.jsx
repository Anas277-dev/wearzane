import React, { useState } from 'react';

const ProductCard = ({ product }) => {
  // Safe check: agar images array nahi hai ya khali hai
  const images = product.images || ["https://via.placeholder.com/300"];
  const [currentImage, setCurrentImage] = useState(images[0]);

  return (
    <div className="group cursor-pointer">
      <div 
        className="relative overflow-hidden bg-gray-100 rounded-lg aspect-[3/4]"
        onMouseEnter={() => images[1] && setCurrentImage(images[1])}
        onMouseLeave={() => setCurrentImage(images[0])}
      >
        <img 
          src={currentImage} 
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-700 uppercase tracking-widest">{product.name}</h3>
        <p className="mt-1 text-lg font-semibold text-gray-900">Rs. {product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard; // <--- Yeh line bohat zaroori hai!