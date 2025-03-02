import LocalSchema from "../schemas/local-list.js";

export class LocalContr {
  constructor() {}

  static async Get(req, res) {
    try {
      const { id } = req.params;
      if (id) {
        const localById = await LocalSchema.findById(id);
        if (!localById) {
          return res.status(404).send({
            status: 404,
            message: "Local list not found",
            success: false,
          });
        }
        return res.send({
          status: 200,
          message: "Local list by Id",
          success: true,
          data: localById,
        });
      } else {
        return res.send({
          status: 200,
          message: "Local lists",
          success: true,
          data: await LocalSchema.find(),
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
      const newLocal = await LocalSchema.create({
        title_en,
        title_ru,
        title_uz,
        link,
      });
      res.status(201).send({
        status: 201,
        message: "Successfully added",
        success: true,
        data: newLocal,
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
      const findListById = await LocalSchema.findById(id);
      if (!findListById) {
        return res.status(404).send({
          status: 404,
          message: "Not found local list",
          success: false,
        });
      }
      const updated = await LocalSchema.findByIdAndUpdate(
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
      const findListById = await LocalSchema.findById(id);
      if (!findListById) {
        return res.status(404).send({
          status: 404,
          message: "Not found local list",
          success: false,
        });
      }
      const deletedLocal = await LocalSchema.findByIdAndDelete(id);
      res.send({
        status: 200,
        message: "Successfully deleted",
        success: true,
        data: deletedLocal,
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
