import { model, Schema, Types } from 'mongoose';


const CharterSchema = new Schema({
    title_en : {
        type : String
    },
    title_ru : {
        type : String
    },
    title_uz : {
        type : String
    },
    link : {
      type : String
    }
})


export default model('Charter', CharterSchema);