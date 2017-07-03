module.exports = (api) => {
  const Category = api.models.Category;

  //*//
  //Create a new category
  //*//
  function create(req, res, next) {
    let category = Category.build(req.body);
    category
    .save()
    .then((category) => {
      if (!category) {
        res.status(409).send('category.already.exists');
      }
      res.status(201).send(category);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
  }
  //*//
  //Update a category
  //*//
  //function update(req, res, next) {}

  //*//
  //Find one category by id
  //*//
  function findOne(req, res, next) {
    Category
    .findById(req.params.id)
    .then((category) => {
      if (!category) {
        res.status(404).send('category.not.found');
      }
      res.status(200).send(category);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
  }

  //*//
  //Find all categories
  //*//
  function findAll(req, res, next) {
    Category
    .findAll()
    .then((categories) => {
      if (categories.lenght === 0) {
        res.status(204).send(categories);
      }
      res.status(200).send(categories);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
  }

  //*//
  //Remove category
  //*//
  function remove(req, res, next) {
    let categoryId = req.params.id ? req.params.id : req.id_category;
    Category
    .destroy({
      where : { id : categoryId }
    })
    .then((removed) => {
      if (!removed) {
        res.status(404).send('category.not.found');
      }
      res.status(201).send('category.removed');
    })
    .catch((err) => {
      res.status(500).send(err);
    })
  }

  return {
    create,
    findOne,
    findAll,
    remove
  }
}
