import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Download, X, AlertCircle, Loader } from 'lucide-react';
import { downloadForm } from '../../redux/actions/formActions';
import '../../styles/components/home/PropertyModal.css';

const PropertyModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const { downloading, error } = useSelector(state => state.form);

  const handleDownload = async (publicId, fileName) => {
    try {
      await dispatch(downloadForm(publicId, fileName));
    } catch (error) {
      console.error('Download error:', error);
    }
  };

  const handleDownloadGuarantorForm = () => {
    handleDownload(
      'forms/forms/Guarantor2_1739730317969.pdf',
      'Guarantor2.pdf'
    );
  };

  const handleDownloadPropertyQuestionnaire = () => {
    handleDownload(
      'forms/Property_Questionnaire',
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
          {error && (
            <div className="property-alert property-alert-error">
              <AlertCircle size={16} />
              <p className="property-alert-message">{error}</p>
            </div>
          )}
          
          <div className="property-form-container">
            <div className="property-form-item">
              <button
                onClick={handleDownloadGuarantorForm}
                className="property-download-button"
                disabled={downloading}
              >
                {downloading ? (
                  <Loader size={24} className="animate-spin" />
                ) : (
                  <Download size={24} color="#2563eb" />
                )}
              </button>
              <span>Guarantor Form</span>
            </div>
            
            <div className="property-form-item">
              <button
                onClick={handleDownloadPropertyQuestionnaire}
                className="property-download-button"
                disabled={downloading}
              >
                {downloading ? (
                  <Loader size={24} className="animate-spin" />
                ) : (
                  <Download size={24} color="#2563eb" />
                )}
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



// import React, { useState } from 'react';
// import { Download, X, AlertCircle } from 'lucide-react';
// import '../../styles/components/home/PropertyModal.css';

// const PropertyModal = ({ onClose }) => {
//   const [downloadError, setDownloadError] = useState(null);

//   const handleDownload = async (publicId, fileName) => {
//     try {
//       setDownloadError(null);
      
//       const response = await fetch(`/api/v1/forms/download/${encodeURIComponent(publicId)}`);
      
//       if (!response.ok) {
//         throw new Error(`Failed to download file (${response.status})`);
//       }
  
//       const blob = await response.blob();
//       const downloadUrl = window.URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = downloadUrl;
//       link.download = fileName;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(downloadUrl);
//     } catch (error) {
//       console.error('Download error:', error);
//       setDownloadError(`Failed to download ${fileName}. Please try again.`);
//     }
//   };

//   const handleDownloadGuarantorForm = () => {
//     // Use the URL returned from your upload endpoint
//     handleDownload(
//       'https://res.cloudinary.com/dzf4sqvow/image/upload/v1739706698/forms/Guarantor2_1739706696017.pdf',
//       'Guarantor_Form.pdf'
//     );
//   };

//   const handleDownloadPropertyQuestionnaire = () => {
//     handleDownload(
//       'https://res.cloudinary.com/dzf4sqvow/image/upload/v1739706698/forms/Guarantor2_1739706696017.pdf',
//       'Property_Questionnaire.pdf'
//     );
//   };

//   return (
//     <div className="property-modal-overlay">
//       <div className="property-modal-content">
//         <div className="property-modal-header">
//           <h2>Peeman Forms</h2>
//           <button onClick={onClose} className="property-close-button">
//             <X size={24} />
//           </button>
//         </div>
        
//         <div className="property-modal-body">
//           {downloadError && (
//             <div className="property-alert property-alert-error">
//               <AlertCircle size={16} />
//               <p className="property-alert-message">{downloadError}</p>
//             </div>
//           )}
          
//           <div className="property-form-container">
//             <div className="property-form-item">
//               <button
//                 onClick={handleDownloadGuarantorForm}
//                 className="property-download-button"
//               >
//                 <Download size={24} color="#2563eb" />
//               </button>
//               <span>Guarantor Form</span>
//             </div>
            
//             <div className="property-form-item">
//               <button
//                 onClick={handleDownloadPropertyQuestionnaire}
//                 className="property-download-button"
//               >
//                 <Download size={24} color="#2563eb" />
//               </button>
//               <span>Property Questionnaire</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PropertyModal;