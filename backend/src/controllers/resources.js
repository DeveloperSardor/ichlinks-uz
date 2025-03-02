import ResourcesSchema from "../schemas/resources.js";

export class ResourceContr {
  constructor() {}

  static async Get(req, res) {
    try {
      const { id } = req.params;
      if (id) {
        res.send({
          status: 200,
          message: "Resources",
          success: true,
          data: await ResourcesSchema.findById(id),
        });
      } else {
        res.send({
          status: 200,
          message: "Resources",
          success: true,
          data: await ResourcesSchema.find(),
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
      const {
        title_en,
        title_ru,
        title_uz,
        text_en,
        text_ru,
        text_uz,
        youtube_link,
        pdf_link,  // pdf_link instead of files
      } = req.body;

      // Ensure either youtube_link or pdf_link is provided
      if (!youtube_link && !pdf_link) {
        return res.send({
          status: 400,
          message: "You must provide either a youtube_link or pdf_link.",
          success: false,
        });
      }

      // Ensure both youtube_link and pdf_link are not provided together
      if (youtube_link && pdf_link) {
        return res.send({
          status: 400,
          message: "Please provide either youtube_link or pdf_link, not both.",
          success: false,
        });
      }

      // Add the new resource to the database
      const newResource = await ResourcesSchema.create({
        title_en,
        title_ru,
        title_uz,
        text_en,
        text_ru,
        text_uz,
        youtube_link,
        pdf_link,  // Saving pdf_link
      });

      res.send({
        status: 201,
        message: "Successfully added",
        success: true,
        data: newResource,
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
      const findResourceById = await ResourcesSchema.findById(id);
      if (!findResourceById) {
        throw new Error('Resource not found');
      }

      const {
        title_en,
        title_ru,
        title_uz,
        text_en,
        text_ru,
        text_uz,
        youtube_link,
        pdf_link,  // pdf_link instead of files
      } = req.body;

      // Ensure either youtube_link or pdf_link is provided
      if (!youtube_link && !pdf_link) {
        return res.send({
          status: 400,
          message: "You must provide either a youtube_link or pdf_link.",
          success: false,
        });
      }

      // Ensure both youtube_link and pdf_link are not provided together
      if (youtube_link && pdf_link) {
        return res.send({
          status: 400,
          message: "Please provide either youtube_link or pdf_link, not both.",
          success: false,
        });
      }

      // Update the resource in the database
      const updatedResource = await ResourcesSchema.findByIdAndUpdate(
        id,
        {
          title_en,
          title_ru,
          title_uz,
          text_en,
          text_ru,
          text_uz,
          youtube_link,
          pdf_link,  // Updating pdf_link
        },
        { new: true } // Return the updated resource
      );

      res.send({
        status: 200,
        message: "Successfully updated",
        success: true,
        data: updatedResource,
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
      const findResourceById = await ResourcesSchema.findById(id);
      if (!findResourceById) {
        throw new Error('Resource not found');
      }
      const deleteResource = await ResourcesSchema.findByIdAndDelete(id);
      res.send({
        status: 200,
        message: "Successfully deleted",
        success: true,
        data: deleteResource,
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
