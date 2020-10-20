module.exports = {
  getCats: async (req, res) => {
    db = req.app.get("db");
    const categories = await db.categories.get_categories();
    res.status(200).send(categories);
  },
};
