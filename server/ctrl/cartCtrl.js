module.exports = {
  getCart: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    const cart = db.cart.get_cart(id);
    if (cart) {
      res.status(200).send(cart);
    } else {
      res
        .status(500)
        .send("You have no cart. Please add products to start a new cart.");
    }
  },

  addCart: async (req, res) => {
    const db = req.app.get("db");
    const { product_id, customer_id, total } = req.body;
    db.cart
      .add_to_cart([product_id, customer_id, total])
      .then((cart) => res.status(200).send(cart))
      .catch((err) => {
        res.status(500).send({
          errorMessage: "Oops Something Went Wrong!",
        });
        console.log(err);
      });
  },

  editCart: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    const { product_id, order_total } = req.body;
    const [cart] = await db.cart.update_cart({
      product_id,
      order_total,
      cart_id: id,
    });
    res.status(200).send(cart);
  },

  deleteCart: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    db.cart
      .delete_cart(id)
      .then((cart) => {
        console.log(cart, id);
        res.status(200).send(cart);
      })
      .catch((err) => {
        res.status(500).send({
          errorMessage: "Oops Something Went Wrong!",
        });
        console.log(err);
      });
  },
};
