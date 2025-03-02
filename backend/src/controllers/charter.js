import CharterSchema from "../schemas/charter.js";

export class CharterContr {
  constructor() {}

  static async Get(req, res) {
    try {
      const { id } = req.params;
      if (id) {
        const charterById = await CharterSchema.findById(id);
        if (!charterById) {
          return res.status(404).send({
            status: 404,
            message: "Charter not found",
            success: false,
          });
        }
        return res.send({
          status: 200,
          message: "Charter by Id",
          success: true,
          data: charterById,
        });
      } else {
        return res.send({
          status: 200,
          message: "Charters",
          success: true,
          data: await CharterSchema.find(),
        });
      }
    } catch (error) {
      res.status(400).send({
        status: 400,
        message: error.message,
        success: false,
      });
    }
  }

  static async Post(req, res) {
    try {
      const { title_en, title_ru, title_uz, link } = req.body;
      const newCharter = await CharterSchema.create({
        title_en,
        title_ru,
        title_uz,
        link,
      });
      res.status(201).send({
        status: 201,
        message: "Successfully added",
        success: true,
        data: newCharter,
      });
    } catch (error) {
      res.status(400).send({
        status: 400,
        message: error.message,
        success: false,
      });
    }
  }

  static async Put(req, res) {
    try {
      const { id } = req.params;
      const { title_en, title_ru, title_uz, link } = req.body;
      const findCharterById = await CharterSchema.findById(id);
      if (!findCharterById) {
        return res.status(404).send({
          status: 404,
          message: "Not found charter",
          success: false,
        });
      }
      const updated = await CharterSchema.findByIdAndUpdate(
        id,
        { title_en, title_ru, title_uz, link },
        { new: true }
      );
      res.send({
        status: 200,
        message: "Successfully updated",
        success: true,
        data: updated,
      });
    } catch (error) {
      res.status(400).send({
        status: 400,
        message: error.message,
        success: false,
      });
    }
  }

  static async Delete(req, res) {
    try {
      const { id } = req.params;
      const findCharterById = await CharterSchema.findById(id);
      if (!findCharterById) {
        return res.status(404).send({
          status: 404,
          message: "Not found charter",
          success: false,
        });
      }
      const deletedCharter = await CharterSchema.findByIdAndDelete(id);
      res.send({
        status: 200,
        message: "Successfully deleted",
        success: true,
        data: deletedCharter,
      });
    } catch (error) {
      res.status(400).send({
        status: 400,
        message: error.message,
        success: false,
      });
    }
  }
}
