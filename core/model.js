var _ = require('lodash');
var FileDataAccess = require('../core/data-access/file-data-access');

/**
 * 构造函数
 */
function Model(options) {
  this.dataAccess = new FileDataAccess(options.dirPath);
  this.tableConfigs = options.tableConfigs
}

/**
 * 原型定义
 */
Model.prototype = {

  /**
   * 切换构造函数
   */
  constructor: Model,


  // --------------------------------------------------------------------------------
  // CRUD封装
  // --------------------------------------------------------------------------------

  /**
   * 获取列表
   */
  getList: function() {
    var parentTableName = this.getParentTableName();
    return this.dataAccess.getTableData(parentTableName);
  },

  /**
   * 获取
   */
  getInfo: function(id) {
    if (!id) {
      return;
    }
    var tableNames = this.getTableNames();
    var modelData = this.dataAccess.getModelData(tableNames);
    return this.getDataById(modelData, id);
  },

  /**
   * 新增带默认值的数据
   */
  createNewInfo() {
    var result, parentId;
    result = {};
    parentId = '' + _.random(1000, 9999);

    // 先创建主表的空结构
    const parentTableConfig = this.getParentTableConfig();
    _.each(parentTableConfig.columnNames, function(columnName) {
        result[columnName] = '';
    });
    result[parentTableConfig.primaryKey] = parentId;

    // 为子表创建一条空数据
    _.each(this.tableConfigs, function(tableConfig) {
      if (tableConfig.tableName === parentTableConfig.tableName) {
        return;
      }
      var newRow = {};
      _.each(tableConfig.columnNames, function(columnName) {
          newRow[columnName] = '';
      });
      newRow[tableConfig.primaryKey] = '' + _.random(1000, 9999);
      newRow[tableConfig.foreignKey] = parentId;
      result[tableConfig.tableName] = [newRow];
    });
    return result;
  },

  /**
   * 删除
   */
  delInfo: function(id) {
    var modelData, newModelData;
    var tableNames = this.getTableNames();
    modelData = this.dataAccess.getModelData(tableNames);
    newModelData = this.delDataByID(modelData, id);
    this.dataAccess.saveModelData(this.tableConfigs, newModelData);
  },

  /**
   * 批量删除
   */
  delList: function(ids) {
    var self = this;
    _.each(ids, function(id) {
      self.delInfo(id);
    });
  },

  /**
   * 保存数据单条数据
   */
  saveInfo: function(infoData) {
    var id, tableNames, modelData, newModelData, isExist;
    tableNames = this.getTableNames();
    modelData = this.dataAccess.getModelData(tableNames);

    //获取主表记录的ID
    id = this.getParentId(infoData);
    isExist = this.isExist(id);

    //如果已经存在，先删除相关数据
    if (isExist) {
      modelData = this.delDataByID(modelData, id);
    }

    //追加数据
    newModelData = this.appendData(modelData, infoData);
    this.dataAccess.saveModelData(this.tableConfigs, newModelData);
  },

  // --------------------------------------------------------------------------------
  // 数据加工
  // --------------------------------------------------------------------------------

  /**
   * 从data中获取主表主键
   */
  getParentId: function(infoData) {
    var parentTableConfig = this.getParentTableConfig();
    return infoData[parentTableConfig.primaryKey];
  },

  /**
   * 判断data的主表中是否存在值为id的行
   */
  isExist: function(id) {
    var info = this.getInfo(id);
    return info ? true : false;
  },

  /**
   * 根据给定的主表id，获取data中检索相关数据
   */
  getDataById: function(modelData, id) {
    var result = {};

    // 先获取主表数据
    const parentTableConfig = this.getParentTableConfig();
    const parentTableData   = modelData[parentTableConfig.tableName];
    result = parentTableData.find(function(rowData) {
      return rowData[parentTableConfig.primaryKey] === id;
    });
    if (!result) {
      return;
    }
    
    // 遍历获取子表数据
    _.each(this.tableConfigs, function(tableConfig) {
      var tableName, tableData;
      if (tableConfig.tableName === parentTableConfig.tableName) {
        return;
      }
      tableName  = tableConfig.tableName;
      tableData  = modelData[tableName];
      result[tableName] = _.filter(tableData, function(rowData) {
          return rowData[tableConfig.foreignKey] === id;
      });
    });


    return result;
  },

  /**
   * 根据给定的主表id，从给定data中移除相关数据
   */
  delDataByID: function(modelData, id) {
    var result = {};

    _.each(this.tableConfigs, function(tableConfig) {
      var tableName, tableData;

      tableName  = tableConfig['tableName'];
      tableData = modelData[tableName];

      result[tableName] = _.filter(tableData, function(rowData) {
        if (tableConfig.parentTable === '') {
          return rowData[tableConfig.primaryKey] !== id;
        } else {
          return rowData[tableConfig.foreignKey] !== id;
        }
      });
    });

    return result;
  },

  /**
   * 合并数据
   */
  appendData: function(modelData, infoData) {
    var result = {}

    // 先将子表数据合并，然后删除子表的key
    _.each(this.tableConfigs, function(tableConfig) {
      if (tableConfig.parentTable === '') {
        return;
      }
      var tableName = tableConfig.tableName;
      result[tableName] = modelData[tableName].concat(infoData[tableName]);
      delete infoData[tableName];
    });

    // 将主表数据追加到模型数据中
    var parentTableName = this.getParentTableName();
    result[parentTableName] = modelData[parentTableName].concat([infoData]);

    return result;
  },



  // --------------------------------------------------------------------------------
  // 模型配置处理
  // --------------------------------------------------------------------------------

  /**
   * 获取tableName的表配置
   */
  getTableConfig: function(tableName) {
    var tableConfig = _.find(this.tableConfigs, {tableName: tableName});
    return tableConfig;
  },

  /**
   * 获取主表表配置
   */
  getParentTableConfig: function() {
    var tableConfig = _.find(this.tableConfigs, {parentTable: ''});
    return tableConfig;
  },

  /**
   * 获取主表表名
   */
  getParentTableName: function() {
    var tableConfig = this.getParentTableConfig();
    return tableConfig['tableName'];
  },

  /**
   * 获取所有表名
   */
  getTableNames: function() {
    return this.tableConfigs.map(function(tableConfig) {
      return tableConfig.tableName;
    });
  }
}

module.exports = Model;
