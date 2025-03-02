import { model, Schema } from "mongoose";
import bcrypt from 'bcryptjs'

const AdminSchema = new Schema({
login : {
    type : String
},
password : {
    type : String
},
fullname : {
    type : String
}
}, {
    timestamps : true
})

// Hash password before saving to database
AdminSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
      const salt = await bcrypt.genSalt(12);
      this.password = await bcrypt.hash(this.password, salt);
    }
    next();
  });



 
  export default model('Admin', AdminSchema)