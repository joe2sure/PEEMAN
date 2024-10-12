import OneSignal from 'onesignal-node';
import cloudinary from '../utility/cloudinary.js';
import Notification from '../models/Notification.js';
import mongoose from 'mongoose';

const client = new OneSignal.Client(process.env.ONE_SIGNAL_APP_ID, process.env.ONE_SIGNAL_REST_API_KEY);

export const sendNotification = async (req, res) => {
    try {
        const { title, description, recipientEmails } = req.body;
        let imageUrl = null;

        // Check if image files were uploaded
        if (req.files && req.files.length > 0) {
            // Get the path of the first uploaded image (Cloudinary URL)
            imageUrl = req.files[0].path;  // Assuming you want to use the first image
        }

        let notificationBody = {
            contents: { 'en': description },
            headings: { 'en': title },
            ...(imageUrl && { big_picture: imageUrl })  // Add the image URL if it exists
        };

        // Determine the recipient segment
        if (recipientEmails === 'all') {
            notificationBody.included_segments = ['All'];
        } else if (Array.isArray(recipientEmails)) {
            notificationBody.include_external_user_ids = recipientEmails;
        } else if (typeof recipientEmails === 'string') {
            notificationBody.include_external_user_ids = [recipientEmails];
        } else {
            throw new Error('Invalid recipientEmails format');
        }

        const response = await client.createNotification(notificationBody);
        console.log(response.body);  // Log OneSignal response
        if (response.body && response.body.id) {
            let notificationId = response.body.id;  // Use OneSignal's ID
        
            // Save the notification in the database
            const notification = new Notification({
                notificationId, 
                title, 
                description, 
                imageUrl, 
                recipientEmails 
            });
            await notification.save();
        
            res.json({ success: true, message: 'Notification sent successfully', data: notification });
        } else {
            throw new Error('Failed to create notification in OneSignal');
        }
    } catch (error) {
        // If there was an error and an image was uploaded, delete it from Cloudinary
        if (req.files && req.files.length > 0) {
            await cloudinary.uploader.destroy(req.files[0].filename);
        }
        res.status(500).json({ success: false, message: error.message });
    }
};


export const trackNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await client.viewNotification(id);
        console.log(response);
        const androidStats = response.body.platform_delivery_stats;

        const result = {
            platform: 'Android',
            success_delivery: androidStats.android.successful,
            failed_delivery: androidStats.android.failed,
            errored_delivery: androidStats.android.errored,
            opened_notification: androidStats.android.converted
        };

        res.json({ success: true, message: 'success', data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({}).sort({ _id: -1 });
        res.json({ success: true, message: "Notifications retrieved successfully.", data: notifications });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findByIdAndDelete(id);
        if (!notification) {
            return res.status(404).json({ success: false, message: "Notification not found." });
        }
        res.json({ success: true, message: "Notification deleted successfully.", data: null });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};