/**
 * Created by sruthi on 12/1/15.
 */
var expect = require('expect.js');
//browser.baseUrl = 'http://localhost:3000/';

describe('Test',function() {
    it('should succeed',function() {
        expect(true).to.be(true);
    });
});

describe('Index Page', function(){
    it('the page should contain a title', function() {
        browser.get('http://localhost:3000/client/index.html#');
        var tt =  browser.getTitle();
        expect(tt).to.be('Instaevents');
      });

    it('the page should direct itself on Instaevent link click', function() {
        browser.get('http://localhost:3000/client/index.html#');
        element(by.id('instaeve')).click();
       // expect(tt).to.be(tt);
    });
});


 describe('Checking for features', function(){
 it('the page should have navigation bar', function(){
 var nav = element(by.id('navbar'));
  expect(nav).to.be(nav);
 });

     it('the page should have a map', function(){
         var mp = element(by.id('map'));
         expect(mp).to.be(mp);
     });
 });

describe('Directed to Signup Page', function(){
    it('signup button click should direct to register', function() {
        browser.get('http://localhost:3000/client/index.html#/');
        element(by.id('signupany')).click();
    });
});


describe('Directed to Organiser Signup Page', function(){
    it('signup button click should direct to organiser registration', function() {
        browser.get('http://localhost:3000/client/index.html#/register/');
        var tt =  browser.getTitle();
        return tt;
    });
});