import VacancyAppealSchema from '../schemas/vacancy-appeal.js'

export class VacancyAppealContr{
    constructor(){}

    static async Get(req, res){
        try {
            const { id } = req.params;
            if(id){
             res.send({
                status : 200,
                message : `Vacancy appeal by id`,
                success : true,
                data : await VacancyAppealSchema.findById(id).populate('vacancy')
             })
            }else{
                res.send({
                    status : 200,
                    message : `Vacancy appeals`,
                    success : true,
                    data : await VacancyAppealSchema.find().populate('vacancy')
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
            const { vacancy, name, phone,text, resume } = req.body;
             const newAppeal = await VacancyAppealSchema.create({ vacancy, name, phone, text, resume })
             res.send({
                status : 201,
                message : `Successfuly added`,
                success : true,
                data : newAppeal
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
            const findAppealById = await VacancyAppealSchema.findById(id);
            if(!findAppealById){
                throw new Error(`Not found vacancy appeal`)
            }
            const deleteAppeal =  await VacancyAppealSchema.findByIdAndDelete(id);
            res.send({
                status : 200,
                message : "Successfuly deleted",
                success : true,
                data : deleteAppeal
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