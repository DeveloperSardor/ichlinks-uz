import ContactSchema from "../schemas/contact.js";

export class ContactContr {
  constructor() {}

  static async GetForAdmin(req, res) {
    try {
      res.send({
        status: 200,
        message: "Contact Messages",
        success: true,
        data: await ContactSchema.find().sort({ createdAt : -1 }),
      });
    } catch (error) {
      res.send({
        status: 400,
        message: error.message,
        success: false,
      });
    }
  }

  static async Post(req, res) {
    try {
      const { name, phone, message } = req.body;
      const NewContactMsg = await ContactSchema.create({
        name,
        phone,
        message,
      });
      res.send({
        status: 201,
        message: `Successfuly added`,
        success: true,
        data: NewContactMsg,
      });
    } catch (error) {
      res.send({
        status: 400,
        message: error.message,
        success: false,
      });
    }
  }



  static async Delete(req, res) {
    try {
      const { id } = req.params;
      const findMsgById = await ContactSchema.findById(id);
      if (!findMsgById) {
        throw new Error(`Not found message`);
      }
      const deletedMsg = await ContactSchema.findByIdAndDelete(id);
      res.send({
        status: 200,
        message: `Successfuly deleted`,
        success: true,
        data: deletedMsg,
      });
    } catch (error) {
      res.send({
        status: 400,
        message: error.message,
        success: false,
      });
    }
  }
}
