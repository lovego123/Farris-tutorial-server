var path = require('path');
var Model = require('../core/model');

/**
 * 构造函数
 */
function MQModel(options) {
  Model.call(this, options);
}

// 原型构造
MQModel.prototype = Object.create(
  Model.prototype,
  {
    constructor: {
      configurable: true,
      enumerable: true,
      value: MQModel,
      writable: true
    }
  }
);

/**
 * 模型配置
 */
var options = {
  dirPath: path.resolve(__dirname, '../data/mqueue'),
  tableConfigs: [
    {
      tableName: 'queue-message', parentTable: '', primaryKey: 'DLBH', foreignKey: '',
      columnNames: ['DLMC', 'DLMS',  'MQFUQ', 'DLZT', 'isPreset','XXFX','XXMS','CJR','CJSJ']
    }
  ]
};

var mqModel = new MQModel(options);
module.exports = mqModel;
