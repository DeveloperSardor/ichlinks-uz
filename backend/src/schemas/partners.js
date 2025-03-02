import { model, Schema } from 'mongoose'

const PartnersSchema = new Schema ({
title : {
    type : String
},
img : {
    type : String
}
}, {
timestamps : true
})

export default model('Partners', PartnersSchema)