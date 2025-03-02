import { Schema, model } from 'mongoose';


const RolesSchema = new Schema({
name_en : {
    type : String
},
name_ru : {
    type : String
},
name_uz : {
    type : String
},
}, {
    timestamps : true
})


export default model('Roles', RolesSchema)