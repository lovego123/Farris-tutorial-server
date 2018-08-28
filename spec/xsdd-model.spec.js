var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var FileDataAccess = require('../core/data-access/file-data-access');

var dirPath = path.resolve(__dirname, '../data/xsdd');
var dataAccess = new FileDataAccess(dirPath);
var xsddModel = require('../models/xsdd-model');

var initData = {
  XSDD: [
    { "DDNM": "1", "DDBH": "XXDD20180001", "YWRQ": "2018-01-01", "ZJE": 1111, "KHMC": "客户1", "KHDH": "0531-11111111" },
    { "DDNM": "2", "DDBH": "XXDD20180002", "YWRQ": "2018-02-02", "ZJE": 2222, "KHMC": "客户2", "KHDH": "0531-22222222" },
    { "DDNM": "3", "DDBH": "XXDD20180003", "YWRQ": "2018-03-03", "ZJE": 3333, "KHMC": "客户3", "KHDH": "0531-33333333" },
    { "DDNM": "4", "DDBH": "XXDD20180004", "YWRQ": "2018-04-04", "ZJE": 4444, "KHMC": "客户4", "KHDH": "0531-44444444" },
    { "DDNM": "5", "DDBH": "XXDD20180005", "YWRQ": "2018-05-05", "ZJE": 5555, "KHMC": "客户5", "KHDH": "0531-55555555" },
  ],
  WL: [
    { "WLNM": "11", "DDNM": '1', "WLBH": "WL0011", "WLMC": "物料11", "ZSL": 1, "ZDW": "吨", "ZDJ": 110 },

    { "WLNM": "21", "DDNM": '2', "WLBH": "WL0021", "WLMC": "物料21", "ZSL": 1, "ZDW": "吨", "ZDJ": 110 },
    { "WLNM": "22", "DDNM": '2', "WLBH": "WL0022", "WLMC": "物料22", "ZSL": 2, "ZDW": "吨", "ZDJ": 220 },

    { "WLNM": "31", "DDNM": '3', "WLBH": "WL0031", "WLMC": "物料31", "ZSL": 1, "ZDW": "吨", "ZDJ": 110 },
    { "WLNM": "32", "DDNM": '3', "WLBH": "WL0032", "WLMC": "物料32", "ZSL": 2, "ZDW": "吨", "ZDJ": 220 },
    { "WLNM": "33", "DDNM": '3', "WLBH": "WL0033", "WLMC": "物料33", "ZSL": 3, "ZDW": "吨", "ZDJ": 330 },

    { "WLNM": "41", "DDNM": '4', "WLBH": "WL0041", "WLMC": "物料41", "ZSL": 1, "ZDW": "吨", "ZDJ": 110 },
    { "WLNM": "42", "DDNM": '4', "WLBH": "WL0042", "WLMC": "物料42", "ZSL": 2, "ZDW": "吨", "ZDJ": 220 },
    { "WLNM": "43", "DDNM": '4', "WLBH": "WL0043", "WLMC": "物料43", "ZSL": 3, "ZDW": "吨", "ZDJ": 330 },
    { "WLNM": "44", "DDNM": '4', "WLBH": "WL0044", "WLMC": "物料44", "ZSL": 4, "ZDW": "吨", "ZDJ": 440 },

    { "WLNM": "51", "DDNM": '5', "WLBH": "WL0051", "WLMC": "物料51", "ZSL": 1, "ZDW": "吨", "ZDJ": 110 },
    { "WLNM": "52", "DDNM": '5', "WLBH": "WL0052", "WLMC": "物料52", "ZSL": 2, "ZDW": "吨", "ZDJ": 220 },
    { "WLNM": "53", "DDNM": '5', "WLBH": "WL0053", "WLMC": "物料53", "ZSL": 3, "ZDW": "吨", "ZDJ": 330 },
    { "WLNM": "54", "DDNM": '5', "WLBH": "WL0054", "WLMC": "物料54", "ZSL": 4, "ZDW": "吨", "ZDJ": 440 },
    { "WLNM": "55", "DDNM": '5', "WLBH": "WL0055", "WLMC": "物料55", "ZSL": 5, "ZDW": "吨", "ZDJ": 550 }

  ],
  JH: [
    { "JHNM": "11", "DDNM": '1', "JHBH": "JH00011", "SHDZ":"山东省济南市历城区北园大街001号", "SHR":"刘一", "WLZZ":"京东物流", "JHJHRQ":"2018-01-01" },

    { "JHNM": "21", "DDNM": '2', "JHBH": "JH00021", "SHDZ":"山东省济南市历城区北园大街001号", "SHR":"刘一", "WLZZ":"京东物流", "JHJHRQ":"2018-01-01" },
    { "JHNM": "22", "DDNM": '2', "JHBH": "JH00022", "SHDZ":"山东省济南市历下区泉城路002号",   "SHR":"陈二", "WLZZ":"德邦物流", "JHJHRQ":"2018-02-02" },

    { "JHNM": "31", "DDNM": '3', "JHBH": "JH0031", "SHDZ":"山东省济南市历城区北园大街001号", "SHR":"刘一", "WLZZ":"京东物流", "JHJHRQ":"2018-01-01" },
    { "JHNM": "32", "DDNM": '3', "JHBH": "JH0032", "SHDZ":"山东省济南市历下区泉城路002号",   "SHR":"陈二", "WLZZ":"德邦物流", "JHJHRQ":"2018-02-02" },
    { "JHNM": "33", "DDNM": '3', "JHBH": "JH0033", "SHDZ":"山东省济南市市中区舜耕路003号",   "SHR":"张三", "WLZZ":"顺丰物流", "JHJHRQ":"2018-03-03" },

    { "JHNM": "41", "DDNM": '4', "JHBH": "JH0041", "SHDZ":"山东省济南市历城区北园大街001号", "SHR":"刘一", "WLZZ":"京东物流", "JHJHRQ":"2018-01-01" },
    { "JHNM": "42", "DDNM": '4', "JHBH": "JH0042", "SHDZ":"山东省济南市历下区泉城路002号",   "SHR":"陈二", "WLZZ":"德邦物流", "JHJHRQ":"2018-02-02" },
    { "JHNM": "43", "DDNM": '4', "JHBH": "JH0043", "SHDZ":"山东省济南市市中区舜耕路003号",   "SHR":"张三", "WLZZ":"顺丰物流", "JHJHRQ":"2018-03-03" },
    { "JHNM": "44", "DDNM": '4', "JHBH": "JH0044", "SHDZ":"山东省济南市天桥区站前街街004号", "SHR":"李四", "WLZZ":"圆通物流", "JHJHRQ":"2018-04-04" },

    { "JHNM": "51", "DDNM": '5', "JHBH": "JH0051", "SHDZ":"山东省济南市历城区北园大街001号", "SHR":"刘一", "WLZZ":"京东物流", "JHJHRQ":"2018-01-01" },
    { "JHNM": "52", "DDNM": '5', "JHBH": "JH0052", "SHDZ":"山东省济南市历下区泉城路002号",   "SHR":"陈二", "WLZZ":"德邦物流", "JHJHRQ":"2018-02-02" },
    { "JHNM": "53", "DDNM": '5', "JHBH": "JH0053", "SHDZ":"山东省济南市市中区舜耕路003号",   "SHR":"张三", "WLZZ":"顺丰物流", "JHJHRQ":"2018-03-03" },
    { "JHNM": "54", "DDNM": '5', "JHBH": "JH0054", "SHDZ":"山东省济南市天桥区站前街街004号", "SHR":"李四", "WLZZ":"圆通物流", "JHJHRQ":"2018-04-04" },
    { "JHNM": "55", "DDNM": '5', "JHBH": "JH0055", "SHDZ":"山东省济南市槐荫区张庄路005号",   "SHR":"王五", "WLZZ":"申通物流", "JHJHRQ":"2018-05-04" },

  ]
};


describe('Model功能验证', function () {


  beforeEach(function() {
    dataAccess.saveModelData(xsddModel.tableConfigs, initData);
  });


  it('验证getList方法', function () {
    var xsddList = xsddModel.getList();
    expect(xsddList.length).toBe(5);
    expect(xsddList[0]['DDBH']).toBe('XXDD20180001');
    expect(xsddList[4]['DDBH']).toBe('XXDD20180005');
  });

  it('验证getInfo方法', function () {
    var xsddInfo = xsddModel.getInfo('3');
    expect(xsddInfo['DDBH']).toBe('XXDD20180003');
    expect(xsddInfo['WL'].length).toBe(3);
    expect(xsddInfo['JH'].length).toBe(3);
  });

});