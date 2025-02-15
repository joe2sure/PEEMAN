import React, { useState } from 'react';
import { Download, X, AlertCircle } from 'lucide-react';
import '../../styles/components/home/PropertyModal.css';


const PropertyModal = ({ onClose }) => {
  const [downloadError, setDownloadError] = useState(null);

  const handleDownload = async (url, fileName) => {
    try {
      setDownloadError(null);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Failed to download file (${response.status})`);
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Download error:', error);
      setDownloadError(`Failed to download ${fileName}. Please try again.`);
    }
  };

  const handleDownloadGuarantorForm = () => {
    handleDownload(
      'https://res.cloudinary.com/dzf4sqvow/raw/upload/v1739646470/forms/Guarantor2_1739646465996.pdf',
      'Guarantor_Form.pdf'
    );
  };

  const handleDownloadPropertyQuestionnaire = () => {
    handleDownload(
      'https://res.cloudinary.com/dzf4sqvow/raw/upload/v1739646470/forms/Guarantor2_1739646465996.pdf',
      'Property_Questionnaire.pdf'
    );
  };

  return (
    <div className="property-modal-overlay">
      <div className="property-modal-content">
        <div className="property-modal-header">
          <h2>Peeman Forms</h2>
          <button onClick={onClose} className="property-close-button">
            <X size={24} />
          </button>
        </div>
        
        <div className="property-modal-body">
          {downloadError && (
            <div className="property-alert property-alert-error">
              <AlertCircle size={16} />
              <p className="property-alert-message">{downloadError}</p>
            </div>
          )}
          
          <div className="property-form-container">
            <div className="property-form-item">
              <button
                onClick={handleDownloadGuarantorForm}
                className="property-download-button"
              >
                <Download size={24} color="#2563eb" />
              </button>
              <span>Guarantor Form</span>
            </div>
            
            <div className="property-form-item">
              <button
                onClick={handleDownloadPropertyQuestionnaire}
                className="property-download-button"
              >
                <Download size={24} color="#2563eb" />
              </button>
              <span>Property Questionnaire</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyModal;



// const PropertyModal = ({ onClose }) => {

//   const handleDownloadGuarantorForm = () => {
//     // Logic to download Guarantor Form
//     window.location.href = 'https://res.cloudinary.com/dzf4sqvow/image/upload/v1739647185/forms/Guarantor2_1739647180501.pdf';
//   };

//   const handleDownloadPropertyQuestionnaire = () => {
//     // Logic to download Property Questionnaire

//     window.location.href = 'https://res.cloudinary.com/dzf4sqvow/image/upload/v1739647185/forms/Guarantor2_1739647180501.pdf';
//   };

//   return (
//     <div className="property-modal-overlay">
//       <div className="property-modal-content">
//         <div className="property-modal-header">
//           <h2>Peeman Forms</h2>
//           <button onClick={onClose} className="property-close-button">&times;</button>
//         </div>
//         <div className="property-modal-body">
//           <div className="property-form-container">
//             <div className="property-form-item">
//               <div className="circle-icon" onClick={handleDownloadGuarantorForm}>
//                 <span className="download-icon">&#x2193;</span>
//               </div>
//               <span>Guarantor Form</span>
//             </div>
//             <div className="property-form-item">
//               <div className="property-circle-icon" onClick={handleDownloadPropertyQuestionnaire}>
//                 <span className="download-icon">&#x2193;</span>
//               </div>
//               <span>Property Questionnaire</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PropertyModal;