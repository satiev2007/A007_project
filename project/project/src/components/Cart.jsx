import React from "react";

function Cart({ cart = [], removeFromCart }) { // <- default [] если не передан
  const totalSum = cart.reduce((sum, item) => sum + Number(item.totalPrice), 0);

  return (
    <div className="card cart-card p-3">
      <h4>Корзина</h4>
      {cart.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {cart.map((item, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{item.name}</strong> ({item.quantity}{item.unit})<br />
                  Цена: {item.totalPrice} сом
                </div>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => removeFromCart(index)}
                >
                  Удалить
                </button>
              </li>
            ))}
          </ul>
          <h5>Итого: {totalSum.toFixed(2)} сом</h5>
        </>
      )}
    </div>
  );
}

export default Cart;
