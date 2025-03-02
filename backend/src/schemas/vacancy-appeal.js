import { Schema, Types, model } from 'mongoose';

const VacancyAppealSchema = new Schema({
vacancy : {
    type : Types.ObjectId,
    ref : "JobVacancies"
},
name : {
    type : String,
},
phone : {
    type : String
},
text : {
    type : String
},
resume : {
    type : String
}
}, {
timestamps : true
})


export default model('VacancyAppeal', VacancyAppealSchema)