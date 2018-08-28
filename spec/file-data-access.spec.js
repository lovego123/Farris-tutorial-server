var path = require('path');
var dataUtil = require('./mock/data-util');
var FileDataAccess = require('../core/data-access/file-data-access');

describe('验证FileDataAccess功能', function () {
  var dirPath    = path.resolve(__dirname, './data/emp');
  var dataAccess = new FileDataAccess(dirPath);

  it('验证getFilePath', function () {
    expect(dataAccess.getFilePath('emp'), dirPath + '/emp.json');
  });

  it('验证saveTableData、getTableData方法', function () {
    var tableOption = dataUtil.getTableOption();
    var tableData = dataUtil.getTableData();
    dataAccess.saveTableData(tableOption, tableData);
    expect(dataAccess.getTableData(tableOption.tableName)).toEqual(tableData);
  });

  it('验证saveModelData、getModelData方法', function () {
    var tableOptions = dataUtil.getTableOptions();
    var tableNames = dataUtil.getTableNames();
    var modelData = dataUtil.getModelData();
    
    var expectedModelData = dataAccess.getModelData(tableNames);
    expect(expectedModelData).toEqual(modelData);
  });

});