import {  model, Schema, Types } from 'mongoose';


const JobVacanciesSchema = new Schema({
role : {
type : Types.ObjectId,
ref : "Roles"
},
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
}, {
    timestamps : true
})


export default model('JobVacancies', JobVacanciesSchema)