const Category = require('db/models/Category');

async function findAll() {
  const listCategories = await Category.find();
  return listCategories;
}

module.exports = {
  findAll,
};
