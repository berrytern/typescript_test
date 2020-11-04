import path from 'path'
import * as dotenv from 'dotenv'
dotenv.config({path: path.resolve(__dirname,'../.env')})
import request from 'supertest';
import sinon from 'sinon';
import app from '../src/app'
import {describe, expect, test} from '@jest/globals'
import mongoose from 'mongoose';
import Product from '../src/model/products';
import jwt from 'jwt-simple';
const db=mongoose.connect('mongodb://localhost:27017/products', { useUnifiedTopology: true, useNewUrlParser: true});
//const fs=jest.createMockFromModule('fs')
const defaultProduct={
  name:'Default',
  desc:'Product description',
  price:300,
}
let token:string;
//const auth
describe("Test Api", () => {
  afterEach(()=>{jest.clearAllMocks()})
  describe("Models", () => {
    describe("Product",()=>{
      beforeEach(async()=>{
        await Product.deleteOne({name:defaultProduct.name})
      })
      it("Create Product", async done => {
      const response=new Product(defaultProduct);
      const save=jest.spyOn(response,'save')
      response.save().then(i=>{
        expect(response).toHaveProperty('name')
        expect(response).toHaveProperty('desc')
        expect(response).toHaveProperty('price')
        expect(typeof(response.name)).toContain('string')
        expect(typeof(response.desc)).toBe('string')
        expect(typeof(response.price)).toBe('number')
        done()
      }).catch(err=>done(err))
      expect(save).toBeCalledTimes(1)
      
      });
      it("Get_one() Products", async done => {
        const findOne=jest.spyOn(Product,'findOne')
        Product.findOne(defaultProduct).then((doc)=>{
          console.log(doc);
          done()
        }).catch(err=>done(err))
        expect(findOne).toBeCalledTimes(1)
        expect(findOne).toBeCalledWith(defaultProduct)
      })
      it("Get_all() Products", async done => {
        const find=jest.spyOn(Product,'find')
        Product.find().then((doc)=>{
          console.log(doc);
          done()
        }).catch(err=>done(err))
        expect(find).toBeCalledTimes(1)
        expect(find).toBeCalledWith()
      })
      afterEach(async()=>{
        await Product.deleteOne({name:defaultProduct.name})
      })
    });
  });
  describe("Controllers",()=>{
    describe("Auth",()=>{
      it("not.authorizarion-Header",async(done)=>{
        return request(app)
          .get('/auth').then(res=>{
            expect(res).toHaveProperty('status',400)
            done()
          }).catch(err=>done(err));
      })
      it("with.authorizarion-Header",async(done)=>{
        return request(app)
          .get('/auth')
            .set('Authorization','Bearer ')  
          .then(res=>{
            expect(res).toHaveProperty('status',401)
            done()
          }).catch(err=>done(err));
      })
      it("with.token",async(done)=>{
        console.log('token',jwt.encode({user:1,exp:Math.floor(Date.now()/1000)+60*20},process.env.authSecret||""))
        return request(app)
          .get('/auth')
            .set('Authorization','Bearer '+jwt.encode({user:1,exp:Math.floor(Date.now()/1000)+60*20},process.env.authSecret||""))
          .then(res=>{
            expect(res).toHaveProperty('status',200)
            done()
          }).catch(err=>done(err));
      })
    })
    describe("Product",()=>{
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