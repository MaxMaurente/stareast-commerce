const checkoutService = require("../services/checkoutService");

function checkout(req, res) {
  const { items, paymentMethod } = req.body;

  const result = checkoutService.checkout({ items, paymentMethod });

  if (result.error) {
    return res.status(400).json({ message: result.error });
  }

  return res.status(200).json(result);
}

module.exports = {
  checkout
};
