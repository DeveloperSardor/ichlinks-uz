import { model, Schema } from 'mongoose';


const DepartmentSchema = new Schema ({
title_en : {
    type : String
},
title_ru : {
    type : String
},
title_uz : {
    type : String
},
img : {
    type : String
}
})


export default  model('Departmen', DepartmentSchema) ;