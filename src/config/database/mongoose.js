/*
 * @Author: Arpit.Yadav
 * @Date: 2019-02-09 17:55:16
 * @Last Modified by: Arpit.Yadav
 * @Last Modified time: 2019-03-02 13:05:17
 */

var mongoose = require('mongoose');
var config = require('./../env/config');

mongoose.flex = mongoose.createConnection(
  config.db_connectionString.flex,
  { useNewUrlParser: true, useCreateIndex: true },
  function(err) {
    if (!err) {
      console.log(
        'Mongoose default connection open to ' + config.db_connectionString.flex
      );
    } else {
      console.log('Mongoose default connection error: ' + err);
    }
  }
);

mongoose.seller = mongoose.createConnection(
  config.db_connectionString.seller,
  { useNewUrlParser: true, useCreateIndex: true },
  function(err) {
    if (!err) {
      console.log(
        'Mongoose default connection open to ' +
          config.db_connectionString.seller
      );
    } else {
      console.log('Mongoose default connection error: ' + err);
    }
  }
);
module.exports = mongoose;
