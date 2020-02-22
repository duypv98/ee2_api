const Role = require('db/models/Role');

async function findByNameAndType(roleName, type) {
  const role = await Role.findOne(
    { name: roleName, type },
  );
  return role;
}

module.exports = {
  findByNameAndType,
};
