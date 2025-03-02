import AnnouncementSchema from "../schemas/announcement.js";

export class AnnouncementContr {
  constructor() {}

  static async Get(req, res) {
    try {
      const { id } = req.params;
      const findAnnounceById = await AnnouncementSchema.findById(id);
      if (id) {
         // Hozirgi e'lonni ID bo'yicha topish
    const findAnnounceById = await AnnouncementSchema.findById(id);

    if (findAnnounceById) {
      // Hozirgi e'lonni olib tashlab, oxirgi 3 ta e'lonni olish
      const recommendedAnnouncements = await AnnouncementSchema.find({
        _id: { $ne: id }, // Hozirgi e'lonni olib tashlash
      })
        .sort({ createdAt: -1 }) // So'nggi e'lonlar birinchi bo'lsin
        .limit(3); // Faqat oxirgi 3 ta e'lonni olish

      // Javobni yuborish
      res.send({
        status: 200,
        message: "Announcement by Id",
        success: true,
        data: {
          announcement: findAnnounceById,
          recommended: recommendedAnnouncements, // Tavsiya etilgan oxirgi 3 ta e'lon
        },
      });
    } else {
      res.status(404).send({
        status: 404,
        message: "Announcement not found",
        success: false,
      });
    }
      } else {
        res.send({
          status: 200,
          message: "Announcements",
          success: true,
          data: await AnnouncementSchema.find().sort({ createdAt : -1 }),
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

  static async Post(req, res){
    try {
        const { title_en, title_ru, title_uz, desc_en, desc_ru, desc_uz, img } = req.body;
        
        // Pass the fields as an object
        const newAnnouncement = await AnnouncementSchema.create({
            title_en,
            title_ru,
            title_uz,
            desc_en,
            desc_ru,
            desc_uz,
            img
        });
        
        res.send({
            status : 201,
            message : "Successfully added",
            success : true,
            data : newAnnouncement
        });
    } catch (error) {
        res.send({
            status : 400,
            message : error.message,
            success : false
        });
    }
}



  static async Update(req, res){
    try {
        const { id } = req.params;
        const announcementById = await AnnouncementSchema.findById(id);
         if(!announcementById){
            throw new Error(`Not found announcement`)
         }
         const { title_en, title_ru, title_uz, desc_en, desc_ru, desc_uz, img } = req.body;

         const updatedAnnouncement = await AnnouncementSchema.findByIdAndUpdate(id, {title_en, title_ru, title_uz, desc_en, desc_ru, desc_uz, img}, {new : true})
         res.send({
            status : 200,
            message : `Successfuly updated`,
            success : true,
            data : updatedAnnouncement
         })
    } catch (error) {
        res.send({
            status : 400,
            message : error.message,
            success : false
        })
    }
  }


  static async Delete(req, res){
    try {
        const { id } = req.params;
        const announcementById = await AnnouncementSchema.findById(id);
        if(!announcementById){
           throw new Error(`Not found announcement`)
        }
        const deleteAnnouncement = await AnnouncementSchema.findByIdAndDelete(id);
        res.send({
            status : 200,
            message : `Successfuly deleted`,
            success : true,
            data : deleteAnnouncement
        })
    } catch (error) {
        res.send({
            status : 400,
            message : error.message,
            success : false
        })
    }
  }


}
