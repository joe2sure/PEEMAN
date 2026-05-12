import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import testimonialApi from '../../api/testimonialApi';
import '../../styles/components/home/Testimonial.css';

// ─── Star rating (display only) ───────────────────────────────────────────────
const Stars = ({ rating }) => (
  <div className="tst-stars" aria-label={`${rating} out of 5 stars`}>
    {[1, 2, 3, 4, 5].map((n) => (
      <span key={n} className={n <= rating ? 'star filled' : 'star'}>★</span>
    ))}
  </div>
);

// ─── Interactive star picker ──────────────────────────────────────────────────
const StarPicker = ({ value, onChange }) => {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="tst-star-picker">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          className={`star-btn ${n <= (hovered || value) ? 'lit' : ''}`}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(n)}
          aria-label={`Rate ${n} star${n > 1 ? 's' : ''}`}
        >
          ★
        </button>
      ))}
    </div>
  );
};

// ─── Avatar helper ────────────────────────────────────────────────────────────
const Avatar = ({ name, avatar }) => {
  if (avatar) return <img src={avatar} alt={name} className="tst-avatar" />;
  const initials = name
    ? name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
    : '?';
  return <div className="tst-avatar tst-avatar-initials">{initials}</div>;
};

// ─── Single testimonial card ──────────────────────────────────────────────────
const TestimonialCard = ({ testimonial, isActive }) => {
  const { user, rating, text, createdAt } = testimonial;
  const name = user?.username || 'Anonymous';
  const date = new Date(createdAt).toLocaleDateString('en-GB', {
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className={`tst-card ${isActive ? 'tst-card--active' : ''}`}>
      <div className="tst-card-body">
        <span className="tst-quote-mark">"</span>
        <p className="tst-card-text">{text}</p>
      </div>
      <div className="tst-card-footer">
        <Avatar name={name} avatar={user?.avatar} />
        <div className="tst-card-meta">
          <span className="tst-card-name">{name}</span>
          <Stars rating={rating} />
          <span className="tst-card-date">{date}</span>
        </div>
      </div>
    </div>
  );
};

// ─── Submit form ──────────────────────────────────────────────────────────────
const SubmitForm = ({ onSuccess }) => {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // { type: 'success'|'error', text }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating) return setMessage({ type: 'error', text: 'Please select a star rating.' });
    if (text.trim().length < 20)
      return setMessage({ type: 'error', text: 'Review must be at least 20 characters.' });

    setLoading(true);
    setMessage(null);
    try {
      const res = await testimonialApi.submit({ rating, text: text.trim() });
      if (res.success) {
        setMessage({ type: 'success', text: res.message });
        setRating(0);
        setText('');
        onSuccess && onSuccess();
      } else {
        setMessage({ type: 'error', text: res.message });
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Submission failed.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="tst-form" onSubmit={handleSubmit} noValidate>
      <h3 className="tst-form-title">Share Your Experience</h3>
      <StarPicker value={rating} onChange={setRating} />
      <textarea
        className="tst-form-textarea"
        placeholder="Tell us about your experience (minimum 20 characters)…"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        maxLength={600}
      />
      <div className="tst-form-footer">
        <span className="tst-char-count">{text.length}/600</span>
        <button type="submit" className="tst-form-submit" disabled={loading}>
          {loading ? 'Submitting…' : 'Submit Review'}
        </button>
      </div>
      {message && (
        <p className={`tst-form-msg tst-form-msg--${message.type}`}>{message.text}</p>
      )}
    </form>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────
export default function Testimonial() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [myTestimonial, setMyTestimonial] = useState(null);
  const [checkingMine, setCheckingMine] = useState(false);

  const timerRef = useRef(null);

  // ── Fetch approved testimonials ───────────────────────────────────────────
  const fetchTestimonials = useCallback(async () => {
    try {
      const res = await testimonialApi.getApproved();
      if (res.success) setTestimonials(res.testimonials);
    } catch (_) {
      /* silently fail — page still works */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  // ── Fetch the logged-in user's own testimonial (to show status) ───────────
  useEffect(() => {
    if (!isAuthenticated) return;
    setCheckingMine(true);
    testimonialApi
      .getMine()
      .then((res) => setMyTestimonial(res?.testimonial || null))
      .catch(() => {})
      .finally(() => setCheckingMine(false));
  }, [isAuthenticated]);

  // ── Auto-advance carousel ─────────────────────────────────────────────────
  const startTimer = useCallback(() => {
    timerRef.current = setInterval(() => {
      setActiveIndex((p) => (testimonials.length > 0 ? (p + 1) % testimonials.length : 0));
    }, 5500);
  }, [testimonials.length]);

  useEffect(() => {
    if (testimonials.length > 1) startTimer();
    return () => clearInterval(timerRef.current);
  }, [testimonials.length, startTimer]);

  const goTo = (idx) => {
    clearInterval(timerRef.current);
    setActiveIndex(idx);
    startTimer();
  };

  const prev = () => goTo((activeIndex - 1 + testimonials.length) % testimonials.length);
  const next = () => goTo((activeIndex + 1) % testimonials.length);

  // ── Derived state ─────────────────────────────────────────────────────────
  const canSubmit =
    isAuthenticated &&
    !checkingMine &&
    (!myTestimonial || myTestimonial.status === 'rejected');

  const myStatusLabel =
    myTestimonial?.status === 'pending'
      ? '⏳ Your review is awaiting admin approval.'
      : myTestimonial?.status === 'approved'
      ? '✅ Your review is live on the site.'
      : myTestimonial?.status === 'rejected'
      ? '❌ Your previous review was not approved. Feel free to submit a new one.'
      : null;

  return (
    <section className="tst-section">
      {/* ── Section header ─────────────────────────────────────────────────── */}
      <div className="tst-header">
        <span className="tst-eyebrow">Client Stories</span>
        <h2 className="tst-heading">What Our Clients Say</h2>
        <p className="tst-subheading">
          Real experiences from real people who found their perfect property with us.
        </p>
      </div>

      <div className="tst-body">
        {/* ── Carousel ───────────────────────────────────────────────────── */}
        <div className="tst-carousel-wrap">
          {loading ? (
            <div className="tst-loading">
              <span className="tst-spinner" />
              <span>Loading reviews…</span>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="tst-empty">
              <p>No reviews yet — be the first to share your experience!</p>
            </div>
          ) : (
            <>
              <div className="tst-carousel">
                {testimonials.map((t, i) => (
                  <TestimonialCard key={t._id || t.id} testimonial={t} isActive={i === activeIndex} />
                ))}
              </div>

              {/* Dots + arrows */}
              <div className="tst-controls">
                <button className="tst-arrow tst-arrow--prev" onClick={prev} aria-label="Previous">
                  ‹
                </button>
                <div className="tst-dots">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      className={`tst-dot ${i === activeIndex ? 'tst-dot--active' : ''}`}
                      onClick={() => goTo(i)}
                      aria-label={`Go to testimonial ${i + 1}`}
                    />
                  ))}
                </div>
                <button className="tst-arrow tst-arrow--next" onClick={next} aria-label="Next">
                  ›
                </button>
              </div>
            </>
          )}
        </div>

        {/* ── Right panel: CTA / form ─────────────────────────────────────── */}
        <div className="tst-side">
          <div className="tst-side-inner">
            <div className="tst-badge">
              <span className="tst-badge-stars">★★★★★</span>
              <span className="tst-badge-label">Trusted by hundreds of clients</span>
            </div>

            {!isAuthenticated && (
              <div className="tst-cta">
                <p>Worked with us? We'd love to hear from you.</p>
                <a href="/login" className="tst-cta-btn">
                  Sign in to leave a review
                </a>
              </div>
            )}

            {isAuthenticated && myStatusLabel && !showForm && (
              <div className={`tst-status tst-status--${myTestimonial?.status}`}>
                {myStatusLabel}
                {myTestimonial?.status === 'rejected' && (
                  <button className="tst-status-btn" onClick={() => setShowForm(true)}>
                    Write a new review
                  </button>
                )}
              </div>
            )}

            {isAuthenticated && canSubmit && !showForm && !myStatusLabel && (
              <button className="tst-write-btn" onClick={() => setShowForm(true)}>
                ✍ Write a Review
              </button>
            )}

            {showForm && (
              <SubmitForm
                onSuccess={() => {
                  setShowForm(false);
                  // Re-fetch user's testimonial to show pending status
                  testimonialApi.getMine().then((r) => setMyTestimonial(r?.testimonial || null));
                }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}




// import React, { useState, useEffect } from 'react';
// import '../../styles/components/home/Testimonial.css';
// import testimonialBg from '../../assets/images/home/testimonial-bg.svg';
// import testimonialFigure from '../../assets/images/home/testimonial-figure.svg';

// const testimonials = [
//   {
//     name: 'Sunday Okoro',
//     image: require('../../assets/images/home/sunday_okoro.svg').default,
//     text: 'Thanks to their expertise, we found our dream home in a competitive market. Their negotiation skills saved us thousands!',
//   },
//   {
//     name: 'Joe Onwe',
//     image: require('../../assets/images/home/my_pic.svg').default,
//     text: 'As first-time homebuyers, we appreciated their patient guidance through every step of the process. Truly outstanding service.',
//   },
//   {
//     name: 'Ugonna Anamekwe',
//     image: require('../../assets/images/home/testimonial_pic.svg').default,
//     text: 'They helped us sell our property above asking price in just two weeks. Their market knowledge is exceptional!',
//   },
//   {
//     name: 'Miera Oke',
//     image: require('../../assets/images/home/testimonial_pic3.svg').default,
//     text: 'Their property management services have made being a landlord completely stress-free. Highly recommended!',
//   },
//   {
//     name: 'Peace Onwe',
//     image: require('../../assets/images/home/testimonial_pic2.svg').default,
//     text: 'The virtual tours and digital documentation process made buying our vacation home from overseas seamless.',
//   }
// ];

// const contentMessages = [
//   {
//     heading: "Experience the difference of working with true real estate professionals",
//     text: "Our dedicated team of experts is committed to making your real estate journey smooth and successful. See what our satisfied clients have to say about their experiences."
//   },
//   {
//     heading: "Your dream home is just one consultation away",
//     text: "We combine local market expertise with personalized service to help you find the perfect property. Let our track record speak for itself."
//   },
//   {
//     heading: "Trust, integrity, and results in every transaction",
//     text: "From first-time buyers to seasoned investors, we provide unmatched service that consistently exceeds expectations."
//   },
//   {
//     heading: "Making real estate dreams come true...",
//     text: "Our proven track record of success and satisfied clients speaks volumes about our commitment to excellence in real estate."
//   },
//   {
//     heading: "Your property journey begins with the right partner",
//     text: "Whether buying, selling, or investing, our expertise ensures you achieve the best possible outcomes in any market condition."
//   }
// ];

// export default function Testimonial() {
//   const [currentTestimonial, setCurrentTestimonial] = useState(0);
//   const [isAutoScrolling, setIsAutoScrolling] = useState(true);

//   useEffect(() => {
//     let intervalId;
    
//     if (isAutoScrolling) {
//       intervalId = setInterval(() => {
//         setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
//       }, 5000); // Change testimonial every 5 seconds
//     }

//     return () => {
//       if (intervalId) {
//         clearInterval(intervalId);
//       }
//     };
//   }, [isAutoScrolling]);

//   const nextTestimonial = () => {
//     setIsAutoScrolling(false); // Pause auto-scroll when manually navigating
//     setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
//   };

//   const prevTestimonial = () => {
//     setIsAutoScrolling(false); // Pause auto-scroll when manually navigating
//     setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
//   };

//   return (
//     <section className="testimonial">
//       <div 
//         className="testimonial-container" 
//         style={{ backgroundImage: `url(${testimonialBg})`, width: '100%' }}
//         onMouseEnter={() => setIsAutoScrolling(false)}
//         onMouseLeave={() => setIsAutoScrolling(true)}
//       >
//         <div className="testimonial-left">
//           <div className="testimonial-image">
//             <img 
//               src={testimonials[currentTestimonial].image} 
//               alt={testimonials[currentTestimonial].name} 
//             />
//           </div>
//           <div 
//             className="testimonial-info" 
//             style={{ backgroundImage: `url(${testimonialFigure})` }}
//           >
//             <h3>{testimonials[currentTestimonial].name}</h3>
//             <p>{testimonials[currentTestimonial].text}</p>
//           </div>
//         </div>
//         <div className="testimonial-content">
//           <h2>{contentMessages[currentTestimonial].heading}</h2>
//           <p>{contentMessages[currentTestimonial].text}</p>
//           <div className="testimonial-navigation">
//             <button onClick={prevTestimonial} className="prev-btn">&larr;</button>
//             <button onClick={nextTestimonial} className="next-btn">&rarr;</button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }