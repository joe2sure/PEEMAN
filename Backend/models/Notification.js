import mongoose from 'mongoose';

// Define the Notification schema
const NotificationSchema = new mongoose.Schema({
    notificationId: {
        type: String,
        required: [true, 'Notification ID is required'],
        unique: true
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true
    },
    imageUrl: {
        type: String,
        trim: true
    },
    recipientEmails: [String],
}, { timestamps: true });


NotificationSchema.virtual("id").get(function () {
    return this._id.toHexString();
  });

NotificationSchema.set("toJSON", {
    virtuals: true,
  });
  
  const Notification = mongoose.models.Notification || mongoose.model("Notification", NotificationSchema);
  
  export default Notification;