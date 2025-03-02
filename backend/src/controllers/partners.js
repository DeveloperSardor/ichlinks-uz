import PartnerSchema from '../schemas/partners.js'


export class PartnersContr{
    constructor(){};

    static async Get(req, res){
        try {
            res.send({
                status : 200,
                message : "Partners",
                success : true,
                data : await PartnerSchema.find()
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
            const { title, img } = req.body;
            const newPartner = await PartnerSchema.create({ title, img })
            res.send({
                status : 201,
                message : "Successfuly added",
                success : true,
                data : newPartner
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
            const findPartnerById = await PartnerSchema.findById(id);
            if(!findPartnerById){
                throw new Error(`Not found partner`)
            }
            const { title, img } = req.body;
            const updatePartner = await PartnerSchema.findByIdAndUpdate(id, { title, img }, { new : true })
            res.send({
                status : 200,
                message : "Successfuly updated",
                success : true,
                data : updatePartner
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
            const findPartnerById = await PartnerSchema.findById(id);
            if(!findPartnerById){
                throw new Error(`Not found partner`)
            }
            const deletePartner = await PartnerSchema.findByIdAndDelete(id);
            res.send({
                status : 200,
                message : "Successfuly deleted",
                success : true,
                data : deletePartner
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