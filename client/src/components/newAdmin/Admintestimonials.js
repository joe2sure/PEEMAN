import React, { useState, useEffect, useCallback } from 'react';
import testimonialApi from '../../../api/testimonialApi';
import '../../../styles/components/newAdmin/AdminTestimonials.css';

// ─── Stars (small display) ────────────────────────────────────────────────────
const Stars = ({ rating }) => (
  <span className="admt-stars">
    {[1, 2, 3, 4, 5].map((n) => (
      <span key={n} style={{ color: n <= rating ? '#DA7B14' : '#d1d5db' }}>★</span>
    ))}
  </span>
);

// ─── Status badge ─────────────────────────────────────────────────────────────
const Badge = ({ status }) => (
  <span className={`admt-badge admt-badge--${status}`}>
    {status.charAt(0).toUpperCase() + status.slice(1)}
  </span>
);

// ─── Reject modal ─────────────────────────────────────────────────────────────
const RejectModal = ({ testimonial, onConfirm, onCancel }) => {
  const [note, setNote] = useState('');
  return (
    <div className="admt-modal-overlay" onClick={onCancel}>
      <div className="admt-modal" onClick={(e) => e.stopPropagation()}>
        <h3 className="admt-modal-title">Reject Testimonial</h3>
        <p className="admt-modal-sub">
          Optionally provide a reason (not shown to user, for internal records):
        </p>
        <textarea
          className="admt-modal-textarea"
          placeholder="Internal note (optional)…"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
        />
        <div className="admt-modal-actions">
          <button className="admt-btn admt-btn--ghost" onClick={onCancel}>
            Cancel
          </button>
          <button
            className="admt-btn admt-btn--danger"
            onClick={() => onConfirm(note)}
          >
            Confirm Rejection
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────
export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(''); // '' | 'pending' | 'approved' | 'rejected'
  const [toast, setToast] = useState(null); // { type, text }
  const [rejectTarget, setRejectTarget] = useState(null); // testimonial object
  const [actionLoading, setActionLoading] = useState(null); // id of item being mutated

  const showToast = (type, text) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const res = await testimonialApi.getAll(filter);
      if (res.success) setTestimonials(res.testimonials);
      else showToast('error', res.message || 'Failed to load testimonials.');
    } catch (err) {
      showToast('error', err.message || 'Network error.');
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const handleApprove = async (id) => {
    setActionLoading(id);
    try {
      const res = await testimonialApi.approve(id);
      if (res.success) {
        setTestimonials((prev) =>
          prev.map((t) => (t._id === id ? { ...t, status: 'approved' } : t))
        );
        showToast('success', 'Testimonial approved and now live on the site.');
      } else {
        showToast('error', res.message);
      }
    } catch (err) {
      showToast('error', err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (id, adminNote) => {
    setRejectTarget(null);
    setActionLoading(id);
    try {
      const res = await testimonialApi.reject(id, adminNote);
      if (res.success) {
        setTestimonials((prev) =>
          prev.map((t) =>
            t._id === id ? { ...t, status: 'rejected', adminNote } : t
          )
        );
        showToast('success', 'Testimonial rejected.');
      } else {
        showToast('error', res.message);
      }
    } catch (err) {
      showToast('error', err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Permanently delete this testimonial? This cannot be undone.')) return;
    setActionLoading(id);
    try {
      const res = await testimonialApi.remove(id);
      if (res.success) {
        setTestimonials((prev) => prev.filter((t) => t._id !== id));
        showToast('success', 'Testimonial deleted.');
      } else {
        showToast('error', res.message);
      }
    } catch (err) {
      showToast('error', err.message);
    } finally {
      setActionLoading(null);
    }
  };

  // ── Derived counts for tab badges ────────────────────────────────────────
  const counts = testimonials.reduce(
    (acc, t) => ({ ...acc, [t.status]: (acc[t.status] || 0) + 1 }),
    {}
  );

  const FILTERS = [
    { label: 'All', value: '' },
    { label: 'Pending', value: 'pending' },
    { label: 'Approved', value: 'approved' },
    { label: 'Rejected', value: 'rejected' },
  ];

  return (
    <div className="admt-root">
      {/* Toast */}
      {toast && (
        <div className={`admt-toast admt-toast--${toast.type}`}>{toast.text}</div>
      )}

      {/* Reject modal */}
      {rejectTarget && (
        <RejectModal
          testimonial={rejectTarget}
          onConfirm={(note) => handleReject(rejectTarget._id, note)}
          onCancel={() => setRejectTarget(null)}
        />
      )}

      {/* Page header */}
      <div className="admt-page-header">
        <div>
          <h1 className="admt-page-title">Testimonial Management</h1>
          <p className="admt-page-sub">
            Review, approve, or reject client testimonials before they appear on the home page.
          </p>
        </div>
        <button className="admt-btn admt-btn--primary" onClick={fetchAll}>
          ↻ Refresh
        </button>
      </div>

      {/* Filter tabs */}
      <div className="admt-tabs">
        {FILTERS.map(({ label, value }) => (
          <button
            key={value}
            className={`admt-tab ${filter === value ? 'admt-tab--active' : ''}`}
            onClick={() => setFilter(value)}
          >
            {label}
            {value === 'pending' && counts.pending > 0 && (
              <span className="admt-tab-badge">{counts.pending}</span>
            )}
          </button>
        ))}
      </div>

      {/* Table */}
      {loading ? (
        <div className="admt-loading">
          <span className="admt-spinner" />
          Loading testimonials…
        </div>
      ) : testimonials.length === 0 ? (
        <div className="admt-empty">
          No testimonials found
          {filter ? ` with status "${filter}"` : ''}.
        </div>
      ) : (
        <div className="admt-table-wrap">
          <table className="admt-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Review</th>
                <th>Rating</th>
                <th>Status</th>
                <th>Submitted</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map((t) => {
                const isLoading = actionLoading === t._id;
                const name = t.user?.username || 'Deleted User';
                const email = t.user?.email || '';
                const date = new Date(t.createdAt).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                });

                return (
                  <tr key={t._id} className={isLoading ? 'admt-row--loading' : ''}>
                    {/* User */}
                    <td>
                      <div className="admt-user-cell">
                        <div className="admt-avatar">
                          {t.user?.avatar ? (
                            <img src={t.user.avatar} alt={name} />
                          ) : (
                            <span>
                              {name.slice(0, 2).toUpperCase()}
                            </span>
                          )}
                        </div>
                        <div>
                          <div className="admt-user-name">{name}</div>
                          <div className="admt-user-email">{email}</div>
                        </div>
                      </div>
                    </td>

                    {/* Review text */}
                    <td>
                      <p className="admt-review-text">{t.text}</p>
                      {t.adminNote && (
                        <p className="admt-admin-note">Note: {t.adminNote}</p>
                      )}
                    </td>

                    {/* Rating */}
                    <td><Stars rating={t.rating} /></td>

                    {/* Status */}
                    <td><Badge status={t.status} /></td>

                    {/* Date */}
                    <td className="admt-date">{date}</td>

                    {/* Actions */}
                    <td>
                      <div className="admt-actions">
                        {t.status !== 'approved' && (
                          <button
                            className="admt-btn admt-btn--success admt-btn--sm"
                            onClick={() => handleApprove(t._id)}
                            disabled={isLoading}
                            title="Approve"
                          >
                            ✓ Approve
                          </button>
                        )}
                        {t.status !== 'rejected' && (
                          <button
                            className="admt-btn admt-btn--warning admt-btn--sm"
                            onClick={() => setRejectTarget(t)}
                            disabled={isLoading}
                            title="Reject"
                          >
                            ✕ Reject
                          </button>
                        )}
                        <button
                          className="admt-btn admt-btn--danger admt-btn--sm"
                          onClick={() => handleDelete(t._id)}
                          disabled={isLoading}
                          title="Delete"
                        >
                          🗑
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}