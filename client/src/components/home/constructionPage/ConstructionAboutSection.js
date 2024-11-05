import React from "react";
import "../../../styles/components/home/constructionPage/ConstructionAboutSection.css";

const ConstructionAboutSection = () => {
  const stats = [
    { number: "560+", label: "Projects Done" },
    { number: "180+", label: "Projects Done" },
    { number: "180+", label: "Technicians" },
  ];

  const images = [
    require("../../../assets/images/home/construction/images/construction-image-8.png"),
    require("../../../assets/images/home/construction/images/construction-image-10.jpg"),
    require("../../../assets/images/home/construction/images/construction-banner-image-1.png"),
  ];

  const features = [
    {
      title: "Earliest Consultation",
      description:
        "Our team provides prompt consultations to help kickstart your project quickly. We assess your requirements and offer expert guidance to bring your vision to life while ensuring the project aligns with your timeline and budget.",
      icon: "👷‍♂️",
    },
    {
      title: "Customized Solution",
      description:
        "Every project is unique, and so are our solutions. We develop tailored construction plans based on your specific needs, site conditions, and design preferences. From blueprint to final build, we adapt to meet your exact requirements.",
      icon: "📄",
    },
    {
      title: "Affordable Pricing",
      description:
        "Quality construction doesn’t have to break the bank. We offer competitive pricing and transparent estimates to help you manage costs effectively without sacrificing quality or safety standards. No hidden fees or surprises—just fair pricing.",
      icon: "💳",
    },
    {
      title: "All-In-One Service",
      description:
        "We handle every aspect of your project, from design and permits to construction and final inspection. Our all-in-one approach ensures seamless coordination and accountability, so you can focus on your vision while we manage the details.",
      icon: "📝",
    },
  ];

  return (
    <section className="construction-about-section">
      <div className="construction-header">
        <span className="construction-subtitle">24/7 HASSLE-FREE</span>
        <h1>Home And Businesses Installation Services</h1>
        <p className="construction-description">
          Our team combines industry expertise with a commitment to quality,
          ensuring every project is delivered to the highest standards. From
          initial consultation to final inspection, we focus on precision,
          efficiency, and customer satisfaction to bring your vision to life.
        </p>
      </div>

      <div className="construction-content">
        <div className="construction-stats-section">
          <div className="construction-images-container">
            <img
              src={images[0]}
              alt="Worker installing light"
              className="construction-main-image"
            />
            <div className="construction-secondary-images">
              <img
                src={images[1]}
                alt="Installation work"
                className="construction-secondary-image"
              />
              <img
                src={images[2]}
                alt="Technician at work"
                className="construction-secondary-image"
              />
            </div>
          </div>

          <div className="construction-stats-card">
            {stats.map((stat, index) => (
              <div key={index} className="construction-stat-item">
                <h3>{stat.number}</h3>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="construction-features-section">
          {features.map((feature, index) => (
            <div key={index} className="construction-feature-item">
              <span className="construction-feature-icon">{feature.icon}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="construction-contact-section">
          <button className="construction-read-more">Read More</button>
          <div className="construction-phone-number">
            <span className="construction-phone-icon">📞</span>
            <div>
              <h3>074 821 87549</h3>
              <p>Call For Booking</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConstructionAboutSection;
