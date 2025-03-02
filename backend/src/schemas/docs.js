import {  model, Schema } from 'mongoose';



const DocsSchema = new Schema({
 title_en : {
    type : String
 },
 title_ru : {
    type : String
 },
 title_uz : {
    type : String
 },
 text_en : {
    type : String
 },
 text_ru : {
    type : String
 },
 text_uz : {
    type : String
 },
 link : {
    type : String
 }
},{
    timestamps : true
})


export default model('Docs', DocsSchema)