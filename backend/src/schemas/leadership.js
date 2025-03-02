import { Schema, Types, model } from 'mongoose'


const LeadershipSchema = new Schema({
name_en : {
    type : String
},
name_ru : {
    type : String
},
name_uz : {
    type : String
},
role : {
    type : Types.ObjectId,
    ref : "Roles"
},
img : {
    type : String
}
}, {
    timestamps : true
})


export default model('Leadership', LeadershipSchema)