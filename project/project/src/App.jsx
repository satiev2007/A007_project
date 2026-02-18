import React, { useState } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");

  const baseProducts = [
    { name: "Помидоры", price: 320, type: "Овощи" },
    { name: "Огурцы", price: 280, type: "Овощи" },
    { name: "Картофель", price: 120, type: "Овощи" },
    { name: "Морковь", price: 150, type: "Овощи" },
    { name: "Капуста", price: 180, type: "Овощи" },
    { name: "Лук", price: 100, type: "Овощи" },
    { name: "Свекла", price: 140, type: "Овощи" },
    { name: "Чеснок", price: 200, type: "Овощи" },
    { name: "Брокколи", price: 300, type: "Овощи" },
    { name: "Цветная капуста", price: 310, type: "Овощи" },
    { name: "Редис", price: 160, type: "Овощи" },
    { name: "Перец", price: 250, type: "Овощи" },
    { name: "Кукуруза", price: 220, type: "Овощи" },
    { name: "Горох", price: 180, type: "Овощи" },
    { name: "Фасоль", price: 200, type: "Овощи" },
    { name: "Шпинат", price: 210, type: "Овощи" },
    { name: "Сельдерей", price: 190, type: "Овощи" },
    { name: "Кабачок", price: 170, type: "Овощи" },
    { name: "Баклажан", price: 230, type: "Овощи" },
    { name: "Репа", price: 160, type: "Овощи" },
    { name: "Яблоки", price: 220, type: "Фрукты" },
    { name: "Бананы", price: 190, type: "Фрукты" },
    { name: "Апельсины", price: 260, type: "Фрукты" },
    { name: "Арбуз", price: 400, type: "Фрукты" },
    { name: "Дыня", price: 380, type: "Фрукты" },
    { name: "Груши", price: 230, type: "Фрукты" },
    { name: "Виноград", price: 270, type: "Фрукты" },
    { name: "Персики", price: 300, type: "Фрукты" },
    { name: "Нектарины", price: 310, type: "Фрукты" },
    { name: "Киви", price: 250, type: "Фрукты" },
    { name: "Мандарины", price: 240, type: "Фрукты" },
    { name: "Ананас", price: 450, type: "Фрукты" }
  ];

  // Генерация карточек: по 3 на каждый продукт → 33×3 ≈ 99 карточек
  const products = baseProducts.flatMap((product) =>
    Array.from({ length: 3 }, (_, index) => ({
      ...product,
      id: product.name + "-" + (index + 1),
      maxQuantity: 1000
    }))
  );

  // Фильтрация по поиску
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  return (
    <div className="app-wrapper">
      <div className="app-content">
        <h1 className="title">
          🛫 Система заказа продуктов
          <span>Столовая : Дасторкон</span>
        </h1>

        <div className="search-bar mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Поиск фруктов и овощей..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="layout">
          <div className="products">
            <ProductList products={filteredProducts} addToCart={addToCart} />
          </div>

          <div className="cart">
            <Cart cart={cart} removeFromCart={removeFromCart} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
