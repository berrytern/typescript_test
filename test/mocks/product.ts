'use strict'
import crypto from "crypto"
export interface IProduct{
    _id:any,
    name:string,
    desc:string,
    price:number,
}

export interface InProduct{
    name:string,
    desc:string,
    price:number
}
interface find{
    (arg0:Partial<InProduct>):IProduct[],
}
interface findOne{
    (arg0:Partial<InProduct>):IProduct
}
interface create{
    (arg0:InProduct):IProduct
}
interface deleted{
    (arg0:Partial<InProduct>):{deletedCount:number}
}
export interface IMock {
    create:create,
    find:find,
    findOne:findOne,
    findAll:find,
    deleteOne:deleted,
}
export const defaultProduct:InProduct={
    name:'Default',
    desc:'Product description',
    price:300,
}
export const defaultProduct2:InProduct={
    name:'Tênis',
    desc:'material de couro, duradouro',
    price:120,
}
let DBProducts:IProduct[]=[
    
]

const findAll:find=function(arg0){
    return DBProducts.filter(i=>{
        let bool:boolean=true
        if(bool&&!!arg0.name){
            bool=i.name.includes(arg0.name)
        }
        if(bool&&!!arg0.desc){
            bool=i.desc.includes(arg0.desc)
        }
        if(bool&&!!arg0.price){
            bool=String(i.price).includes(String(arg0.price))
        }
        return bool
    })
}
const findOne:findOne=function(arg0){
    return DBProducts.filter(i=>{
        let bool:boolean=true
        if(bool&&!!arg0.name){
            bool=i.name.includes(arg0.name)
        }
        if(bool&&!!arg0.desc){
            bool=i.desc.includes(arg0.desc)
        }
        if(bool&&!!arg0.price){
            bool=String(i.price).includes(String(arg0.price))
        }
        return bool
    })[0]
}
const create:create=(arg0)=>{
    const created={...arg0,_id:crypto.randomBytes(20).toString('hex')}
    DBProducts.push(created)
    return created
}
const deleteOne:deleted=(arg0)=>{
    const deleted = DBProducts.filter(i=>{
        let bool:boolean=true
        if(bool&&!!arg0.name){
            bool=i.name.includes(arg0.name)
        }
        if(bool&&!!arg0.desc){
            bool=i.desc.includes(arg0.desc)
        }
        if(bool&&!!arg0.price){
            bool=String(i.price).includes(String(arg0.price))
        }
        return bool
    })[0]||null
    DBProducts=DBProducts.filter(i=>{!(i.name===deleted.name&&i.desc===deleted.desc&&i.price===deleted.price)})
    return {deletedCount:Object.keys(deleted).length>0?1:0}
}

export const Mock:IMock={
    create:create,
    find:findAll,
    findOne:findOne,
    findAll:findAll,
    deleteOne:deleteOne
}
