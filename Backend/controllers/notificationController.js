// import axios from 'axios';
// import dotenv from 'dotenv';
// import Notification from '../models/Notification.js';
  

// dotenv.config();

// const knockApiKey = process.env.KNOCK_API_KEY;
// const workflowKey = process.env.KNOCK_WORKFLOW_KEY; // Updated variable name
// const knockApiUrl = `https://api.knock.app/v1/workflows/${workflowKey}/trigger`;

// export const sendNotification = async (req, res) => {
//     try {
//         const { title, description, recipientsEmail } = req.body;

//         // Ensure recipientsEmail is an array
//         if (!Array.isArray(recipientsEmail) || recipientsEmail.length === 0) {
//             return res.status(400).json({ success: false, message: 'Recipients must be provided as an array.', error: error.message});
//         }

//         // Prepare the notification payload
//         const payload = {
//             recipients: recipientsEmail, // Use the email array here
//             data: {
//                 title,
//                 description,
//             },
//         };

//         console.log('Payload being sent:', payload);


//         // Send the request to Knock API
//         const response = await axios.post(knockApiUrl, payload, {
//             headers: {
//                 Authorization: `Bearer ${knockApiKey}`,
//                 'Content-Type': 'application/json',
//             },
//         });

//         // Handle response from Knock
//         console.log('Notification sent:', response.data);
//         res.json({ success: true, message: 'Notification sent successfully', data: response.data });

//     } catch (error) {
//         console.error('Error sending notification:', error.response ? error.response.data : error.message);
//         res.status(500).json({ success: false, message: 'Failed to send notification', error: error.message });
//     }
// };


import { Knock } from "@knocklabs/node";
import dotenv from 'dotenv';
import Notification from '../models/Notification.js';

dotenv.config();

// Initialize the Knock client with the API key from your environment variables
const knockClient = new Knock(process.env.KNOCK_API_KEY);

export const sendNotification = async (req, res) => {
    try {
        const { title, description, recipientsEmail } = req.body;

        // Ensure recipientsEmail is an array
        if (!Array.isArray(recipientsEmail) || recipientsEmail.length === 0) {
            return res.status(400).json({ success: false, message: 'Recipients must be provided as an array.' });
        }

        // Prepare the notification payload
        const payload = {
            // Specify the workflow key here
            workflowKey: process.env.KNOCK_WORKFLOW_KEY,
            // user ID of the actor (could be any identifier, like admin or service name)
            actor: "admin_user_id", // Replace with your actual actor ID
            // Recipients for the notification
            recipients: recipientsEmail, 
            // Data payload
            data: {
                title,
                description,
            },
            // Optional: tenant identifier if needed
            tenant: "your_tenant_id" // Optional
        };

        // Send the notification using the Knock API
        await knockClient.workflows.trigger(payload.workflowKey, payload);

        // If successful, send a success response
        res.json({ success: true, message: 'Notification sent successfully' });

    } catch (error) {
        console.error('Error sending notification:', error.response ? error.response.data : error.message);
        res.status(500).json({ success: false, message: 'Failed to send notification', error: error.message });
    }
};


export const trackNotification = async (req, res) => {
    const notificationId = req.params.id;
    try {
        const response = await knock.getMessage(notificationId);
        const stats = response.delivery_stats;
        
        const result = {
            delivered: stats.delivered || 0,
            ignored: stats.ignored || 0,
            pushed: stats.pushed || 0,
            clicked: stats.clicked || 0
        };

        res.json({ success: true, message: 'Notification details retrieved', data: result });
    } catch (error) {
        console.error('Error retrieving notification details:', error);
        res.status(500).json({ success: false, message: 'Failed to retrieve notification details' });
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
    const notificationID = req.params.id;
    try {
        const notification = await Notification.findByIdAndDelete(notificationID);
        if (!notification) {
            return res.status(404).json({ success: false, message: "Notification not found." });
        }
        res.json({ success: true, message: "Notification deleted successfully.", data: null });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
