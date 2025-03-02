import { Schema, model } from "mongoose";



const StructureSchema = new Schema({
img : {
    type : String
}
}, {
    timestamps : true
})



export default model('Structures', StructureSchema)

