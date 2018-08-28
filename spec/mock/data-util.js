function getEmpTableData() {
  return [
    { id: '1',  code: 'LiuYi',    name: '刘一' },
    { id: '2',  code: 'ChenEr',   name: '陈二' },
    { id: '3',  code: 'ZhangSan', name: '张三' },
    { id: '4',  code: 'LiSi',     name: '李四' },
    { id: '5',  code: 'WangWu',   name: '王五' },
    { id: '6',  code: 'ZhaoLiu',  name: '赵六' },
    { id: '7',  code: 'SunQi',    name: '孙七' },
    { id: '8',  code: 'ZhouBa',   name: '周八' },
    { id: '9',  code: 'WuJiu',    name: '吴九' },
    { id: '10', code: 'ZhengShi', name: '郑十' }
  ];
}
function getEmpTableOption() {
  return  { tableName: 'emp', primaryKey: 'id'};
}

function getEduTableData() {
  return [
    { id: '11', empId: '1', schoolName: '山东师范大学' },
    { id: '12', empId: '1', schoolName: '山东大学' }
  ]
}
function getEduTableOption() {
  return  { tableName: 'edu', primaryKey: 'id'};
}

function getJobTableData() {
  return [
    { id: '11', empId: '1', companyName: '浪潮国际' },
    { id: '12', empId: '1', companyName: '浪潮信息' },
  ]
}
function getJobTableOption() {
  return  { tableName: 'job', primaryKey: 'id'};
}

function getEmpModelData() {
  return {
    emp: getEmpTableData(),
    edu: getEduTableData(),
    job: getJobTableData()
  }
}

function getEmpTableOptions() {
  return [
    getEmpTableOption(),
    getEduTableOption(),
    getJobTableOption()
  ];
}

function getTableNames() {
  return ['emp', 'edu', 'job'];
}

module.exports = {
  getTableData:    getEmpTableData,
  getModelData:    getEmpModelData,

  getTableOption:  getEmpTableOption,
  getTableOptions: getEmpTableOptions,
  getTableNames:   getTableNames
}
