"use strict";

const fs = require('fs');
const path = require('path');

const acceptedFilesRegExp = (env) => new RegExp(`config.(${env}|local).json$`);

/**
 * @param {string} config - Configuration filename
 */
function compareConfig(config) {
    // we give priority to local config files
    return /config\.local\.json$/.test(config) ? 1 : 0;
}

/**
 * @param {string[]} files
 * @param {string} env
 */
function findConfigs(files, env) {
    const fileRegExp = acceptedFilesRegExp(env);
    return files
        .filter((file) => fileRegExp.test(file))
        .sort((a, b) => compareConfig(a) - compareConfig(b))
        .map((file) => require(file));
}

/**
 * @param {any[]} files
 * @param {string[]} envVariables
 */
function mergeConfigs(files, envVariables = []) {
    const filesConfig = files.reduce((a, b) => Object.assign(a, b), {});

    const env = Object.keys(process.env)
        .filter((name) => envVariables.find((key) => key === name))
        .reduce((obj, name) => {
            obj[name] = process.env[name]
            return obj;
        }, {})

    const withEnvConfig = Object.assign({}, filesConfig, env);
    return Object.freeze(withEnvConfig);
}

/**
 * Create a configuration from config.{env|local}.json files and environment variables
 * @param {string} env              - Current environment, case does not matter (e.g. DEV === dev)
 * @param {string} path             - Path to the configuration files directory
 * @param {string[]} envVariables   - Env. variables to include
 */
function createConfig(env, configPath, envVariables = []) {
    if (!env || !configPath) {
        process.exit(1);
    }

    const getFullName = (filename) => path.resolve(process.cwd(), configPath, filename);

    const environment = env.toLowerCase();
    const configs = findConfigs(fs.readdirSync(configPath).map(getFullName), environment);

    return mergeConfigs(configs, envVariables);
}

/**
 * A simple JSON config module where the order is:
 * 1 - Environment variables
 * 2 - config.local.json
 * 3 - config.{env}.json
 */
module.exports = createConfig;
