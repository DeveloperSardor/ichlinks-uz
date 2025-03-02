import DepartmentSchema from "../schemas/departments.js";

export class DepartmentContr {
  constructor() {}

  static async Get(req, res) {
    try {
      const { id } = await req.params;
      if (id) {
        res.send({
          status: 200,
          message: `Department by Id`,
          success: true,
          data: await DepartmentSchema.findById(id),
        });
      } else {
        res.send({
          status: 200,
          message: `Departments`,
          success: true,
          data: await DepartmentSchema.find(),
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
      const { title_en, title_ru, title_uz, img } = req.body;
      console.log(req.body);
      
      const addedDepartment = await DepartmentSchema.create({
        title_en,
        title_ru,
        title_uz,
        img,
      });
      res.send({
        status: 201,
        message: `Added successfuly`,
        success: true,
        data: addedDepartment,
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
      const departmentById = await DepartmentSchema.findById(id);
      if (!departmentById) {
        throw new Error(`Not found department`);
      }
      const { title_en, title_ru, title_uz, img } = req.body;
      const updatedDepartment = await DepartmentSchema.findByIdAndUpdate(
        id,
        { title_en, title_ru, title_uz, img },
        { new: true }
      );
      res.send({
        status: 200,
        message: `Successfuly updated`,
        success: true,
        data: updatedDepartment,
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
      const departmentById = await DepartmentSchema.findById(id);
      if (!departmentById) {
        throw new Error(`Not found department`);
      }
      const deletedDepartment = await DepartmentSchema.findByIdAndDelete(id);
      res.send({
        status: 200,
        message: `Successfuly deleted`,
        success: true,
        data: deletedDepartment,
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
