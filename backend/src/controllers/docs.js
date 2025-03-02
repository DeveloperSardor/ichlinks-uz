import DocsSchema from '../schemas/docs.js'



export class DocsContr{
    constructor(){}

    static async Get(req, res){
        try {
            const { id } = req.params;
            if(id){
               res.send({
                status : 200,
                message : `Docs by Id`,
                success : true,
                data : await DocsSchema.findById(id)
               })
            }else{
                res.send({
                    status : 200,
                    message : `Docs`,
                    success : true,
                    data : await DocsSchema.find().sort({ createdAt : -1 })
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

    static async Post(req, res){
        try {
            const { title_en, title_ru, title_uz, text_en, text_ru, text_uz, link } = req.body;
            const addedDocs = await DocsSchema.create({ title_en, title_ru, title_uz, text_en, text_ru, text_uz, link })
            res.send({
                status : 201,
                message : `Successfully added`,
                success : true,
                data : addedDocs
            })
        } catch (error) {
            res.send({
                status : 400,
                message : error.message,
                success : false
            })
        }
    }

    static async Put(req, res){
        try {
            console.log('salom');
            
            const { id } = req.params;
            const findDocsById = await DocsSchema.findById(id);
            if(!findDocsById){
                throw new Error(`Not found docs`)
            }
            const { title_en, title_ru, title_uz, text_en, text_ru, text_uz, link } = req.body;
            const updatedDocs = await DocsSchema.findByIdAndUpdate(id, { title_en, title_ru, title_uz, text_en, text_ru, text_uz, link  }, { new : true })
            res.send({
                status : 200,
                message : "Successfuly updated",
                success : true,
                data : updatedDocs
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
            const findDocsById = await DocsSchema.findById(id);
            if(!findDocsById){
                throw new Error(`Not found docs`)
            }
            const deletedDocs = await DocsSchema.findByIdAndDelete(id);
            res.send({
                status : 200,
                message : "Successfuly deleted",
                success : true,
                data : deletedDocs
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