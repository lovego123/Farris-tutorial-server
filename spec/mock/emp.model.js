var path = require('path');
var Model = require('../../core/model');

/**
 * 构造函数
 */
function EmpModel(options) {
  Model.call(this, options);
}

// 原型构造
EmpModel.prototype = Object.create(
  Model.prototype,
  {
    constructor: {
      configurable: true,
      enumerable: true,
      value: EmpModel,
      writable: true
    }
  }
);

/**
 * 模型配置
 */
var options = {
  dirPath: path.resolve(__dirname, '../data/emp'),
  tableConfigs: [
    {
      tableName: 'emp', parentTable: '', primaryKey: 'id', foreignKey: '',
      columnNames: ['id', 'code', 'name']
    },
    {
      tableName: 'edu', parentTable: 'emp', primaryKey: 'id', foreignKey: 'empId',
      columnNames: ['id', 'empId', 'schoolName']
    },
    {
      tableName: 'job', parentTable: 'emp', primaryKey: 'id', foreignKey: 'empId',
      columnNames: ['id', 'empId', 'companyName']
    },
  ]
};

var empModel = new EmpModel(options);
module.exports = empModel;
