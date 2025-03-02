import ActivitySchema from '../schemas/activity.js'


export class AcitivityContr{
    constructor(){}


    static async Get(req, res){
        try {
            res.send({
                status : 200,
                message : "Data",
                success : true,
                data : await ActivitySchema.find()
            })
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
            const { title_en, title_ru, title_uz, desc_en, desc_ru, desc_uz } = req.body;
            const newAcitivty = await ActivitySchema.create({ title_en, title_ru, title_uz, text_en, text_ru, text_uz })
            res.send({
                status : 201,
                message : "Successfuly added",
                success : true,
                data : newAcitivty
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
        
        const { title_en, title_ru, title_uz, desc_en, desc_ru, desc_uz } = req.body;
        const updatedActivity = await ActivitySchema.findOneAndUpdate({ title_en, title_ru, title_uz, desc_en, desc_ru, desc_uz }, { new : true })
        res.send({
            status : 200,
            message : "Successfuly updated",
            success : true,
            data : updatedActivity
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
        const deletedActivity = await ActivitySchema.findOneAndDelete();
        res.send({
            status : 200,
            message : "Successfuly deleted",
            success : true,
            data : deletedActivity
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