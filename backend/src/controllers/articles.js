import ArticlesSchema from "../schemas/articles.js";

export class ArticlesContr {
  constructor() {}

  static async Get(req, res) {
    try {
      const { id } = req.params;
      if (id) {
        const findArticle = await ArticlesSchema.findById(id);
        res.send({
          status: 200,
          message: "Article by Id",
          success: true,
          data: findArticle,
        });
      } else {
        const articles = await ArticlesSchema.find().sort({ createdAt: -1 });
        res.send({
          status: 200,
          message: "All Articles",
          success: true,
          data: articles,
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
      const { title_en, title_ru, title_uz, desc_en, desc_ru, desc_uz, pdf_file } = req.body;
      console.log(pdf_file);
      
      const newArticle = await ArticlesSchema.create({
        title_en,
        title_ru,
        title_uz,
        desc_en,
        desc_ru,
        desc_uz,
        pdf_file,
      });

      res.status(201).send({
        status: 201,
        message: "Successfully added",
        success: true,
        data: newArticle,
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
      const existingArticle = await ArticlesSchema.findById(id);
      if (!existingArticle) throw new Error(`Article not found`);

      const { title_en, title_ru, title_uz, desc_en, desc_ru, desc_uz, pdf_file } = req.body;
      const updatedArticle = await ArticlesSchema.findByIdAndUpdate(
        id,
        { title_en, title_ru, title_uz, desc_en, desc_ru, desc_uz, pdf_file },
        { new: true }
      );

      res.send({
        status: 200,
        message: "Successfully updated",
        success: true,
        data: updatedArticle,
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
      const existingArticle = await ArticlesSchema.findById(id);
      if (!existingArticle) throw new Error(`Article not found`);

      const deletedArticle = await ArticlesSchema.findByIdAndDelete(id);
      res.send({
        status: 200,
        message: "Successfully deleted",
        success: true,
        data: deletedArticle,
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
