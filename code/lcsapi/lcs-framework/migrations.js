const { execSync } = require('child_process');
const fs = require('fs');

const modelName = process.argv[2];

if (!modelName) {
  console.error('Please provide a model name.');
  process.exit(1);
}

/// LCS-framework create migrations
// execSync(`npx sequelize-cli model:generate --name ${modelName} --attributes name:string`, { stdio: 'inherit' });
// /// LCS-framework create migrations  db:migrate

// execSync('npx sequelize-cli db:migrate', { stdio: 'inherit' });
// /// LCS-framework create controller

fs.writeFileSync(
  `controllers/${modelName}Controller.js`,
  `const { ${modelName} } = require('../models');

module.exports = {
  async create${modelName}(req, res) {
    try {
      const new${modelName} = await ${modelName}.create(req.body);
      return res.status(201).json(new${modelName});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal error' });
    }
  },

  async get${modelName}s(req, res) {
    try {
      const ${modelName}List = await ${modelName}.findAll();
      return res.status(200).json(${modelName}List);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal error' });
    }
  },

  async get${modelName}ById(req, res) {
    try {
      const ${modelName}Item = await ${modelName}.findByPk(req.params.id);
      if (!${modelName}Item) {
        return res.status(404).json({ error: 'Not found' });
      }
      return res.status(200).json(${modelName}Item);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal error' });
    }
  },

  async update${modelName}(req, res) {
    try {
      const ${modelName}Item = await ${modelName}.findByPk(req.params.id);
      if (!${modelName}Item) {
        return res.status(404).json({ error: 'Not found' });
      }
      await ${modelName}Item.update(req.body);
      return res.status(200).json({ success: true, msg: 'Updated successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal error' });
    }
  },

  async delete${modelName}(req, res) {
    try {
      const ${modelName}Item = await ${modelName}.findByPk(req.params.id);
      if (!${modelName}Item) {
        return res.status(404).json({ error: 'Not found' });
      }
      await ${modelName}Item.destroy();
      return res.status(200).json({ success: true, msg: 'Deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal error' });
    }
  },
};`
);

// /// LCS-framework create controller
 Routes
fs.writeFileSync(
  `routes/${modelName}Routes.js`,
  `const express = require('express');
const ${modelName}Controller = require('../controllers/${modelName}Controller');

const router = express.Router();

router.post('/', ${modelName}Controller.create${modelName});
router.get('/', ${modelName}Controller.get${modelName}s);
router.get('/:id', ${modelName}Controller.get${modelName}ById);
router.put('/:id', ${modelName}Controller.update${modelName});
router.delete('/:id', ${modelName}Controller.delete${modelName});

module.exports = router;`
);

console.log(`CRUD API for ${modelName} created successfully.`);
/////////////////// using node lcs-framework/index