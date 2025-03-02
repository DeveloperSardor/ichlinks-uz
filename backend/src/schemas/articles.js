import { model, Schema } from 'mongoose';

const ArticlesSchema = new Schema({
    title_en: { type: String },
    title_ru: { type: String },
    title_uz: { type: String },
    desc_en: { type: String },
    desc_ru: { type: String },
    desc_uz: { type: String },
    pdf_file: { type: String } // img o'rniga pdf_file
});

export default model('Articles', ArticlesSchema);
