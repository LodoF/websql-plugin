const PouchDB = require('../index').PouchDB;
let db = new PouchDB('test');

let doc = {
  _id: '1234-5678-1011-0000-111',
  title: 'test',
  desc: {
    src: 'xxxxx',
    name: 'pic'
  }
}

/// 文档实例
let doc2 = {
  title: 'test2',
  desc: {
    src: 'xxxxx2',
    name: 'pic2'
  }
}

let docs = [doc, doc2];

const type = 'allDocs';

switch(type) {
  case 'put':
    /***
     * 向数据库中添加一条数据
     * doc 中_id 格式 为uuid 格式 
     * 
     */
    db.put(doc).then(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
    break;
  case 'post':
    /***
     * 向数据库中添加一条数据
     * _id 自动生成 格式为 uuid格式
     * 
     */
    db.post(doc2).then(res => {
      console.log(res);
    }, err => {
      console.log(err)
    });
    break;
  case 'get':
    /***
     * 根据文档id 获取文档信息
     * 
     */
    db.get(doc._id).then(res => {
      console.log(res);
    }, err => {
      console.log(err);
    })
    break;
  case 'remove':
    /***
     * 根据文档id 逻辑删除文档
     * 
     */
    db.get(doc._id).then(res => {
      return db.remove(res);
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
    break;
  case 'bulkDocs':
    /***
     * 批量创建文档或更新文档
     * doc 包含_id 即更新文档
     * doc 不包含 _id 即创建新文档
     * 
     */
    db.bulkDocs(docs).then(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
    break;
  case 'allDocs':
    /***
     * 查询数据库所有文档
     * @param {Object} options ,查询参数 更多参数信息 https://pouchdb.com/api.html#batch_fetch
     * 
     */
    let options = {
      include_docs: true,
    }
    db.allDocs(options).then(res => {
        console.log(res);
    }, err => {
      console.log(err);
    });
    break;

  case 'changes':
    /***
     * 监听数据库文档变化
     * @param {Object} options ,查询参数 更多参数信息 https://pouchdb.com/api.html#changes
     * 
     */
    let options = {
      since: 'now', // 监听新的数据变化
      live: true, // 保持活跃
      include_docs: true // 返回文档信息
    }
}




