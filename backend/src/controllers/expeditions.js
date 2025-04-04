import ExpeditionsSchema from "../schemas/expeditions.js";

export class ExpeditionsContr {
  constructor() {}

  // GET metodida oxirgi va keyingisini olish
  static async Get(req, res) {
    try {
      const { id } = req.params;
      if (id) {
        res.send({
          status: 200,
          message: "Expeditions data",
          success: true,
          data: await ExpeditionsSchema.findById(id),
        });
      }else{
        res.send({
            status : 200,
            message : "Expeditions datas",
            success : true,
            data : await ExpeditionsSchema.find()
        })
      }
    } catch (error) {
      res.send({
        status: 400,
        message: error.message,
        success: false,
      });
    }
  }

  // POST metodida yangi Unesco ma'lumotini qo'shish
  static async Post(req, res) {
    try {
      const {
        youtube_link,
        images,
        title_en,
        title_ru,
        title_uz,
        text_en,
        text_ru,
        text_uz,
      } = req.body;

      const newExpedition = new ExpeditionsSchema({
        youtube_link,
        images,
        title_en,
        title_ru,
        title_uz,
        text_en,
        text_ru,
        text_uz,
      });

      await newExpedition.save();

      res.send({
        status: 200,
        message: "Successfully added",
        success: true,
        data: newExpedition,
      });
    } catch (error) {
      res.send({
        status: 400,
        message: error.message,
        success: false,
      });
    }
  }

  // PUT metodida mavjud Unesco ma'lumotini yangilash
  static async Put(req, res) {
    try {
      const { id } = req.params; // Yangilanishi kerak bo'lgan ma'lumotning ID
      const {
        youtube_link,
        images,
        title_en,
        title_ru,
        title_uz,
        text_en,
        text_ru,
        text_uz,
      } = req.body;

      const updatedExpedition = await ExpeditionsSchema.findByIdAndUpdate(
        id,
        {
          youtube_link,
          images,
          title_en,
          title_ru,
          title_uz,
          text_en,
          text_ru,
          text_uz,
        },
        { new: true } // Yangilangan ma'lumotni qaytaradi
      );

      if (!updatedExpedition) {
        return res.send({
          status: 404,
          message: "Not found!",
          success: false,
        });
      }

      res.send({
        status: 200,
        message: "Successfully updated",
        success: true,
        data: updatedExpedition,
      });
    } catch (error) {
      res.send({
        status: 400,
        message: error.message,
        success: false,
      });
    }
  }

  // DELETE metodida Unesco ma'lumotini o'chirish
  static async Delete(req, res) {
    try {
      const { id } = req.params; // O'chirilishi kerak bo'lgan ma'lumotning ID

      const deletedExpedition = await ExpeditionsSchema.findByIdAndDelete(id);

      if (!deletedExpedition) {
        return res.send({
          status: 404,
          message: "Not found!",
          success: false,
        });
      }

      res.send({
        status: 200,
        message: "Successfully deleted",
        success: true,
        data: deletedExpedition,
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
