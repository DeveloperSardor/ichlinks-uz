import { model, Schema } from 'mongoose';

const AnnouncementSchema = new Schema({
title_en : {
    type : String
},
title_ru : {
    type : String
},
title_uz : {
    type : String
},
desc_en : {
    type : String
},
desc_ru : {
    type : String
},
desc_uz : {
    type : String
},
img : {
    type : String
}
}, {
    timestamps : true
})


export default model('Announcement', AnnouncementSchema)