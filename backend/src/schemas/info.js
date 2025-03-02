import { model, Schema } from 'mongoose'


const InfoSchema = new Schema({
home_bgimgs : [{
    type : String
}],
title_en : {
    type : String,
    default : "Scientific Research Institute of Cultural Studies and Intangible Cultural Heritage"
},
title_ru : {
    type : String,
    default : "Культурология и нематериальные Научно-исследовательский институт культурного наследия"
},
title_uz : {
    type : String,
    default : "Madaniyatshunoslik va nomoddiy madaniy me'ros ilmiy tadqiqot instituti"
},
img : {
    type : String,
    // default : 'http://localhost:5173/src/assets/logo.png'
},
work_time_en : {
    type : String
},
work_time_ru : {
    type : String
},
work_time_uz : {
type : String
},
address : [{
    type : Number
}],
address_text : {
type : String
},
email : {
    type : String,
    trim : true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
},
phone : {
    type : String
},
instagram : {
    type : String
},
telegram : {
    type : String
},
youtube : {
    type : String
},
facebook : {
    type : String
}
}, {
timestamps : true
})

export default model('Info', InfoSchema)