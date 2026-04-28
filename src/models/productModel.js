const products = [
  { id: 1, name: "Notebook", price: 1000 },
  { id: 2, name: "Headphones", price: 250 },
  { id: 3, name: "Mouse", price: 120 }
];

function getAllProducts() {
  return products;
}

function getProductById(id) {
  return products.find((product) => product.id === Number(id));
}

module.exports = {
  getAllProducts,
  getProductById
};
