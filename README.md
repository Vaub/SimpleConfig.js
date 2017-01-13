# SimpleConfig
Simple configuration script (compatible ES2015) for Node.js

## Usage
The configuration script will look for `config.{my_env}.json` files and merge them with `config.json` and specified env. variables.
Variable overwrite order: `config.json < config.{my_env}.json < ENV VARIABLES YOU WANT TO INCLUDE`
```javascript
var createConfiguration = require('./configuration');
var ENV_TO_INCLUDE = [ 'API_KEY', 'API_SECRET' ];
const configuration = createConfiguration('dev', './myconfig', ENV_TO_INCLUDE); 
```

### /myconfig/config.json or config.dev.json
```json
{
    "host": "http://localhost.com",
    "port": 8080
}
```
