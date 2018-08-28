var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var FileDataAccess = require('../core/data-access/file-data-access');

var dirPath = path.resolve(__dirname, './data/emp');
var dataAccess = new FileDataAccess(dirPath);
var empModel = require('./mock/emp.model');
var dataUtil = require('./mock/data-util');


describe('Model功能验证', function () {


  beforeEach(function() {

    // 重置数据
    var modelData = dataUtil.getModelData();
    var tableOptions = dataUtil.getTableOptions();
    dataAccess.saveModelData(tableOptions, modelData);
  });


  it('验证Options是否正确设置', function () {
    var tableConfigs = empModel.tableConfigs
    expect(tableConfigs.length).toBe(3);
    expect(tableConfigs[0]['tableName']).toBe('emp');
    expect(tableConfigs[1]['tableName']).toBe('edu');
    expect(tableConfigs[2]['tableName']).toBe('job');
  });


  it('验证getList方法', function () {
    var empList = empModel.getList();
    expect(empList.length).toBe(10);
    expect(empList[0]['code']).toBe('LiuYi');
    expect(empList[9]['code']).toBe('ZhengShi');
  });


  it('验证getInfo方法', function () {
    var empInfo = empModel.getInfo('1');
    expect(empInfo['name']).toBe('刘一');
    expect(empInfo['edu'].length).toBe(2);
    expect(empInfo['job'].length).toBe(2);
  });


  it('验证delInfo方法', function () {
    empModel.delInfo('1');
    var empTableData = empModel.getList('emp');
    var empInfo = empModel.getInfo('1');
    expect(empTableData.length).toBe(9);
    expect(empInfo).toBeUndefined();
  });


  it('验证delInfo方法', function () {
    empModel.delInfo('3');
    var empTableData = empModel.getList('emp');
    var zhangSanInfo = empModel.getInfo('3');
    expect(empTableData.length).toBe(9);
    expect(zhangSanInfo).toBeUndefined();
  });


  it('验证delList方法', function () {
    empModel.delList(['1', '10']);
    var empTableData = empModel.getList('emp');
    var liuYiInfo = empModel.getInfo('1');
    var zhengShiInfo = empModel.getInfo('10');
    expect(empTableData.length).toBe(8);
    expect(liuYiInfo).toBeUndefined();
    expect(zhengShiInfo).toBeUndefined();
  });


  it('验证createNewInfo方法', function () {
    var newEmpInfo = empModel.createNewInfo();

    expect(newEmpInfo['emp']).toBeTruthy();
    expect(newEmpInfo['edu'].length).toBe(1);
    expect(newEmpInfo['job'].length).toBe(1);

    expect(newEmpInfo['id']).toBeTruthy();
    expect(newEmpInfo['edu'][0]['id']).toBeTruthy();
    expect(newEmpInfo['job'][0]['id']).toBeTruthy();
  });


  it('验证saveInfo方法', function () {
    var zhangSanInfo = empModel.getInfo('3');
    zhangSanInfo['name'] = '张三Modified';
    zhangSanInfo['edu'].push({
      id: '31', empId: '3', schoolName: '山东师范大学'
    });
    zhangSanInfo['job'].push({
      id: '31', empId: '3', companyName: '浪潮国际'
    });

    empModel.saveInfo(zhangSanInfo);

    var zhangSanModified = empModel.getInfo('3');
    expect(zhangSanModified['name']).toBe('张三Modified');
    expect(zhangSanModified['edu'].length).toBe(1);
    expect(zhangSanModified['job'].length).toBe(1);
  });


});