import request from 'supertest';
import sinon from 'sinon';
import app from '../src/app'
import {describe, expect, test} from '@jest/globals'
import mongoose from 'mongoose';
import Product from '../src/model/products';
const db=mongoose.connect('mongodb://localhost:27017/products', { useUnifiedTopology: true, useNewUrlParser: true});
//const fs=jest.createMockFromModule('fs')
describe("Test Api", () => {
  //beforeAll()
  describe("Models", () => {
    const defaultProduct={
      name:'Default',
      desc:'Product description',
      price:300,
    }
    describe("Product",()=>{
      beforeEach(async()=>{
        await Product.deleteOne({name:defaultProduct.name})
      })
      it("Create Product", async done => {
      const response=new Product(defaultProduct);
      response.save().then(i=>{
        expect(typeof(response.name)).toBe('string')
        expect(typeof(response.desc)).toBe('string')
        expect(typeof(response.price)).toBe('number')
        done()
      }).catch(err=>done(err))
      console.log(response)
      
      });
      it("Get_one() Products", async done => {
        Product.findOne(defaultProduct).then((doc)=>{
          console.log(doc);
          done()
        }).catch(err=>done(err))
      })
      it("Get_all() Products", async done => {
        Product.find().then((doc)=>{
          console.log(doc);
          done()
        }).catch(err=>done(err))
      })
      afterEach(async()=>{
        await Product.deleteOne({name:defaultProduct.name})
      })
    });
  });
  describe("Controllers",()=>{
    describe("Product",()=>{
      const defaultProduct={
        name:'Default',
        desc:'Product description',
        price:300,
      }
      it("GET method", async done => {
        return request(app)
          .get('/products')
          .then((res)=>{
            expect(res.status).toBe(200);
            done();
          }).catch(err=>done(err));
      });
      it("POST method", done => {
        return request(app)
          .post("/products/create")
          .send(defaultProduct) // x-www-form-urlencoded
          .set('Accept', 'application/json')
          .then((res)=>{
            expect(res.status).toBe(201);
            done();
          }).catch(err=>done(err));
      });
    })
  })
  //test.todo('algo')
});