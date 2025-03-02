import { model, Schema } from 'mongoose';

const ResourcesSchema = new Schema({
  title_en: {
    type: String,
  },
  title_ru: {
    type: String,
  },
  title_uz: {
    type: String,
  },
  text_en: {
    type: String,
  },
  text_ru: {
    type: String,
  },
  text_uz: {
    type: String,
  },
  youtube_link: {
    type: String,
  },
  pdf_link: {  // Updated field to pdf_link
    type: String,
  },
}, {
  timestamps: true,
});

export default model('Resources', ResourcesSchema);
