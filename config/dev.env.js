'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

//合并 prodEnv 和  NODE_ENV: '"development"' 并导出
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
