import UneskoSchema from '../schemas/unesko.js'

export class UneskoContr {
    constructor() {}

    // GET metodida oxirgi va keyingisini olish
    static async Get(req, res) {
        try {
            const { id } = req.params;
            if(id){
                res.send({
                    status : 200,
                    message : "Unesko data",
                    success : true,
                    data : await UneskoSchema.findById(id)
                })
            }else{
                res.send({
                    status : 200,
                    message : "Unesko datas",
                    success : true,
                    data : await UneskoSchema.find()
                })
            }
        } catch (error) {
            res.send({
                status: 400,
                message: error.message,
                success: false,
            });
        }
    }

    // POST metodida yangi Unesco ma'lumotini qo'shish
    static async Post(req, res) {
        try {
            const { youtube_link, images, title_en, title_ru, title_uz, text_en, text_ru, text_uz } = req.body;

            const newUnesko = new UneskoSchema({
                youtube_link,
                images,
                title_en,
                title_ru,
                title_uz,
                text_en,
                text_ru,
                text_uz,
            });

            await newUnesko.save();

            res.send({
                status: 200,
                message: 'Successfuly added',
                success: true,
                data: newUnesko,
            });
        } catch (error) {
            res.send({
                status: 400,
                message: error.message,
                success: false,
            });
        }
    }

    // PUT metodida mavjud Unesco ma'lumotini yangilash
    static async Put(req, res) {
        try {
            const { id } = req.params; // Yangilanishi kerak bo'lgan ma'lumotning ID
            const { youtube_link, images, title_en, title_ru, title_uz, text_en, text_ru, text_uz } = req.body;

            const updatedUnesko = await UneskoSchema.findByIdAndUpdate(
                id,
                {
                    youtube_link,
                    images,
                    title_en,
                    title_ru,
                    title_uz,
                    text_en,
                    text_ru,
                    text_uz,
                },
                { new: true } // Yangilangan ma'lumotni qaytaradi
            );

            if (!updatedUnesko) {
                return res.send({
                    status: 404,
                    message: 'Not found!',
                    success: false,
                });
            }

            res.send({
                status: 200,
                message: 'Successfuly updated',
                success: true,
                data: updatedUnesko,
            });
        } catch (error) {
            res.send({
                status: 400,
                message: error.message,
                success: false,
            });
        }
    }

    // DELETE metodida Unesco ma'lumotini o'chirish
    static async Delete(req, res) {
        try {
            const { id } = req.params; // O'chirilishi kerak bo'lgan ma'lumotning ID

            const deletedUnesko = await UneskoSchema.findByIdAndDelete(id);

            if (!deletedUnesko) {
                return res.send({
                    status: 404,
                    message: 'Not found!',
                    success: false,
                });
            }

            res.send({
                status: 200,
                message: 'Successfuly deleted',
                success: true,
                data: deletedUnesko,
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
