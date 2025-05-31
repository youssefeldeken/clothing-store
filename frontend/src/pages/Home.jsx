import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [menProducts, setMenProducts] = useState([]);

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      title: 'Spring Collection 2023',
      description: 'Discover our latest designs crafted with precision and passion',
      link: '/new-arrivals',
    },
    {
      image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      title: 'Timeless Elegance',
      description: 'Crafted for those who appreciate the finer details',
      link: '/featured',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => {
        setMenProducts(res.data.filter(p => p.category === 'men'));
      });
  }, []);

  const newArrivals = [
    {
      id: 1,
      name: 'Silk Blouse',
      price: 189.00,
      image: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    },
    {
      id: 2,
      name: 'Tailored Suit',
      price: 499.00,
      image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    },
    {
      id: 3,
      name: 'Cashmere Sweater',
      price: 249.00,
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    },
    {
      id: 4,
      name: 'Leather Jacket',
      price: 399.00,
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    },
  ];

  return (
    <div className="min-h-screen animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-screen-75 overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center text-center">
              <div className="max-w-4xl px-4 sm:px-6 lg:px-8">
                <h1 className="heading-xl text-white mb-6 text-shadow-lg">{slide.title}</h1>
                <p className="text-xl md:text-2xl text-white mb-8 text-shadow">{slide.description}</p>
                <Link
                  to={slide.link}
                  className="btn btn-primary"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        ))}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-3 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white scale-110' : 'bg-white/50 hover:bg-white/75'
              }`}
              onClick={() => setCurrentSlide(index)}
            ></button>
          ))}
        </div>
      </section>

      {/* Featured Categories */}
      <section className="section bg-accent-light">
        <div className="container-custom">
          <h2 className="heading-lg text-center mb-12">Shop By Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Women's Category */}
            <div className="product-card h-96 group">
              <img
                src="https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                alt="Women's Collection"
                className="product-card-image"
              />
              <div className="product-card-overlay">
                <div className="text-center">
                  <h3 className="heading-md text-white mb-4">Women</h3>
                  <Link to="/women" className="btn btn-secondary">
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>

            {/* Men's Category */}
            <div className="product-card h-96 group">
              <img
                src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                alt="Men's Collection"
                className="product-card-image"
              />
              <div className="product-card-overlay">
                <div className="text-center">
                  <h3 className="heading-md text-white mb-4">Men</h3>
                  <Link to="/men" className="btn btn-secondary">
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>

            {/* Accessories Category */}
            <div className="product-card h-96 group">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Accessories"
                className="product-card-image"
              />
              <div className="product-card-overlay">
                <div className="text-center">
                  <h3 className="heading-md text-white mb-4">Accessories</h3>
                  <Link to="/accessories" className="btn btn-secondary">
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="section">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-12">
            <h2 className="heading-lg">New Arrivals</h2>
            <Link
              to="/new-arrivals"
              className="nav-link text-black"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {newArrivals.map((product) => (
              <div key={product.id} className="card animate-slide-up">
                <div className="product-card aspect-w-3 aspect-h-4 group">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-card-image rounded-t-lg"
                  />
                  <div className="product-card-overlay">
                    <button className="btn btn-secondary">
                      Quick View
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium">{product.name}</h3>
                  <p className="text-lg text-gray-900 mt-1">${product.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="section bg-accent-light">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1521747116042-5a810fda9664?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Our Story"
                className="rounded-lg shadow-medium"
              />
            </div>
            <div className="animate-slide-up">
              <h2 className="heading-lg mb-6">Our Story</h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                ÉLÉGANCE was founded with a vision to create timeless pieces that transcend seasons and
                trends. Our commitment to quality craftsmanship and sustainable practices sets us apart
                in the world of luxury fashion.
              </p>
              <Link
                to="/about"
                className="btn btn-primary"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <h2 className="text-2xl font-bold mb-4">Men's Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {menProducts.map(product => (
            <div key={product._id} className="card p-4">
              <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover rounded mb-2" />
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-gray-600">${product.price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home; 