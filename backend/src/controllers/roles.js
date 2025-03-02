import RolesSchema from '../schemas/roles.js'


export class RolesContr{
    constructor(){}

    static async Get(req, res){
        try {
            const { id } = req.params;
            if(id){
               res.send({
                status : 200,
                message : "Roles",
                success : true,
                data : await RolesSchema.findById(id)
               })
            }else{
                res.send({
                    status : 200,
                    message : "Roles",
                    success : true,
                    data : await RolesSchema.find()
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
            const { name_en, name_ru, name_uz } = req.body;
            const newRole = await RolesSchema.create({ name_en, name_ru, name_uz })
            res.send({
                status : 201,
                message : `New Role`,
                success : true,
                data : newRole
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
            const findRoleById = await RolesSchema.findById(id);
            if(!findRoleById){
                throw new Error(`Not found Role`)
            }
            const { name_en, name_ru, name_uz } = req.body;
            const updatedRole = await RolesSchema.findByIdAndUpdate(id, { name_en, name_ru, name_uz  }, { new : true })
            res.send({
                status : 200,
                message : "Successfuly updated",
                success : true,
                data : updatedRole
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
            const findRoleById = await RolesSchema.findById(id);
            if(!findRoleById){
                throw new Error(`Not found Role`)
            }
            const deleteRole = await RolesSchema.findByIdAndDelete(id);
            res.send({
                status : 200,
                message : "Successfuly deleted",
                success : true,
                data : deleteRole
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