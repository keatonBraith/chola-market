module.exports = {
  addReview: async (req, res) => {
    const db = req.app.get("db");
    const { title, rating, review, product_id, customer_id } = req.body;
    db.reviews
      .add_review([title, rating, review, product_id, customer_id])
      .then((review) => res.status(200).send(review))
      .catch((err) => {
        console.log(err);
        res.status(500).send({
          errorMessage: "Whoops something went wrong!",
        });
      });
  },

  updateReview: async (req, res) => {
    const db = req.app.get("db");
    const { title, rating, review } = req.body;
    const { id } = req.params;
    const [update] = db.reviews.update_review({
      title,
      rating,
      review,
      product_id: id,
    });
    res.status(500).send(update);
  },

  getAllReviews: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    const reviews = await db.reviews.get_reviews(id);
    res.status(200).send(reviews);
    console.log(reviews);
  },

  getRecentReviews: async (req, res) => {
    const db = req.app.get("db");
    const reviews = await db.reviews.get_recent_reviews();
    if (reviews) {
      res.status(200).send(reviews);
    } else {
      res.status(404).send("Error");
    }
  },

  getAvgRating: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    const avgRating = await db.reviews.get_avg_rating([id]);
    res.status(200).send(avgRating);
  },
};
