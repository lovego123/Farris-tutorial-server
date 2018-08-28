var fs = require('fs');
var path = require('path');
var _ = require('lodash');


/**
 * 构造函数
 * @dirPath {string} 目录路径
 */
function FileDataAccess(dirPath) {
  if (path.isAbsolute(dirPath) === false) {
    throw Error('dirPath必须是绝对路径');
  }
  if (fs.existsSync(dirPath) === false) {
    fs.mkdirSync(dirPath);
  }
  this.dirPath = dirPath;
}


/**
 * 原型方法
 */
FileDataAccess.prototype = {

    /**
   * 切换构造函数
   */
  constructor: FileDataAccess,

  /**
   * 获取表数据
   */
  getTableData: function(tableName) {
    var path, json, tableData;
    path = this.getFilePath(tableName);
    json = fs.readFileSync(path);
    tableData = JSON.parse(json);

    return tableData;
  },

  /**
   * 获取模型数据
   */
  getModelData: function(tableNames) {
    var self, result;
    self = this;
    result = {};

    _.each(tableNames, function(tableName) {
      result[tableName] = self.getTableData(tableName);
    });

    return result;
  },

  /**
   * 保存表数据
   */
  saveTableData: function(tableOption, tableData) {
    var path, json;
    tableData = _.orderBy(
      tableData,
      function(rowData) {
        return parseInt(rowData[tableOption.primaryKey]);
      },
      'asc'
    );
    path = this.getFilePath(tableOption.tableName);
    json = JSON.stringify(tableData);
    fs.writeFileSync(path, json);
  },

  /**
   * 保存模型数据
   */
  saveModelData: function(tableOptions, modelData) {
    var self = this;
    _.each(tableOptions, function(tableOption) {
      var tableName = tableOption.tableName;
      var tableData = modelData[tableName] ? modelData[tableName] : [];
      self.saveTableData(tableOption, tableData);
    });
  },

  /**
   * 获取表对应的JSON文件路径
   */
  getFilePath: function(tableName) {
    var fileName = tableName + '.json';
    var filePath = path.join(this.dirPath, fileName);
    if (fs.existsSync(filePath) === false) {
      fs.writeFileSync(filePath, '[]');
    }
    return filePath;
  }


}

module.exports = FileDataAccess;
