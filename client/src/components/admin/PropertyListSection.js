import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteExistingProperty, fetchProperties } from '../../redux/actions/propertyActions';

import '../../styles/components/admin/PropertyListSection.css';
import PropertyModal from './PropertyModal';

const PropertyListSection = () => {
  const dispatch = useDispatch();
  const { properties, loading, error } = useSelector(state => state.property);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  const handleAddProperty = () => {
    setIsEditing(false);
    setEditingProperty(null);
    setModalOpen(true);
  };

  const handleEdit = (property) => {
    if (!property) return; // Guard clause
    setIsEditing(true);
    setEditingProperty(property);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!id) return; // Guard clause
    try {
      await dispatch(deleteExistingProperty(id));
      // Property will be removed from the list automatically through Redux
    } catch (error) {
      console.error('Failed to delete property:', error);
      // Handle error (show toast notification, etc.)
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setIsEditing(false);
    setEditingProperty(null);
  };

  // Helper function to format category display
  const formatCategoryDisplay = (property) => {
    if (!property) return 'N/A';
    return property.category || formatCategory(property.propertyType) || 'N/A';
  };

  // Helper function to format category (same as in PropertyModal)
  const formatCategory = (type) => {
    if (!type) return '';
    return type.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Ensure properties is always an array
  const safeProperties = Array.isArray(properties) ? properties : [];

  return (
    <div className="property-list-section">
      <div className="section-header">
        <h2>All Properties</h2>
        <button className="add-property-btn" onClick={handleAddProperty}>
          Add New Property
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Property Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {safeProperties.map((property) => {
            // Guard against invalid property objects
            if (!property || !property.id) return null;
            
            return (
              <tr key={property.id}>
                <td>{property?.name || 'N/A'}</td>
                <td>{formatCategoryDisplay(property)}</td>
                <td>${(property?.price || 0).toLocaleString()}</td>
                <td>
                  <button 
                    onClick={() => handleEdit(property)} 
                    className="edit-btn"
                    disabled={!property.id}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(property.id)} 
                    className="delete-btn"
                    disabled={!property.id}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>


      {modalOpen && (
        <PropertyModal
          isEditing={isEditing}
          property={editingProperty}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default PropertyListSection;



      {/* <table>
        <thead>
          <tr>
            <th>Property Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property.id}>
              <td>{property.name}</td>
              <td>{property.category}</td>
              <td>${property.price.toLocaleString()}</td>
              <td>
                <button onClick={() => handleEdit(property)} className="edit-btn">
                  Edit
                </button>
                <button onClick={() => handleDelete(property.id)} className="delete-btn">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}




// import React, { useState } from 'react';
// import '../../styles/components/admin/PropertyListSection.css';
// import PropertyModal from './PropertyModal';


// const PropertyListSection = () => {
//   const [properties, setProperties] = useState([
//     { id: 1, name: 'Luxury Villa', category: 'Residential', subCategory: 'Villa', price: 500000 },
//     { id: 2, name: 'Downtown Apartment', category: 'Residential', subCategory: 'Apartment', price: 250000 },
//     { id: 3, name: 'Commercial Space', category: 'Commercial', subCategory: 'Office', price: 750000 },
//   ]);

//   const [modalOpen, setModalOpen] = useState(false); // Control modal visibility
//   const [isEditing, setIsEditing] = useState(false); // Track if editing or adding a property
//   const [editingProperty, setEditingProperty] = useState(null); // Track property being edited

//   const   handleAddProperty = () => {
//     setIsEditing(false);
//     setEditingProperty(null);
//     setModalOpen(true); // Open the modal
//   };

//   const handleEdit = (property) => {
//     setIsEditing(true);
//     setEditingProperty(property);
//     setModalOpen(true); // Open the modal for editing
//   };

//   const handleDelete = (id) => {
//     setProperties(properties.filter((property) => property.id !== id));
//   };

//   const handleSaveProperty = (newProperty) => {
//     if (isEditing) {
//       setProperties((prev) =>
//         prev.map((property) => (property.id === newProperty.id ? newProperty : property))
//       );
//     } else {
//       setProperties([...properties, { ...newProperty, id: properties.length + 1 }]);
//     }
//     setModalOpen(false); // Close the modal after saving
//   };

//   return (
//     <div className="property-list-section">
//       <div className="section-header">
//         <h2>All Properties</h2>
//         <button className="add-property-btn" onClick={handleAddProperty}>
//           Add New Property
//         </button>
//       </div>
//       <table>
//         <thead>
//           <tr>
//             <th>Property Name</th>
//             <th>Category</th>
//             {/* <th>Sub Category</th> */}
//             <th>Price</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {properties.map((property) => (
//             <tr key={property.id}>
//               <td>{property.name}</td>
//               <td>{property.category}</td>
//               {/* <td>{property.subCategory}</td> */}
//               <td>${property.price.toLocaleString()}</td>
//               <td>
//                 <button onClick={() => handleEdit(property)} className="edit-btn">Edit</button>
//                 <button onClick={() => handleDelete(property.id)} className="delete-btn">Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {modalOpen && (
//         <PropertyModal
//           isEditing={isEditing}
//           property={editingProperty}
//           onSave={handleSaveProperty}
//           onClose={() => setModalOpen(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default PropertyListSection;