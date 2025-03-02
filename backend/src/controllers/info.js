import InfoSchema from "../schemas/info.js";

export class InfoContr {
  constructor() {}

  static async Get(req, res) {
    try {
      const { id } = req.params;
      if (id) {
        res.send({
          status: 200,
          message: `Info by Id`,
          success: true,
          data: await InfoSchema.findById(id),
        });
      } else {
        res.send({
          status: 200,
          message: `Info`,
          success: true,
          data: await InfoSchema.find(),
        });
      }
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
      const {
        home_bgimgs,
        title_en,
        title_ru,
        title_uz,
        img,
        work_time_en,
        work_time_ru,
        work_time_uz,
        address,
        address_text,
        email,
        phone,
        instagram,
        telegram,
        youtube,
        facebook,
      } = req.body;
      const updatedInfo = await InfoSchema.findOneAndUpdate(
        {
          home_bgimgs,
          title_en,
          title_ru,
          title_uz,
          img,
          work_time_en,
          work_time_ru,
          work_time_uz,
          address,
          address_text,
          email,
          phone,
          instagram,
          facebook,
          telegram,
          youtube,
        },
        { new: true }
      );
      res.send({
        status: 200,
        message: `Successfuly updated`,
        success: true,
        data: updatedInfo,
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
