import LeadershipSchema from '../schemas/leadership.js'


export class LeadershipContr{
    constructor(){}

    static async Get(req, res){
        try {
            const { id } = req.params;
    if(id){
                res.send({
                    status : 200,
                    message : `Leadership`,
                    success : true,
                    data : await LeadershipSchema.findById(id).populate('role')
                })
            }else{
                res.send({
                    status : 200,
                    message : `Leadership`,
                    success : true,
                    data : await LeadershipSchema.find().populate('role')
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
            const { name_en, name_ru, name_uz, role, img } = req.body;
            const newLeadership = await LeadershipSchema.create({ name_en, name_ru, name_uz, role, img })
            console.log(newLeadership)
            res.send({
                status : 201,
                message : `Successfuly added`,
                success : true,
                data : newLeadership
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
            const { id } = req.params;
            const findLeadershipById = await LeadershipSchema.findById(id);
            if(!findLeadershipById){
                throw new Error(`Not found leadership`)
            }
            const { name_en, name_ru, name_uz, img, role } = req.body;
            console.log(req.body);
            
            const updatedLeadership = await LeadershipSchema.findByIdAndUpdate(id, { name_en, name_ru, name_uz, role, img }, {new : true})
            res.send({
                status : 200,
                message : `Successfuly updated`,
                success : true,
                data : updatedLeadership
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
             const findLeadershipById = await LeadershipSchema.findById(id);
             if(!findLeadershipById){
                 throw new Error(`Not found leadership`)
             }
             const deletedLeadership = await LeadershipSchema.findByIdAndDelete(id);
             res.send({
                status : 200,
                message : `Successfuly deleted`,
                success : true,
                data : deletedLeadership
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