/*
 * @Author: Arpit.Yadav
 * @Date: 2019-02-09 20:45:31
 * @Last Modified by: Arpit.Yadav
 * @Last Modified time: 2019-02-22 14:38:56
 */
var seller = require('./seller.controller');
var _jwtToken = require('../../common/helpers/j_w_t/jwt.helper');
var _sellerValidator = require('./seller.validator');
var prefix = '/seller';
module.exports = function(app) {
  // Registration route
  app
    .route(prefix + '/registration')
    .all(_sellerValidator.validate)
    .post(seller.create);

  // Login route
  app
    .route(prefix + '/login')
    .all(_sellerValidator.validateLogin)
    .post(seller.login);
  // Get Seller
  app
    .route(prefix + '/getSeller/:_id')
    .all(_sellerValidator.validateSellerId, _jwtToken.verify)
    .get(seller.getSeller);
};
