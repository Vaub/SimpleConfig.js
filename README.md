# SimpleConfig
Simple configuration script (compatible ES2015) for Node.js.
No bells and whistles, just an overwritable json config file with env. variables.

## Usage
The configuration script will look for `config.{my_env}.json` files and merge them with `config.json` and specified env. variables.
Variable overwrite order: `config.json < config.{my_env}.json < ENV VARIABLES YOU WANT TO INCLUDE`

### /myconfig/config
```json
{
    "host": "http://localhost.com",
    "port": 8080,

    "API_KEY": "123456789",
    "API_SECRET": "987654321"
}
```

### /myconfig/config.prod.json
```json
{
    "host": "https://myawesomewebsite.com",
    "port": 443
}
```

### Env. variables
```bash
export API_KEY="envvariablesareagreatplaceforthese"
export API_SECRET="neverputtheseinconfigfiles"
```

### How to include in your .js file
```javascript
var createConfiguration = require('./configuration');
var ENV_TO_INCLUDE = [ 'API_KEY', 'API_SECRET' ];
const configuration = createConfiguration('dev', './myconfig', ENV_TO_INCLUDE); 
```

## Final result (in Js)
```javascript
{
    host: "https://myawesomewebsite.com",
    port: 443,
    API_KEY: "envvariablesareagreatplaceforthese",
    API_SECRET: "neverputtheseinconfigfiles"

}
```
