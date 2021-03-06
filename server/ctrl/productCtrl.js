module.exports = {
  addProduct: async (req, res) => {
    const db = req.app.get("db");
    const {
      title,
      photo,
      price,
      description,
      ingredients,
      category_id,
    } = req.body;
    const product = await db.products.add_product([
      title,
      photo,
      price,
      description,
      ingredients,
      category_id,
    ]);
    if (product) {
      res.status(200).send(product);
    } else {
      res.status(500).send("Oops, Something Went Wrong");
    }
  },

  getProducts: async (req, res) => {
    const db = req.app.get("db");

    const products = await db.products.get_products();
    res.status(200).send(products);
  },

  getProduct: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    const [product] = await db.products.get_product(id);
    if (product) {
      res.status(200).send(product);
    } else {
      res.status(209).send("Error");
    }
  },

  editProduct: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    const {
      title,
      photo,
      price,
      description,
      ingredients,
      category_id,
    } = req.body;
    const [product] = await db.products.edit_product({
      title,
      photo,
      price,
      description,
      ingredients,
      category_id,
      product_id: id,
    });
    res.status(200).send(product);
  },

  getProductsCat: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.body;
    const [products] = await db.products.get_pcategory(id);
    if (products) {
      res.status(200).send(products);
    } else {
      res.status(209).send("Error");
    }
  },

  deleteProducts: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    db.products
      .delete_product(id)
      .then((products) => {
        console.log(products, id);
        res.status(200).send(products);
      })
      .catch((err) => {
        res.status(500).send({
          errorMessage: "Oops Something Went Wrong!",
        });
        console.log(err);
      });
  },
};
