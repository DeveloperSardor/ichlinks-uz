import NewsSchema from '../schemas/news.js'


export class NewsContr{
    constructor(){}

    static async Get(req, res){
        try {
            const { id } = req.params;
           if(id){ 
            res.send({
                status : 200,
                message : "News",
                success : true,
                data : await NewsSchema.findById(id)
            })
           }else{
            res.send({
                status : 200,
                message : "News",
                success : true,
                data : await NewsSchema.find().sort({ createdAt : -1 })
            })
           }

        } catch (error) {
            res.send({
                status : 400,
                message : error.message,
                success : false
            })
        }
    }
    static async Post(req, res) {
      try {
        const { title_en, title_ru, title_uz, text_en, text_ru, text_uz, youtube_link, files } = req.body;
    console.log(req.body);
    
        // Validate that only one is present
        if (youtube_link && files && files.length > 0) {
          throw new Error('You can only submit either a YouTube link or files, not both.');
        }
    
        if (!youtube_link && (!files || files.length === 0)) {
          throw new Error('Please provide either a YouTube link or files.');
        }
    
        const addedNews = await NewsSchema.create({
          title_en,
          title_ru,
          title_uz,
          text_en,
          text_ru,
          text_uz,
          youtube_link,
          files: files?.map((image) => ({ type_file: 'image', link: image })), // Save the images as file objects
        });
    
        res.status(201).send({
          status: 201,
          message: 'New News successfully created',
          success: true,
          data: addedNews,
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
          const findNewsById = await NewsSchema.findById(id);
          if (!findNewsById) {
            throw new Error(`Not found news`);
          }
          const { title_en, title_ru, title_uz, text_en, text_ru, text_uz, youtube_link, files } = req.body;
      
          // Validate that only one is present
          if (youtube_link && files && files.length > 0) {
            throw new Error('You can only submit either a YouTube link or files, not both.');
          }
      
          const updateNews = await NewsSchema.findByIdAndUpdate(id, { title_en, title_ru, title_uz, text_en, text_ru, text_uz, youtube_link, files: files?.map((image) => ({ type_file: 'image', link: image })) }, { new: true });
      
          res.send({
            status: 200,
            message: `Successfully updated`,
            success: true,
            data: updateNews
          });
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
            const { id } = await req.params;
            const findNewsById = await NewsSchema.findById(id);
            if(!findNewsById){
                throw new Error(`Not found news`)
            }
            const deleteNews = await NewsSchema.findByIdAndDelete(id)
            res.send({
                status : 200,
                message : `Successfuly deleted`,
                success : true,
                data : deleteNews
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