define(function(require){
        var utils = require('./utils');
        var product = require('./product');
        var pi = require('./pi');
        var order = require('./order');

        var addr = window.location.href;
        if ( utils.stringEndWith(addr, 'product') || stringEndWith( addr, 'product/') ){
          product.queryProductByCount();
          //setupProductHomePage();
        }else if ( stringEndWith(addr, 'pi') || stringEndWith( addr, 'pi/') ){
          pi.queryPIByCount();
        }else if ( stringEndWith(addr, 'order') || stringEndWith( addr, 'order/') ){
          order.queryOrderByCount();
        }

});