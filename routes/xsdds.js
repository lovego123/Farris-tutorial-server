var express = require('express');
var router = express.Router();
var xsddModel = require('../models/xsdd-model');


// --------------------------------------------------------------------------------
// 列表页
// --------------------------------------------------------------------------------

/**
 * 获取订单列表
 */
router.get('/', function(req, res) {
  var begin, end, list, filteredList, result;

  // 查询条件获取
  begin = req.query.begin;
  end   = req.query.end;

  // 获取数据并过滤
  list = xsddModel.getList();
  console.log(list);
  filteredList = list.filter(function(item) {
    if (begin && end) {
      return item['YWRQ'] >= begin && item['YWRQ'] <= end;
    } else if (begin) {
      return item['YWRQ'] >= begin;
    } else if (end) {
      return item['YWRQ'] <= end;
    } else {
      return true;
    }
  });
  var result = {
    code: 'ok',
    message: '',
    data: filteredList
  }
  res.json(result);
});


/**
 * 批量删除
 */
router.post('/batch-delete', function(req, res) {
  var result;
  idsToDel = req.body;
  xsddModel.delList(idsToDel);
  result = {
    code: 'ok',
    message: '删除成功'
  };
  res.json(result);
});


// --------------------------------------------------------------------------------
// 卡片页
// --------------------------------------------------------------------------------


/**
 * 创建待默认值的新数据
 */
router.get('/new', function(req, res) {
  var result, id;
  id = req.params.id;
  result = {
    code: 'ok',
    message: '',
    data: xsddModel.createNewInfo(id)
  }
  res.json(result);
});


/**
 * 获取订单详情
 */
router.get('/:id', function(req, res) {
  var result, id;
  id = req.params.id;
  result = {
    code: 'ok',
    message: '',
    data: xsddModel.getInfo(id)
  };
  res.json(result);
});


/**
 * 新增、保存
 */
router.post('/', function(req, res) {
  var result, data;
  
  // 新增操作
  data = req.body;
  xsddModel.saveInfo(data);
  
  // 返回结果
  result = {
    code: 'ok',
    message: '保存成功'
  };
  res.json(result);
});


/**
 * 删除订单
 */
router.delete('/:id', function(req, res) {
  var id, result;

  // 删除数据
  id = req.params.id;
  xsddModel.delInfo(id);

  // 返回结果
  result = {
    code: 'ok',
    message: '保存成功'
  };
  res.json(result);
});


module.exports = router;


