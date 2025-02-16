import mongoose from 'mongoose';

const FormSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    public_id: {
        type: String,
        required: true,
    },
    format: {
        type: String,
        required: true,
    },
    originalName: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});


FormSchema.virtual("id").get(function () {
    return this._id.toHexString();
  });

FormSchema.set("toJSON", {
    virtuals: true,
  });
  
  const Form = mongoose.models.Form || mongoose.model("Form", FormSchema);
  
  export default Form;

// const Form = mongoose.model('Form', FormSchema);
// export default Form;