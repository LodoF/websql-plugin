/***
 * Pouchdb 插件封装
 * author: Lodo
 * 
 */
const PouchDB = require('pouchdb-browser').plugin(require('pouchdb-find'));

PouchDB.plugin((PouchDB) => {
  PouchDB.updateDoc = (doc) => {
    console.log(this);
  }
})