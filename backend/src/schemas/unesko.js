import { model, Schema } from "mongoose";


const UneskoSchema = new Schema({
    youtube_link : {type : String},
    images : [{type : String}],
    title_en : {type : String},
    title_ru : {type : String},
    title_uz : {type : String},
    text_en : {type : String},
    text_ru : {type : String},
    text_uz : {type : String},
}, {
    timestamps : true
})


export default model('Unesko', UneskoSchema)