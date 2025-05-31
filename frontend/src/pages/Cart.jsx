import { useEffect, useState } from 'react';

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
    const updateCart = () => {
      setCart(JSON.parse(localStorage.getItem('cart') || '[]'));
    };
    window.addEventListener('cartUpdated', updateCart);
    return () => window.removeEventListener('cartUpdated', updateCart);
  }, []);

  const handleRemove = (id) => {
    const newCart = cart.filter(item => item._id !== id);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  if (cart.length === 0) {
    return <div className="container-custom py-8">Your cart is empty.</div>;
  }

  return (
    <div className="container-custom py-8">
      <h1 className="heading-lg mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 gap-6 max-w-2xl mx-auto">
        {cart.map(item => (
          <div key={item._id} className="card p-4 flex items-center gap-4">
            <img src={item.images[0]} alt={item.name} className="w-24 h-24 object-cover rounded" />
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="text-gray-600">${item.price}</p>
              <p className="text-gray-500 text-sm">Quantity: {item.quantity}</p>
            </div>
            <button
              className="btn btn-danger"
              onClick={() => handleRemove(item._id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cart; 