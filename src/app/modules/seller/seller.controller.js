/*
 * @Author: Arpit.Yadav
 * @Date: 2019-02-09 20:45:35
 * @Last Modified by: Arpit.Yadav
 * @Last Modified time: 2019-02-22 14:39:58
 */
var atob = require('atob');
var redis = require('redis');
var redisClient = redis.createClient();

var Seller = require('./seller.service');
var Jwt = require('../../common/helpers/j_w_t/jwt.helper');
var errorParser = require('../../common/helpers/errorParser/error.parser');

/**
 * Create Seller fn: `Creating seller. `
 * @description `req.body will have seller data.`
 */
exports.create = async (req, res, next) => {
  try {
    let [err, seller] = await Seller.create(req.body);
    if (!err) {
      let _seller = JSON.parse(JSON.stringify(seller));
      delete _seller.password;
      let _token = await Jwt.create(_seller);
      if (_token) {
        _seller.token = _token;
      }
      // Note: Send Registration confirmation and otp
      res.success.Created('Successfully Created', _seller);
    } else if (err.name === 'ValidationError') {
      res.error.UnprocessableEntity(
        err._message,
        errorParser.parseMongooseError(err.errors)
      );
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Seller Login Fn: `Seller Login`
 * @description `req.body will have email and password`
 *
 */
exports.login = async (req, res, next) => {
  // console.log(req.headers);
  try {
    let [err, seller] = await Seller.findByEmail(req.body.email);
    // console.log(err);
    // console.log(seller);
    if (!err && seller !== null) {
      console.log(seller);
      seller.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch) {
          // console.log(isMatch);
          let _seller = JSON.parse(JSON.stringify(seller));
          delete _seller.password;
          _seller['token'] = Jwt.create(_seller);
          res.success.OK('Succesfully Logged in', _seller);
        }
        res.error.NotFound('Credentials does not match !!');
      });
    } else {
      res.error.NotFound('Credentials does not match !!');
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Get Seller Data Fn: ` Get Seller Data`
 * @description `req.body will have _id `
 * @summary this funtion will get the data having same `_id` .
 * @reference service
 */
exports.getSeller = async (req, res, next) => {
  console.log(req.params);

  try {
    let [err, seller] = await Seller.findBy_Id(req.params._id);
    console.log(seller);

    if (!err) {
      res.success.OK('Successfully got Seller.', seller);
    } else {
      res.error.NotFound('Seller Data not found.');
    }
  } catch (error) {
    next(error);
  }
};
