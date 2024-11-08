const { execSync } = require('child_process');
const fs = require('fs');

const modelName = process.argv[2];
const foldername = process.argv[3];
const isMobile = process.argv[4] === 'mobile';

if (!modelName || !foldername) {
    console.error('Please provide a model name and a folder name.');
    process.exit(1);
}

const basePath = isMobile ? 'src/api.mobile/resources/' : 'src/api/resources/';
const modelFolderPath = isMobile ? 'src/models/models.mobile/' : 'src/models/models/';
const modelsPath = isMobile ? '../../../models/models.mobile' : '../../../models/models';

// Create model folder
fs.mkdirSync(modelFolderPath, { recursive: true });

// Create model file
fs.writeFileSync(
    `${modelFolderPath}/${foldername}.js`,
    `'use strict';

module.exports = (sequelize, DataTypes) => {
  const ${modelName} = sequelize.define('${modelName}', {
    //// create attributes to update Models
  }, {});

  ${modelName}.associate = function(models) {
    // Add associations here if needed
    // models.${modelName}.hasMany(models.OtherModel, { foreignKey: 'OtherModelId' });
  };

  return ${modelName};
};
`
);

// Create controller and route folder
const controllerAndRouteFolderPath = `${basePath}/${foldername}`;
fs.mkdirSync(controllerAndRouteFolderPath, { recursive: true });

// Create controller file
fs.writeFileSync(
    `${controllerAndRouteFolderPath}/${foldername}.controller.js`,
    `const { db } = require('${modelsPath}');

module.exports = {
  async create${modelName}(req, res) {
    try {
      const new${modelName} = await db.${modelName}.create(req.body);
      return res.status(201).json(new${modelName});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal error' });
    }
  },

  async get${modelName}(req, res) {
    try {
      const ${modelName}List = await db.${modelName}.findAll();
      return res.status(200).json(${modelName}List);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal error' });
    }
  },

  async get${modelName}ById(req, res) {
    try {
      const ${modelName}Item = await db.${modelName}.findByPk(req.params.id);
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
      const ${modelName}Item = await db.${modelName}.findByPk(req.params.id);
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
      const ${modelName}Item = await db.${modelName}.findByPk(req.params.id);
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

  async patch${modelName}(req, res) {
    try {
      const ${modelName}Item = await db.${modelName}.findByPk(req.params.id);
      if (!${modelName}Item) {
        return res.status(404).json({ error: 'Not found' });
      }
      await ${modelName}Item.update(req.body);
      return res.status(200).json({ success: true, msg: 'Patched successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal error' });
    }
  },
};
`
);

// Create route file
fs.writeFileSync(
    `${controllerAndRouteFolderPath}/${foldername}.routes.js`,
    `const express = require('express');
const ${modelName}Controller = require('./${foldername}.controller');
const { sanitize } = require('../../../middleware/sanitize');

const ${modelName}Router = express.Router();

${modelName}Router.route('/')
  .post(sanitize(), ${modelName}Controller.create${modelName})
  .get(sanitize(), ${modelName}Controller.get${modelName});

${modelName}Router.route('/info/:id')
  .get(sanitize(), ${modelName}Controller.get${modelName}ById);

${modelName}Router.route('/update/:id')
  .put(sanitize(), ${modelName}Controller.update${modelName});

// Uncomment the following route if you need the delete operation
// ${modelName}Router.route('/delete/:id')
//   .delete(sanitize(), ${modelName}Controller.delete${modelName});

module.exports = { ${modelName}Router };
`
);

// Create index file
fs.writeFileSync(
    `${controllerAndRouteFolderPath}/index.js`,
    `const { ${modelName}Router } = require('./${foldername}.routes');

module.exports = {
  ${modelName}Router,
  // Add other routers if needed
};
`
);

console.log(`CRUD API for ${modelName} created successfully in folder ${foldername}.`);
