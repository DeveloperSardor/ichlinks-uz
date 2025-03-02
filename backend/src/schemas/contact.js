import { Schema, model } from 'mongoose'


const ContactSchema = new Schema({
name : {
    type : String
},
phone : {
    type : String
},
message : {
    type : String
}
}, {
    timestamps : true
})


export default model('Contact', ContactSchema);