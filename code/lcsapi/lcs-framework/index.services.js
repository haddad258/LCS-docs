const fs = require('fs');
const path = require('path');

function generateScript(modelName, routeName) {
  // Generate Controller Script
  const controllerScript = `
  import api from '../../Api/api';
  import { ApiConfigJob } from '../../Api/config.job';
  
  const get${modelName} = async () => {
      try {
          const result = await api.get(ApiConfigJob.api_${modelName});
          return result.data.error ? null : result.data;
      } catch (error) {
          console.error(error);
          return null;
      }
  };
  const add${modelName} = async (status) => {
      try {
          const result = await api.post(ApiConfigJob.api_${modelName}, status);
          return result.data.error ? null : result.data;
      } catch (error) {
          console.error(error);
          return null;
      }
  };
  const update${modelName} = async (data) => {
      try {
          const result = await api.put(ApiConfigJob.api_${modelName}+data.id, data);
          return result.data.error ? null : result.data;
      } catch (error) {
          console.error(error);
          return null;
      }
  };
  
  
  
  const ${modelName}Fun = {
      get${modelName},
      add${modelName},
      update${modelName},
  };
  
  export default ${modelName}Fun;
  

  `;

 
  // Write Controller and Route Scripts to Files
  const controllerFileName = path.join(__dirname, `index.js`);
  fs.writeFileSync(controllerFileName, controllerScript);
  console.log(`Generated ${modelName}Controller.js at ${controllerFileName}`);

}

const [modelName] = process.argv.slice(2);

if (!modelName || !modelName) {
  console.error('Usage: node index.js <modelName> <routeName>');
} else {
  generateScript(modelName, modelName);
}
