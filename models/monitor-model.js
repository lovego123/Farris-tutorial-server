var path = require('path');
var Model = require('../core/model');

/**
 * 构造函数
 */
function MonitorModel(options) {
    Model.call(this, options);
}

// 原型构造
MonitorModel.prototype = Object.create(
    Model.prototype, {
        constructor: {
            configurable: true,
            enumerable: true,
            value: MonitorModel,
            writable: true
        }
    }
);

/**
 * 模型配置
 */
var options = {
    dirPath: path.resolve(__dirname, '../data/monitor'),
    tableConfigs: [{
            tableName: 'BDQ',
            parentTable: '',
            primaryKey: 'BDQNM',
            foreignKey: '',
            columnNames: ['BDQNM', 'BDQMC']
        },
        {
            tableName: 'GD',
            parentTable: 'BDQ',
            primaryKey: 'GDNM',
            foreignKey: 'BDQNM',
            columnNames: ['GDNM', 'BDQNM', "GDMC",
                "GDMS",
                "FWDY",
                "GNMK",
                "LYXX",
                "JSZGS",
                "JSCGGS",
                "JSSBGS",
                "FSZGS",
                "FSCGGS",
                "FSSBGS"
            ]
        }
    ]
};

var MonitorModel = new MonitorModel(options);
module.exports = MonitorModel;