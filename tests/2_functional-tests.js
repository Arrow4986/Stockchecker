const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  suite('5 functional get request tests', function() {
    test('Viewing one stock', function(done) {
      chai
        .request(server)
        .get('/api/stock-prices/')
        .set('content-type', 'application/json')
        .query({stock: 'GOOG'})
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.stockData.stock, 'GOOG');
          assert.exists(res.body.stockData.price, 'GOOG has a price');
          done();
        });
    });
    test('Viewing one stock and liking it', function(done) {
      chai
        .request(server)
        .get('/api/stock-prices/')
        .set('content-type', 'application/json')
        .query({stock: 'GOOG', like: true})
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.stockData.stock, 'GOOG');
          assert.equal(res.body.stockData.likes, 2);
          assert.exists(res.body.stockData.price, 'GOOG has a price');
          done();
        });
    });
    test('Viewing one stock and liking it again', function(done) {
      chai
        .request(server)
        .get('/api/stock-prices/')
        .set('content-type', 'application/json')
        .query({stock: 'GOOG', like: true})
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.stockData.stock, 'GOOG');
          assert.equal(res.body.stockData.likes, 2);
          assert.exists(res.body.stockData.price, 'GOOG has a price');
          done();
        });
    });
    test('Viewing two stocks', function(done) {
      it('should take less than 500ms', function (done) {
        this.timeout(500);
        setTimeout(done, 300);
      });
      chai
        .request(server)
        .get('/api/stock-prices/')
        .set('content-type', 'application/json')
        .query({stock: ['GOOG', 'MSFT']})
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.stockData[0].stock, 'GOOG');
          assert.equal(res.body.stockData[1].stock, 'MSFT');
          assert.exists(res.body.stockData[0].price, 'GOOG has a price');
          assert.exists(res.body.stockData[1].price, 'MSFT has a price');
          done();
        });
    });
    test('Viewing two stocks and liking them', function(done) {
      it('should take less than 500ms', function (done) {
        this.timeout(500);
        setTimeout(done, 300);
      });
      chai
        .request(server)
        .get('/api/stock-prices/')
        .set('content-type', 'application/json')
        .query({stock: ['GOOG', 'MSFT']})
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.stockData[0].stock, 'GOOG');
          assert.equal(res.body.stockData[1].stock, 'MSFT');
          assert.exists(res.body.stockData[0].rel_likes, 'GOOG has rel_likes');
          assert.exists(res.body.stockData[1].rel_likes, 'MSFT has rel_likes');
          assert.exists(res.body.stockData[0].price, 'GOOG has a price');
          assert.exists(res.body.stockData[1].price, 'MSFT has a price');
          done();
        });
    });
  })
});
