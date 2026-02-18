import React, { useState } from "react";

function ProductList({ products, addToCart }) {
  const [quantities, setQuantities] = useState(
    products.reduce((acc, product) => {
      acc[product.id] = 1; // начальное значение: 1 кг
      return acc;
    }, {})
  );

  const [unit, setUnit] = useState(
    products.reduce((acc, product) => {
      acc[product.id] = "kg"; // единица измерения по умолчанию
      return acc;
    }, {})
  );

  const handleQuantityChange = (id, value, max, currentUnit) => {
    let num = Number(value);
    if (currentUnit === "g") {
      num = Math.min(Math.max(num, 1), max * 1000); // ограничение в граммах
    } else {
      num = Math.min(Math.max(num, 1), max); // ограничение в кг
    }
    setQuantities({ ...quantities, [id]: num });
  };

  const handleUnitChange = (id, selectedUnit) => {
    const oldValue = quantities[id];
    let newValue = oldValue;

    if (unit[id] !== selectedUnit) {
      if (selectedUnit === "kg") {
        newValue = oldValue / 1000; // г → кг
      } else {
        newValue = oldValue * 1000; // кг → г
      }
    }

    setUnit({ ...unit, [id]: selectedUnit });
    setQuantities({ ...quantities, [id]: newValue });
  };

  return (
    <div className="row g-3">
      {products.map((product) => {
        const currentQuantity = quantities[product.id];
        const currentUnit = unit[product.id];
        const qtyInKg = currentUnit === "kg" ? currentQuantity : currentQuantity / 1000;
        const totalPrice = qtyInKg * product.price;

        return (
          <div key={product.id} className="col-6 col-md-4 col-lg-3">
            <div className="card h-100 product-card">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="text-muted">{product.type}</p>
                <p className="price">
                  {totalPrice.toFixed(2)} сом ({currentQuantity} {currentUnit} × {product.price} сом/кг)
                </p>

                <div className="d-flex align-items-center mb-3">
                  <input
                    type="number"
                    min="1"
                    max={currentUnit === "kg" ? product.maxQuantity : product.maxQuantity * 1000}
                    value={currentQuantity}
                    onChange={(e) =>
                      handleQuantityChange(product.id, e.target.value, product.maxQuantity, currentUnit)
                    }
                    style={{ width: "70px" }}
                  />
                  <select
                    className="form-select ms-2"
                    value={currentUnit}
                    onChange={(e) => handleUnitChange(product.id, e.target.value)}
                  >
                    <option value="kg">кг</option>
                    <option value="g">г</option>
                  </select>
                </div>

                <button
                  className="btn btn-add mt-auto"
                  onClick={() =>
                    addToCart({
                      ...product,
                      quantity: qtyInKg,
                      unit: currentUnit,
                      totalPrice: totalPrice.toFixed(2),
                    })
                  }
                >
                  Добавить {totalPrice.toFixed(2)} сом
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProductList;
