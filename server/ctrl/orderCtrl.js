module.exports = {
  getOrder: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    const [order] = await db.orders.get_order(id);
    if (order) {
      res.status(200).send(order);
    } else {
      res.status(209).send("Error");
    }
  },

  getOrders: async (req, res) => {
    db = req.app.get("db");
    const { id } = req.params;
    const orders = await db.orders.get_user_orders(id);
    res.status(200).send(orders);
  },

  cancelOrder: async (req, res) => {
    db = req.app.get("db");
    const { id } = req.params;
    db.orders
      .cancel_order(id)
      .then((order) => {
        console.log(id, order);
        res.status(200).send(order);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({
          errorMessage: "Whoops! Something Went Wrong.",
        });
      });
  },

  addOrder: async (req, res) => {
    const db = req.app.get("db");
    const { customer_id, product_id, order_total } = req.body;
    db.orders
      .add_order([customer_id, product_id, order_total])
      .then((order) => res.status(200).send(order))
      .catch((err) => {
        res.status(500).send({
          errorMessage: "Oops! Something Went Wrong!",
        });
        console.log(err);
      });
  },
};
