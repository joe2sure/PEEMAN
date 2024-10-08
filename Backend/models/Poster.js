import  mongoose from 'mongoose';

const PosterSchema = new mongoose.Schema({
  posterName: {
    type: String,
    required: true,
    trim: true
  },
  imageUrl: {
    type: String,
    required: true
  }
}, {
  timestamps: true 
});

PosterSchema.set("toJSON", {
    virtuals: true,
  });
  
  const Poster = mongoose.models.poster || mongoose.model("Poster", PosterSchema);
  
  export default Poster;


