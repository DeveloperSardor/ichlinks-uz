import JWT from '../utils/jwt.js'
import AdminSchema from '../schemas/admin.js'
import bcrypt from 'bcryptjs'

export class AdminContr {
    constructor() {}
  

  static async AddAdmin(req, res){
    try {
        const { fullname, login, password } = req.body;
        const newAdmin = await AdminSchema.create({ fullname, login, password })
        const token = JWT.SIGN(newAdmin?._id)
        res.send({
            status : 201,
            message : "Successfuly added",
            success : true,
            data : newAdmin,
            token
        })
    } catch (error) {
        res.status(400).send({
            status: 400,
            message: error.message,
            success: false,
          });
    }
  }


    static async Login(req, res) {
      try {
        const { login, password } = req.body;
  
        console.log("Received login:", login);
        console.log("Received password:", password);
  
        // Find admin by login
        const admin = await AdminSchema.findOne({ login });
        if (!admin) {
          throw new Error(`Invalid login credentials`);
        }
  
        console.log("Admin from DB:", admin);
  
        // Compare entered password with the hashed password
        const isMatch = await bcrypt.compare(password, admin.password);
        console.log("Password comparison result:", isMatch);
        if (!isMatch) {
          throw new Error(`Invalid login credentials`);
        }
  
        // Generate JWT token
        const token = JWT.SIGN(admin._id);
        console.log("Generated token:", token);
  
        // Send response without the password
        const { _id, fullname } = admin.toObject();
        res.status(200).send({
          status: 200,
          message: "Login successful",
          token,
          success : true,
          data: { _id, fullname, login },
        });
      } catch (error) {
        console.error("Error during login:", error.message);
        res.status(400).send({
          status: 400,
          message: error.message,
          success: false,
        });
      }
    }
  }
  