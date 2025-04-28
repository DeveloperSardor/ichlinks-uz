import InternalAuditSchema from "../schemas/internal-audit.js";

export class InternalAuditContr {
  constructor() {}

  static async Get(req, res) {
    try {
      const { id } = req.params;
      if (id) {
        const auditById = await InternalAuditSchema.findById(id);
        if (!auditById) {
          return res.status(404).send({
            status: 404,
            message: "Audit not found",
            success: false,
          });
        }
        return res.send({
          status: 200,
          message: "Audit by Id",
          success: true,
          data: auditById,
        });
      } else {
        return res.send({
          status: 200,
          message: "Audits",
          success: true,
          data: await InternalAuditSchema.find().sort({ createdAt : -1 }),
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
      const { title_en, title_ru, title_uz, desc_en, desc_ru, desc_uz } = req.body;
      const newAudit = await InternalAuditSchema.create({
        title_en,
        title_ru,
        title_uz,
        desc_en,
        desc_ru,
        desc_uz,
      });
      res.status(201).send({
        status: 201,
        message: "Successfully added",
        success: true,
        data: newAudit,
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
      const { title_en, title_ru, title_uz, desc_en, desc_ru, desc_uz } = req.body;
      const findAuditById = await InternalAuditSchema.findById(id);
      if (!findAuditById) {
        return res.status(404).send({
          status: 404,
          message: "Not found audit",
          success: false,
        });
      }
      const updated = await InternalAuditSchema.findByIdAndUpdate(
        id,
        { title_en, title_ru, title_uz, desc_en, desc_ru, desc_uz },
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
      const findAuditById = await InternalAuditSchema.findById(id);
      if (!findAuditById) {
        return res.status(404).send({
          status: 404,
          message: "Not found audit",
          success: false,
        });
      }
      const deletedAudit = await InternalAuditSchema.findByIdAndDelete(id);
      res.send({
        status: 200,
        message: "Successfully deleted",
        success: true,
        data: deletedAudit,
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
// 