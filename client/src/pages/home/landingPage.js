import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';


import { fetchProperties } from '../../redux/actions/propertyActions.js';
import PropertyCard from '../../components/PropertyCard.js';
import Spinner from '../../utility/Spinner.js';
import Toaster from '../../utility/Toaster.js';
import '../../styles/pages/landingPage.css';

const LandingPage = () => {
  const dispatch = useDispatch();
  const { properties, loading, error } = useSelector(state => state.property);
  const [toaster, setToaster] = useState(null);

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setToaster({ message: error, type: 'error' });
    }
  }, [error]);

  return (
    <div className="landing-page">
      <h1>Welcome to Our Real Estate App</h1>
      {loading && <Spinner />}
      <div className="property-grid">
        {properties.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
      {toaster && (
        <Toaster
          message={toaster.message}
          type={toaster.type}
          onClose={() => setToaster(null)}
        />
      )}
    </div>
  );
};

export default LandingPage;