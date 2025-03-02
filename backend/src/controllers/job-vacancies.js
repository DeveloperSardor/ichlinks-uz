import JobVacanciesSchema from "../schemas/job-vacancies.js";

export class JobVacanciesContr {
  constructor() {}

  static async Get(req, res) {
    try {
      const { id } = req.params;
      if (id) {
        res.send({
          status: 200,
          message: "Vacancies by Id",
          success: true,
          data: await JobVacanciesSchema.findById(id).populate('role'),
        });
      } else {
        res.send({
          status: 200,
          message: `Vacancies`,
          success: true,
          data: await JobVacanciesSchema.find().populate('role'),
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

  static async Post(req, res) {
    try {
      const { role, title_en, title_ru, title_uz, text_en, text_ru, text_uz } =
        req.body;
      const newVacancy = await JobVacanciesSchema.create({
        role,
        title_en,
        title_ru,
        title_uz,
        text_en,
        text_ru,
        text_uz,
      });
      res.send({
        status: 201,
        message: `Successfuly added`,
        success: true,
        data: newVacancy,
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
      const { id } = req.params;
      const findVacancyById = await JobVacanciesSchema.findById(id);
      if (!findVacancyById) {
        throw new Error(`Not found vacancy`);
      }
      const { role, title_en, title_ru, title_uz, text_en, text_ru, text_uz } =
        req.body;
      const updatedVacancy = await JobVacanciesSchema.findByIdAndUpdate(
        id,
        { role, title_en, title_ru, title_uz, text_en, text_ru, text_uz },
        { new: true }
      );
      res.send({
        status : 200,
        message : `Successfuly updated`,
        success : true,
        data : updatedVacancy
      })
    } catch (error) {
      res.send({
        status: 400,
        message: error.message,
        success: false,
      });
    }
  }


  static async Delete(req, res){
    try {
        const { id } = req.params;
        const findVacancyById = await JobVacanciesSchema.findById(id);
        if (!findVacancyById) {
          throw new Error(`Not found vacancy`);
        }
        const deletedVacancy = await JobVacanciesSchema.findByIdAndDelete(id);
        res.send({
            status : 200,
            message : `Successfuly deleted`,
            success : true,
            data : deletedVacancy
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
