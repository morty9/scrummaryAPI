module.exports = (api) => {
  const Category = api.models.Category;


  /**
  * \fn create(req, res, next)
  * \brief Create a new category
  * \details Create a new category in the database
  *
  * \param req, res, next
  */
  function create(req, res, next) {
    Category
    .create(req.body)
    .then((category) => {
      if (!category) {
        res.status(404).send('category.already.exists');
      }
      res.status(201).send(category);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
  }

  /**
  * \fn update(req, res, next)
  * \brief Update a category
  * \details Update a category in the database
  *
  * \param req, res, next
  */
  function update(req, res, next) {
    let categoryId = req.params.id ? req.params.id : req.id_category;
    Category
    .update(req.body, {
      where: {
        id: categoryId
      }
    })
    .then((updated) => {
      if (!updated) {
        res.status(409).send('modification.error');
      }
      res.status(200).send('successful.modification');
    })
    .catch((err) => {
      res.status(500).send(err);
    })
  }

  /**
  * \fn findOne(req, res, next)
  * \brief Find one category by id
  * \details Find one category by id in the database
  *
  * \param req, res, next
  */
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


  /**
  * \fn findAll(req, res, next)
  * \brief Find all categories
  * \details Find all categories in the database
  *
  * \param req, res, next
  */
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

  /**
  * \fn remove(req, res, next)
  * \brief Remove category
  * \details Remove category in the database
  *
  * \param req, res, next
  */
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
    update,
    remove
  }
}
