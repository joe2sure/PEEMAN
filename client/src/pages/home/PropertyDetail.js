import React, { useState, useEffect } from "react";
import { useLocation, useParams, Navigate } from "react-router-dom";
import Slider from "react-slick";

import bedroomIcon from "../../assets/icons/home/bedroom-icon.svg";
import bathroomIcon from "../../assets/icons/home/bathroom-icon.svg";
import parkingIcon from "../../assets/icons/home/parking-icon.svg";
import { PropertyCard } from "../../components/home/LatestOffer";
import "../../styles/pages/home/PropertyDetail.css";
import PropertyDetailForm from "../../components/home/propertyDetail/PropertyDetailForm";
import defaultPropertyImage from "../../assets/images/home/property-image.svg";

const PropertyDetailPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const { property, properties } = location.state || {};
  const [selectedImage, setSelectedImage] = useState(0);
  const [propertyImages, setPropertyImages] = useState([]);

   // Initialize and validate property images
   useEffect(() => {
    if (property) {
      // If property has images array, use it; otherwise, create array with single image
      const images = property.images?.length > 0 
        ? property.images 
        : [property.image || defaultPropertyImage];
      
      setPropertyImages(images);
    }
  }, [property]);

  // Redirect if no property data
  if (!property) {
    return <Navigate to="/" replace />;
  }

  // Use actual property images or fallback to default
  const carouselImages = property.images?.length > 0 
    ? property.images 
    : [defaultPropertyImage];

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  // Previous image handler
  const handlePrevImage = () => {
    setSelectedImage((prev) => 
      prev === 0 ? propertyImages.length - 1 : prev - 1
    );
  };

  // Next image handler
  const handleNextImage = () => {
    setSelectedImage((prev) => 
      prev === propertyImages.length - 1 ? 0 : prev + 1
    );
  };

  // Dynamic property details using actual property data
  const propertyDetails = [
    { label: "Address", value: property.location },
    { label: "City", value: property.city || "Not specified" },
    { label: "State/county", value: property.state || "Not specified" },
    { label: "Property Type", value: property.propertyType || "Not specified" },
    { label: "Property ID", value: property.id },
    { label: "Area", value: property.area || "Not specified" },
    { label: "Country", value: property.country || "Not specified" },
    { label: "Property Size", value: property.size || "Not specified" },
    { label: "Furnished", value: property.furnished ? "Yes" : "No" },
  ];

  // Filter out current property from featured properties
  const featuredProperties = properties
    ?.filter(p => p.id !== property.id)
    .slice(0, 4) || [];

  // Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="property-detail-page">
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-left">
            <div className="hero-header">
              <h1>{property.title}</h1>
              <span className="property-tag">
                {property.forRent ? "For Rent" : "For Sale"}
              </span>
            </div>
            <div className="hero-image-container">
              {/* Main hero image */}
              <img
                src={propertyImages[selectedImage]}
                alt={`${property.title} - View ${selectedImage + 1}`}
                className="hero-image"
              />

                {/* Navigation arrows for hero image */}
                {propertyImages.length > 1 && (
                <>
                  <button 
                    onClick={handlePrevImage} 
                    className="image-nav-button prev"
                    aria-label="Previous image"
                  >
                    ‹
                  </button>
                  <button 
                    onClick={handleNextImage} 
                    className="image-nav-button next"
                    aria-label="Next image"
                  >
                    ›
                  </button>
                </>
              )}          

             {/* Image counter */}
             <div className="image-counter">
                {selectedImage + 1} / {propertyImages.length}
              </div>    

              {/* Thumbnail carousel */}
              {propertyImages.length > 1 && (
                <div className="image-carousel">
                  {propertyImages.map((image, index) => (
                    <div
                      key={index}
                      className={`carousel-thumbnail-wrapper ${
                        selectedImage === index ? "active" : ""
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${property.title} - Thumbnail ${index + 1}`}
                        className="carousel-thumbnail"
                        onClick={() => handleImageClick(index)}
                      />
                    </div>
                  ))}
                </div>
              )}          

              {/* <img
                src={carouselImages[selectedImage]}
                alt={property.title}
                className="hero-image"
              /> */}
              {/* <div className="image-carousel">
                {carouselImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Property ${index + 1}`}
                    className={`carousel-thumbnail ${
                      selectedImage === index ? "active" : ""
                    }`}
                    onClick={() => handleImageClick(index)}
                  />
                ))}
              </div> */}
            </div>

            <div className="property-info">
              <div className="info-column">
                <span>Status:</span>
                <strong>{property.forRent ? "For Rent" : "For Sale"}</strong>
              </div>
              <div className="info-column">
                <span>Price:</span>
                <strong>${property.price.toLocaleString()}</strong>
              </div>
              {property.originalPrice > property.price && (
                <div className="info-column">
                  <span>Original Price:</span>
                  <strong>${property.originalPrice.toLocaleString()}</strong>
                </div>
              )}
            </div>
          </div>
          <div className="hero-right">
            <PropertyDetailForm
              propertyType={property.forRent ? "rent" : "sale"}
              propertyId={property.id}
              propertyTitle={property.title}
            />
          </div>
        </div>
      </section>

      <section className="overview-section">
        <h2 className="section-header">Overview</h2>
        <div className="overview-content">
          <div className="overview-item">
            <span>Property Type</span>
            <strong>{property.propertyType || property.title}</strong>
          </div>
          <div className="overview-item">
            <div className="feature">
              <span>Bedrooms</span>
              <div className="feature-item">
                <img src={bedroomIcon} className="bedrooms" alt="Bedrooms" />
                <span>{property.bedrooms}</span>
              </div>
            </div>
          </div>
          <div className="overview-item">
            <div className="feature">
              <span>Bathrooms</span>
              <div className="feature-item">
                <img src={bathroomIcon} className="bathrooms" alt="Bathrooms" />
                <span>{property.bathrooms}</span>
              </div>
            </div>
          </div>
          <div className="overview-item">
            <div className="feature">
              <span>Parking</span>
              <div className="feature-item">
                <img src={parkingIcon} className="parking" alt="Parking" />
                <span>{property.parking ? property.parking : "No"}</span>
              </div>
            </div>
          </div>
          <div className="overview-item">
            <span>Furnished</span>
            <strong>{property.furnished ? "Yes" : "No"}</strong>
          </div>
        </div>
      </section>

      <section className="property-details-section">
        <h2 className="section-header">Property Details</h2>
        <div className="property-details-content">
          {propertyDetails.map((detail, index) => (
            <div key={index} className="property-detail-item">
              <span className="detail-label">{detail.label}:</span>
              <span className="detail-value">{detail.value}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="property-description-section">
        <h2 className="section-header">Property Description</h2>
        <p className="property-description">
          {property.description || "No description available"}
        </p>
      </section>

      {featuredProperties.length > 0 && (
        <section className="featured-section">
          <h2 className="featured-section-header">Featured this week...</h2>
          <p>See some of our featured listings for this week</p>
          <Slider {...settings}>
            {featuredProperties.map((prop) => (
              <div key={prop.id} className="carousel-item">
                <PropertyCard {...prop} />
              </div>
            ))}
          </Slider>
        </section>
      )}
    </div>
  );
};

export default PropertyDetailPage;













// import React, { useState } from "react";
// import { useLocation, useParams } from "react-router-dom";
// import Slider from "react-slick"; 

// import bedroomIcon from "../../assets/icons/home/bedroom-icon.svg";
// import bathroomIcon from "../../assets/icons/home/bathroom-icon.svg";
// import parkingIcon from "../../assets/icons/home/parking-icon.svg";
// import arrowIcon from "../../assets/icons/home/arrow-icon.svg";
// import { PropertyCard } from "../../components/home/LatestOffer";
// import "../../styles/pages/home/PropertyDetail.css";
// import PropertyDetailForm from "../../components/home/propertyDetail/PropertyDetailForm";

// const PropertyDetailPage = () => {
//   const { id } = useParams();
//   const location = useLocation();
//   const { property } = location.state || {};

//   const [selectedImage, setSelectedImage] = useState(0);

//   const carouselImages = [
//     require("../../assets/images/home/property-image-3.svg").default,
//     require("../../assets/images/home/property-image-2.svg").default,
//     require("../../assets/images/home/property-image-3.svg").default,
//     require("../../assets/images/home/property-image-4.svg").default,
//   ];

//   const handleImageClick = (index) => {
//     setSelectedImage(index);
//   };

//   const propertyDetails = [
//     { label: "Address", value: "123 knollwood cove, 78731" },
//     { label: "City", value: "Austin" },
//     { label: "State/county", value: "Texas" },
//     { label: "Property Type", value: "Shared House" },
//     { label: "Property ID", value: "MT1651674" },
//     { label: "Zip/Postal Code", value: "78731" },
//     { label: "Area", value: "Knollwood" },
//     { label: "Country", value: "United States" },
//     { label: "Property Size", value: "1950 m²" },
//   ];

//   const featuredProperties = [
//     {
//       id: 1,
//       image: require("../../assets/images/home/property-image.svg").default,
//       forRent: true,
//       price: 400000,
//       originalPrice: 500000,
//       title: "Modern Detached Duplex",
//       location: "New Hampshire, UK",
//       bedrooms: 3,
//       bathrooms: 4,
//       parking: 2,
//     },
//     {
//       id: 2,
//       image: require("../../assets/images/home/property-image.svg").default,
//       forRent: false,
//       price: 350000,
//       originalPrice: 400000,
//       title: "Cozy Suburban Home",
//       location: "Manchester, UK",
//       bedrooms: 4,
//       bathrooms: 3,
//       parking: 1,
//     },
//     {
//       id: 3,
//       image: require("../../assets/images/home/property-image.svg").default,
//       forRent: true,
//       price: 2500,
//       originalPrice: 3000,
//       title: "Luxury City Apartment",
//       location: "London, UK",
//       bedrooms: 2,
//       bathrooms: 2,
//       parking: null,
//     },
//     {
//       id: 4,
//       image: require("../../assets/images/home/property-image.svg").default,
//       forRent: false,
//       price: 550000,
//       originalPrice: 600000,
//       title: "Spacious Family House",
//       location: "Birmingham, UK",
//       bedrooms: 5,
//       bathrooms: 4,
//       parking: 2,
//     },
//     {
//       id: 5,
//       image: require("../../assets/images/home/property-image.svg").default,
//       forRent: true,
//       price: 1800,
//       originalPrice: 2200,
//       title: "Modern Studio Flat",
//       location: "Edinburgh, UK",
//       bedrooms: 1,
//       bathrooms: 1,
//       parking: null,
//     },
//   ];

//   if (!property) {
//     return <div>Property not found</div>;
//   }

//   // Carousel settings for Featured Properties with auto-scroll and center card overlay
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     autoplay: true,  // Enable auto-scroll
//     autoplaySpeed: 3000, // Auto-scroll every 3 seconds
//     slidesToShow: 3,  // Show 3 slides at a time
//     slidesToScroll: 1,
//     centerMode: true,  // Enable center mode to overlap side cards
//     centerPadding: '0',  // Ensure no padding, cards will overlap
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 2,  // Show 2 cards on medium-sized screens
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 1,  // Show 1 card on small screens
//         },
//       },
//     ],
//   };

//   return (
//     <div className="property-detail-page">
//       <section className="hero-section">
//         <div className="hero-content">
//           <div className="hero-left">
//             <div className="hero-header">
//               <h1>{property.title}</h1>
//               <span className="property-tag">
//                 {property.forRent ? "For Rent" : "For Sale"}
//               </span>
//             </div>
//             <div className="hero-image-container">
//               <img
//                 src={carouselImages[selectedImage]}
//                 alt={property.title}
//                 className="hero-image"
//               />
//               <div className="image-carousel">
//                 {carouselImages.map((image, index) => (
//                   <img
//                     key={index}
//                     src={image}
//                     alt={`Property ${index + 1}`}
//                     className={`carousel-thumbnail ${
//                       selectedImage === index ? "active" : ""
//                     }`}
//                     onClick={() => handleImageClick(index)}
//                   />
//                 ))}
//               </div>
//             </div>
//             <div className="property-info">
//               <div className="info-column">
//                 <span>Status:</span>
//                 <strong>{property.forRent ? "For Rent" : "For Sale"}</strong>
//               </div>
//               <div className="info-column">
//                 <span>Price:</span>
//                 <strong>${property.price.toLocaleString()}</strong>
//               </div>
//               <div className="info-column">
//                 <span>Discount Price (coupon):</span>
//                 <strong>${property.originalPrice.toLocaleString()}</strong>
//               </div>
//             </div>
//           </div>
//           <div className="hero-right">
//             <PropertyDetailForm
//               propertyType={property.forRent ? "rent" : "sale"}
//             />
//           </div>
//         </div>
//       </section>

//       {/* Overview Section */}
//       <section className="overview-section">
//         <h2 className="section-header">Overview</h2>
//         <div className="overview-content">
//           <div className="overview-item">
//             <span>Property Type</span>
//             <strong>{property.title}</strong>
//           </div>
//           <div className="overview-item">
//             <div className="feature">
//               <span>Bedrooms</span>
//               <div className="feature-item">
//                 <img src={bedroomIcon} className="bedrooms" alt="Bedrooms" />
//                 <span>{property.bedrooms}</span>
//               </div>
//             </div>
//           </div>
//           <div className="overview-item">
//             <div className="feature">
//               <span>Bathrooms</span>
//               <div className="feature-item">
//                 <img src={bathroomIcon} className="bathrooms" alt="Bathrooms" />
//                 <span>{property.bathrooms}</span>
//               </div>
//             </div>
//           </div>
//           <div className="overview-item">
//             <div className="feature">
//               <span>Parking</span>
//               <div className="feature-item">
//                 <img src={parkingIcon} className="parking" alt="Parking" />
//                 <span>{property.parking ? property.parking : "No"}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Property Details Section */}
//       <section className="property-details-section">
//         <h2 className="section-header">Property Details</h2>
//         <div className="property-details-content">
//           {propertyDetails.map((detail, index) => (
//             <div key={index} className="property-detail-item">
//               <span className="detail-label">{detail.label}:</span>
//               <span className="detail-value">{detail.value}</span>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Property Description Section */}
//       <section className="property-description-section">
//         <h2 className="section-header">Property Description</h2>
//         <p className="property-description">
//           This stunning shared house offers a perfect blend of modern comfort
//           and convenient living. Located in the desirable Knollwood area of
//           Austin, Texas, this spacious property boasts 1950 m² of living space.
//           With its prime location, ample amenities, and stylish design, this
//           home is ideal for those seeking a vibrant shared living experience in
//           one of Austin's most sought-after neighborhoods.
//         </p>
//       </section>

//       {/* Featured Properties Section */}
//       <section className="featured-section">
//         <h2 className="featured-section-header">Featured this week...</h2>
//         <p>See some of our featured listings for this week</p>
//         <Slider {...settings}>
//           {featuredProperties.map((prop) => (
//             <div key={prop.id} className="carousel-item">
//               <PropertyCard {...prop} />
//             </div>
//           ))}
//         </Slider>

//       </section>
//     </div>
//   );
// };

// export default PropertyDetailPage;