import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function MenProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => {
        setProducts(res.data.filter(p => p.category === 'men'));
      });
  }, []);

  return (
    <div className="container-custom py-8">
      <h1 className="heading-lg mb-8">Men's Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map(product => (
          <Link to={`/product/${product._id}`} key={product._id} className="card p-4 hover:shadow-lg transition">
            <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover rounded mb-2" />
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-gray-600">${product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MenProducts; 