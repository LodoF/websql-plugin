/***
 * Pouchdb 插件封装
 * author: Lodo
 * 
 */
let PouchDB = require('pouchdb').plugin(require('pouchdb-find'));

// 扩展插件
let plugin = {

  /***
   * 根据id 修改文档
   * @param {Object} db 数据库对象 即要操作的数据库
   * @param {Object} doc 需要修改内容
   * @return {Promise} 返回Promise 对象
   */
  updateDocById: (db, doc) => {
    return new Promise((resolve, reject) => {
      db.get(doc._id).then(_doc => {
        for (let v in doc) {
          if (v !== '_id') {
            if (typeof (doc[v]) === 'object') {
              _doc[v] = Object.assign(_doc[v], doc[v]);
            } else {
              _doc[v] = doc[v];
            }
          }
        }
        db.put(_doc).then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        });
      });
    });
  },

  /*** 
   * 根据id 删除文档
   * @param {Object} db 数据库对象 即要操作的数据库
   * @param {String} id 需要删除的文档id
   * @return {Promise} 返回Promise 对象
  */
  removeDocById: (db, id) => {
    return new Promise((resolve, reject) => {
      db.get(id).then(_doc => {
        db.remove(_doc).then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        });
      }).catch(err => {
        reject(err);
      });
    });
  },

  /*** 
   * 查询map
   * @param {Object} db 数据库对象 即要操作的数据库
   * @param {Object} params 查询参数
   * @return {Promise} 返回Promise 对象
  */
  queryMap: (db, params) => {
    if (params.doc)
      return db.query(params.map, params.data);
    else {
      return new Promise((resolve, reject) => {
        db.put(params.doc).catch(err => {
          if (err.name !== 'conflict')
            throw err;
        }).then(res => {
          db.query(params.map, params.data)
            .then(res => {resolve(res)}, err =>{reject(err)});
        }, err => {
          reject(err);
        });
      });
    }
  }
}

module.exports = PouchDB.plugin(plugin);