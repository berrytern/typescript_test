import path from 'path'
import * as dotenv from 'dotenv'
dotenv.config({path: path.resolve(__dirname,'../.env')})
import request from 'supertest';
import sinon from 'sinon';
import app from '../src/app'
import {describe, expect, test} from '@jest/globals'
import mongoose from 'mongoose';
import {Product} from '../src/model/products';
import jwt from 'jwt-simple';
import {defaultProduct,defaultProduct2} from './mocks/product'
const mock=false
const appMock = app(mock)
//const fs=jest.createMockFromModule('fs')

let token:string;

//const auth
describe("Test Api", () => {
  beforeAll(()=>{
    const db=mongoose.connect('mongodb://localhost:27017/products', { useUnifiedTopology: true, useNewUrlParser: true});
  })
  afterEach(()=>{jest.clearAllMocks()})
  describe("Models", () => {
    describe("Product",()=>{
      beforeAll(async()=>{
        await Product.deleteOne({name:defaultProduct.name})
      })
      afterAll(async()=>{
        await Product.deleteOne({name:defaultProduct.name})
      })
      it("Create Product", async done => {
      const response=new Product(defaultProduct);
      const save=jest.spyOn(response,'save')
      response.save().then(i=>{
        expect(response).toHaveProperty('name')
        expect(response).toHaveProperty('desc')
        expect(response).toHaveProperty('price')
        expect(typeof(response.name)).toBe('string')
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
    });
  });
  describe("Controllers",()=>{
    describe("Auth",()=>{
      it("not.authorizarion-Header",async(done)=>{
        return request(appMock)
          .get('/auth').then(res=>{
            expect(res).toHaveProperty('status',400)
            done()
          }).catch(err=>done(err));
      })
      it("with.authorizarion-Header",async(done)=>{
        return request(appMock)
          .get('/auth')
            .set('Authorization','Bearer ')  
          .then(res=>{
            expect(res).toHaveProperty('status',401)
            done()
          }).catch(err=>done(err));
      })
      it("with.token",async(done)=>{
        console.log('token',jwt.encode({user:1,exp:Math.floor(Date.now()/1000)+60*20},process.env.authSecret||""))
        return request(appMock)
          .get('/auth')
            .set('Authorization','Bearer '+jwt.encode({user:1,exp:Math.floor(Date.now()/1000)+60*20},process.env.authSecret||""))
          .then(res=>{
            expect(res).toHaveProperty('status',200)
            done()
          }).catch(err=>done(err));
      })
    })
    describe("Product",()=>{
      if(!mock){
         beforeAll(async()=>{
          await Product.deleteOne({name:defaultProduct.name})
          await Product.deleteOne({name:defaultProduct2.name})
        })
        afterAll(async()=>{
          await Product.deleteOne({name:defaultProduct.name})
          await Product.deleteOne({name:defaultProduct2.name})
        })
      }
     
      describe('Create',()=>{
        it("should test creation with empty", done => {
          return request(appMock)
            .post("/products")
            .send() // x-www-form-urlencoded
            .set('Accept', 'application/json')
            .then((res)=>{
              expect(res.status).toBe(400);
              done();
            }).catch(err=>done(err));
        });
        it("should test creation with {}", done => {
          return request(appMock)
            .post("/products")
            .send() // x-www-form-urlencoded
            .set('Accept', 'application/json')
            .then((res)=>{
              expect(res.status).toBe(400);
              done();
            }).catch(err=>done(err));
        });
        it("should test creation without name", done => {
          let {name,...without_name}= defaultProduct
          return request(appMock)
            .post("/products")
            .send(without_name) // x-www-form-urlencoded
            .set('Accept', 'application/json')
            .then((res)=>{
              expect(res.status).toBe(400);
              done();
            }).catch(err=>done(err));
        });
        it("should test creation without price", done => {
          let {price,...without_price}= defaultProduct
          return request(appMock)
            .post("/products")
            .send(without_price) // x-www-form-urlencoded
            .set('Accept', 'application/json')
            .then((res)=>{
              expect(res.status).toBe(400);
              done();
            }).catch(err=>done(err));
        });
        it("should test creation without desc", done => {
          let {desc,...without_desc}= defaultProduct
          return request(appMock)
            .post("/products")
            .send(without_desc) // x-www-form-urlencoded
            .set('Accept', 'application/json')
            .then((res)=>{
              expect(res.status).toBe(400);
              done();
            }).catch(err=>done(err));
        });
        it("should test creation with name", done => {
          let {price,desc, ...with_only_name}= defaultProduct
          return request(appMock)
            .post("/products")
            .send(with_only_name) // x-www-form-urlencoded
            .set('Accept', 'application/json')
            .then((res)=>{
              expect(res.status).toBe(400);
              done();
            }).catch(err=>done(err));
        });
        it("should test creation with price", done => {
          let {name, desc, ...with_only_price}= defaultProduct
          return request(appMock)
            .post("/products")
            .send(with_only_price) // x-www-form-urlencoded
            .set('Accept', 'application/json')
            .then((res)=>{
              expect(res.status).toBe(400);
              done();
            }).catch(err=>done(err));
        });
        it("should test creation with desc", done => {
          let {name, price, ...with_only_desc}= defaultProduct
          return request(appMock)
            .post("/products")
            .send(with_only_desc) 
            .set('Accept', 'application/json')
            .then((res)=>{
              expect(res.status).toBe(400);
              done();
            }).catch(err=>done(err));
        });
        it("should test creation with null", done => {
          const param= {name:null, price:null, desc:null}
          return request(appMock)
            .post("/products")
            .send(param) 
            .set('Accept', 'application/json')
            .then((res)=>{
              expect(res.status).toBe(400);
              done();
            }).catch(err=>done(err));
        });
        it("should test creation with empty string", done => {
          const param= {name:'', price:'', desc:''}
          return request(appMock)
            .post("/products")
            .send(param) 
            .set('Accept', 'application/json')
            .then((res)=>{
              expect(res.status).toBe(400);
              done();
            }).catch(err=>done(err));
        });
        it("should create a product",done=>{
          return request(appMock)
            .post("/products")
            .send(defaultProduct) 
            .set('Accept', 'application/json')
            .then((res)=>{
              expect(res.status).toBe(201);
              done();
            }).catch(err=>done(err));
        })
        it("should create a product",done=>{
          return request(appMock)
            .post("/products")
            .send(defaultProduct2) 
            .set('Accept', 'application/json')
            .then((res)=>{
              expect(res.status).toBe(201);
              done();
            }).catch(err=>done(err));
        })
      })
      describe("Get",()=>{
        describe('One',()=>{
          it("should get one with", async done => {
            return request(appMock)
              .get("/products")
              .type('form')
              .send({name:defaultProduct.name})
              .then((res)=>{
                expect(res.status).toBe(200);
                expect(res).toHaveProperty('body')
                expect(res.body).toBeDefined()
                expect(res.body).toHaveProperty('_id')
                expect(res.body).toHaveProperty('name',defaultProduct.name)
                expect(res.body).toHaveProperty('desc',defaultProduct.desc)
                expect(res.body).toHaveProperty('price',defaultProduct.price)
                done();
              }).catch(err=>done(err));
          });
          it("should get one", async done => {
            return request(appMock)
              .get("/products")
              .type("form")
              .send({desc:defaultProduct.desc})
              .then((res)=>{
                expect(res.status).toBe(200);
                expect(res).toHaveProperty('body')
                expect(res.body).toBeDefined()
                expect(res.body).toHaveProperty('_id')
                expect(res.body).toHaveProperty('name',defaultProduct.name)
                expect(res.body).toHaveProperty('desc',defaultProduct.desc)
                expect(res.body).toHaveProperty('price',defaultProduct.price)
                done();
              }).catch(err=>done(err));
          });
          it("should get one", async done => {
            return request(appMock)
              .get('/products')
              .type('form')
              .send({price:defaultProduct.price})
              .then((res)=>{
                expect(res.status).toBe(200);
                expect(res).toHaveProperty('body')
                expect(res.body).toBeDefined()
                expect(res.body).toHaveProperty('_id')
                expect(res.body).toHaveProperty('name',defaultProduct.name)
                expect(res.body).toHaveProperty('desc',defaultProduct.desc)
                expect(res.body).toHaveProperty('price',defaultProduct.price)
                done();
              }).catch(err=>done(err));
          });
        })
        describe('All',()=>{
          beforeAll(async()=>{
            await Product.deleteOne(defaultProduct)
            await Product.deleteOne(defaultProduct2)
            await new Product(defaultProduct).save()
            await new Product(defaultProduct2).save()
          })
          
          it("should get all with name", async done => {
            return request(appMock)
              .get("/products/all")
              .type("form")
              .send({name:defaultProduct.name})
              .then((res)=>{
                expect(res.status).toBe(200);
                expect(res.body).toHaveLength(1)
                expect(res.body[0]).toHaveProperty('_id')
                expect(res.body[0]).toHaveProperty('name',defaultProduct.name)
                expect(res.body[0]).toHaveProperty('desc',defaultProduct.desc)
                expect(res.body[0]).toHaveProperty('price',defaultProduct.price)
                done();
              }).catch(err=>done(err));
          });
          it("should get all with desc", async done => {
            return request(appMock)
              .get("/products/all")
              .type("form")
              .send({desc:defaultProduct.desc})
              .then((res)=>{
                expect(res.status).toBe(200);
                expect(res.body).toHaveLength(1)
                expect(res.body[0]).toHaveProperty('_id')
                expect(res.body[0]).toHaveProperty('name',defaultProduct.name)
                expect(res.body[0]).toHaveProperty('desc',defaultProduct.desc)
                expect(res.body[0]).toHaveProperty('price',defaultProduct.price)
                done();
              }).catch(err=>done(err));
          });
          it("should get all with price", async done => {
            return request(appMock)
              .get("/products/all")
              .type("form")
              .send({price:defaultProduct.price})
              .then((res)=>{
                expect(res.status).toBe(200);
                expect(res.body).toHaveLength(1)
                expect(res.body[0]).toHaveProperty('_id')
                expect(res.body[0]).toHaveProperty('name',defaultProduct.name)
                expect(res.body[0]).toHaveProperty('desc',defaultProduct.desc)
                expect(res.body[0]).toHaveProperty('price',defaultProduct.price)
                done();
              }).catch(err=>done(err));
          });
          it("should get all", async done => {
            return request(appMock)
              .get("/products/all")
              .type("form")
              .send()
              .then((res)=>{
                expect(res.status).toBe(200);
                expect(res.body).toHaveLength(2)
                expect(res.body[0]).toHaveProperty('_id')
                expect(res.body[0]).toHaveProperty('name',defaultProduct.name)
                expect(res.body[0]).toHaveProperty('desc',defaultProduct.desc)
                expect(res.body[0]).toHaveProperty('price',defaultProduct.price)
                expect(res.body[1]).toHaveProperty('_id')
                expect(res.body[1]).toHaveProperty('name',defaultProduct2.name)
                expect(res.body[1]).toHaveProperty('desc',defaultProduct2.desc)
                expect(res.body[1]).toHaveProperty('price',defaultProduct2.price)
                done();
              }).catch(err=>done(err));
          });
        })
      })
      describe("Delete",()=>{
        it("should test delete with empty",done=>{
          return request(appMock)
            .delete("/products")
            .send() // x-www-form-urlencoded
            .then((res)=>{
              expect(res.status).toBe(400);
              done();
            }).catch(err=>done(err));
        })
        it("should test delete with name equal null",done=>{
          return request(appMock)
            .delete("/products")
            .send({name:null})
            .set("Accept", "application/json") 
            .then((res)=>{
              expect(res.status).toBe(400);
              done();
            }).catch(err=>done(err));
        })
        it("should delete",done=>{
          return request(appMock)
            .delete("/products")
            .send({name:defaultProduct.name}) 
            .set("Accept", "application/json")
            .then((res)=>{
              expect(res.status).toBe(204);
              done();
            }).catch(err=>done(err));
        })
      })
    })
  })
  //test.todo('algo')
});