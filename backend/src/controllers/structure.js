import StructureSchema from "../schemas/structure.js";

export class StructureContr {
  constructor() {}

  static async Get(req, res) {
    try {
      res.send({
        status: 200,
        message: "Structure",
        success: true,
        data: await StructureSchema.find(),
      });
    } catch (error) {
      res.send({
        status: 400,
        message: error.message,
        success: false,
      });
    }
  }
 
  static async Put(req, res) {
    try {
        const { img } =req.body;
        const updateStructure = await StructureSchema.findOneAndUpdate({img})
        res.send({
            status : 200,
            mesPsage : 'Successfuly updated',
            success : true,
            data : updateStructure
        })
    } catch (error) {
        res.send({
            status: 400,
            message: error.message,
            success: false,
          });
    }
  }
}
