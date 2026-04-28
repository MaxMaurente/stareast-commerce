const { getProductById } = require("../models/productModel");

function checkout({ items, paymentMethod }) {
  if (!Array.isArray(items) || items.length === 0) {
    return { error: "Items are required." };
  }

  if (paymentMethod !== "cash" && paymentMethod !== "credit_card") {
    return { error: "Payment method must be cash or credit_card." };
  }

  const calculatedItems = [];
  let subtotal = 0;

  for (const item of items) {
    const product = getProductById(item.productId);
    const quantity = Number(item.quantity);

    if (!product) {
      return { error: `Product with id ${item.productId} not found.` };
    }

    if (!Number.isInteger(quantity) || quantity <= 0) {
      return { error: `Invalid quantity for product ${item.productId}.` };
    }

    const lineTotal = product.price * quantity;
    subtotal += lineTotal;

    calculatedItems.push({
      productId: product.id,
      productName: product.name,
      unitPrice: product.price,
      quantity,
      lineTotal
    });
  }

  const discount = paymentMethod === "cash" ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  return {
    subtotal,
    discount,
    total,
    paymentMethod,
    items: calculatedItems
  };
}

module.exports = {
  checkout
};
