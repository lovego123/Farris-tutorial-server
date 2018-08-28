var path = require('path');
var Model = require('../core/model');

/**
 * 构造函数
 */
function XSDDModel(options) {
  Model.call(this, options);
}

// 原型构造
XSDDModel.prototype = Object.create(
  Model.prototype,
  {
    constructor: {
      configurable: true,
      enumerable: true,
      value: XSDDModel,
      writable: true
    }
  }
);

/**
 * 模型配置
 */
var options = {
  dirPath: path.resolve(__dirname, '../data/xsdd'),
  tableConfigs: [
    {
      tableName: 'XSDD', parentTable: '', primaryKey: 'DDNM', foreignKey: '',
      columnNames: ['DDNM', 'DDBH',  'YWRQ', 'KHMC', 'KHDH']
    },
    {
      tableName: 'WL', parentTable: 'XSDD', primaryKey: 'WLNM', foreignKey: 'DDNM',
      columnNames: ['WLNM', 'DDNM', 'WLBH', 'WLMC',  'ZSL', 'ZDW', 'ZDJ']
    },
    {
      tableName: 'JH', parentTable: 'XSDD', primaryKey: 'JHNM', foreignKey: 'DDNM',
      columnNames: ['JHNM', 'DDNM', 'JHBH', 'SHR', 'SHDZ', 'WLZZ', 'JHJHRQ']
    }
  ]
};

var xsddModel = new XSDDModel(options);
module.exports = xsddModel;
