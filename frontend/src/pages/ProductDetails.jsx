import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [addSuccess, setAddSuccess] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Product not found');
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (!product || product.stock < 1) return;
    // Get cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    // Check if product already in cart
    const existing = cart.find(item => item._id === product._id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    // Optimistically update UI
    setProduct(prev => ({ ...prev, stock: prev.stock - 1 }));
    setAddSuccess('Added to cart!');
    window.dispatchEvent(new Event('cartUpdated'));
    setTimeout(() => setAddSuccess(''), 1500);
  };

  if (loading) return <div className="container-custom py-8">Loading...</div>;
  if (error) return <div className="container-custom py-8 text-red-600">{error}</div>;
  if (!product) return null;

  return (
    <div className="container-custom py-8">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <img src={product.images[0]} alt={product.name} className="w-full h-96 object-cover rounded-lg" />
        <div>
          <h1 className="heading-lg mb-4">{product.name}</h1>
          <p className="text-2xl text-gray-900 mb-4">${product.price}</p>
          <p className="mb-6 text-gray-700">{product.description}</p>
          <div className="mb-4">
            <span className="font-semibold">Sizes:</span>
            <span className="ml-2">{product.sizes && product.sizes.length > 0 ? product.sizes.join(', ') : 'N/A'}</span>
          </div>
          <div className="mb-4">
            <span className="font-semibold">Colors:</span>
            <span className="ml-2">{product.colors && product.colors.length > 0 ? product.colors.join(', ') : 'N/A'}</span>
          </div>
          <div className="mb-4">
            <span className="font-semibold">Stock:</span>
            <span className="ml-2">{product.stock}</span>
          </div>
          <button
            className="btn btn-primary mt-4"
            onClick={handleAddToCart}
            disabled={product.stock < 1}
          >
            {product.stock < 1 ? 'Out of Stock' : 'Add to Cart'}
          </button>
          {addSuccess && <div className="text-green-600 mt-2">{addSuccess}</div>}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails; 