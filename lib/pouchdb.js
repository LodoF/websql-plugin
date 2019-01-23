/***
 * Pouchdb 插件封装
 * author: Lodo
 * 
 */

const PouchDB = require('pouchdb-l').plugin(require('pouchdb-find'));

module.exports = class _Pouchdb {
  constructor(adapter = 'idb') {
    this.adapter = adapter;
  }

  /***
   * 创建数据库
   * @param {String} name 数据库名称 不可为空
   * @return {Object} 返回值可能为null
   */
  createDB (name) {
    if (PouchDB)
      return PouchDB(name, {adapter: this.adapter});
    else
      return null;
  }

  /***
   * 销毁数据库
   * @param {Object} db 数据库对象
   * @return {Promise} pormise 对象
   */
  destroy (db) {
    return db.destroy();
  }

  /***
   * 向数据库中添加一个文档
   * @param {Object} db 数据库对象
   * @param {Object} doc 文档对象
   * @return {Promise} pormise 对象
   */
  put (db, doc) {
    return db.put(doc);
  }

  /***
   * 向数据库中添加一个文档
   * @param {Object} db 数据库对象
   * @param {String} id 文档uuid
   * @return {Promise} pormise 对象
   */
  getDocById (db, id) {
    return db.get(id);
  }
};