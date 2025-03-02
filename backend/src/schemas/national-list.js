import { Schema, model } from 'mongoose';

const NationalListSchema = new Schema({
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
text_ru:{
    type : String
},
text_uz : {
    type : String
},
youtube_link : {
    type : String
},
images : [{
    type : String
}]
}, {
    timestamps : true
})


export default model('NationalList', NationalListSchema)