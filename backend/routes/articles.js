const express = require("express");
const router = express.Router();
const Articles = require("../models/articles");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "../frontend/public/uploads");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/", (req, res) => {
  Articles.find()
    .then((article) => res.json(article))
    .catch((err) => res.status(400).json(`Error : ${err} `));
});

router.post("/create", upload.single("articleImage"), async (req, res) => {
  const { title, article, authorname } = req.body;

  const newArticle = new Articles({
    title,
    article,
    authorname,
    articleImage: req.file.originalname,
  });
  console.log(newArticle);
  newArticle
    .save()
    .then(() => res.json("The new Article posted successfully ."))
    .catch((err) => res.status(400).json(`Error ${err}`));
});

router.get("/:id", (req, res) => {
  Articles.findById(req.params.id)
    .then((article) => {
      res.json(article);
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.put("/update/:id", upload.single("articleImage"), (req, res) => {
  Articles.findById(req.params.id)
    .then((article) => {
      article.title = req.body.title;
      article.article = req.body.article;
      article.authorname = req.body.authorname;
      article.articleImage = req.file.originalname;

      article
        .save()
        .then(() => res.json("The article is updated Successfully"))
        .catch((err) => res.status(400).json(`Error: ${err}`));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.delete("/delete/:id", (req, res) => {
  Articles.findByIdAndDelete(req.params.id)
    .then(() => res.json("The article is deleted successfully"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
