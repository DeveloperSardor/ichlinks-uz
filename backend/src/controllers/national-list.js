import NationalListSchema from "../schemas/national-list.js";

export class NationalListContr {
  constructor() {}

  // GET metodida oxirgi va keyingisini olish
  static async Get(req, res) {
    try {
      const { id } = req.params;
      if (id) {
        res.send({
          status: 200,
          message: "National list data",
          success: true,
          data: await NationalListSchema.findById(id),
        });
      }else{
        res.send({
            status : 200,
            message : "National list datas",
            success : true,
            data : await NationalListSchema.find()
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

      const newNational = new NationalListSchema({
        youtube_link,
        images,
        title_en,
        title_ru,
        title_uz,
        text_en,
        text_ru,
        text_uz,
      });

      await newNational.save();

      res.send({
        status: 200,
        message: "Successfully added",
        success: true,
        data: newNational,
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

      const updatedNational = await NationalListSchema.findByIdAndUpdate(
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

      if (!updatedNational) {
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
        data: updatedNational,
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

      const deletedNational = await NationalListSchema.findByIdAndDelete(id);

      if (!deletedNational) {
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
        data: deletedNational,
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
