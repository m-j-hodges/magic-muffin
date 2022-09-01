const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async(req, res) => {
  const getCategories = await Category.findAll({
    include: [{
      model : Product
    }]
  });
  res.json(getCategories)
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  const getOneCategory = await Category.findOne({ where: {
    id : req.params.id
  }, include: [{
    model: Product
  }]})
  res.json(getOneCategory)
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  //need category name to create
  const newCategory = req.body.name
  if(newCategory) {
  const createCategory = await Category.create({ category_name: newCategory})
  res.json({message: 'The new category has been successfully created.'})
}
  else {res.json({message: 'Please provide a name in the body of the request for the category.'})
}}
);

router.put('/:id', async (req, res) => {
 const updateCategory = await Category.update({ category_name: req.body.name}, {
  where:{ id: req.params.id}
  })
  if(updateCategory) {
    res.json({message: 'The requested record has been updated.'})

  }
  // update a category by its `id` value
});

router.delete('/:id', async(req, res) => {
  // delete a category by its `id` value
const deleteItem = req.params.id;
const findItem = await Category.destroy({where: { id: deleteItem}})
if(findItem) {
  res.json({message: `The requested category with id ${deleteItem} has been deleted.` })
} else {
  res.json({message: `The requested category could not be deleted.`})
}
});

module.exports = router;
