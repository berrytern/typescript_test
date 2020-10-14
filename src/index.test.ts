import request from 'supertest';
import sinon from 'sinon';
import app from './app'
import mongoose from 'mongoose';
const db=mongoose.connect('mongodb://localhost:27017/products', {useNewUrlParser: true});
import Product from './products/products.model';
(async()=>await Product.remove({name:'Default'}))();
describe("Routes: Products", () => {
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
});
describe("Controllers: Products", () => {
  const defaultProduct={
    name:'Default',
    desc:'Product description',
    price:300,
  }
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
  it("Get_all() Products", async done => {
    Product.find().then((doc)=>{
      console.log(doc);
      done()
    }).catch(err=>done(err))
    
  });
});