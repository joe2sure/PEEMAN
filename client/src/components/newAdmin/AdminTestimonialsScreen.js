import React, { useState, useEffect, useCallback } from 'react';
import { Trash, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import testimonialApi from '../../api/testimonialApi';
import '../../styles/components/newAdmin/AdminTestimonialsScreen.css';

// ─── Small helpers ────────────────────────────────────────────────────────────

const Stars = ({ rating }) => (
  <span className="adts-stars">
    {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
  </span>
);

const StatusBadge = ({ status }) => (
  <span className={`adts-badge adts-badge--${status}`}>
    {status.charAt(0).toUpperCase() + status.slice(1)}
  </span>
);

// ─── Reject modal ─────────────────────────────────────────────────────────────

const RejectModal = ({ onConfirm, onCancel }) => {
  const [note, setNote] = useState('');
  return (
    <div className="adts-overlay" onClick={onCancel}>
      <div className="adts-modal" onClick={(e) => e.stopPropagation()}>
        <h3 className="adts-modal-title">Reject Testimonial</h3>
        <p className="adts-modal-sub">
          Add an optional internal note (not shown to the user):
        </p>
        <textarea
          className="adts-modal-textarea"
          placeholder="Internal reason (optional)…"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
        />
        <div className="adts-modal-actions">
          <button className="adts-btn adts-btn--ghost" onClick={onCancel}>
            Cancel
          </button>
          <button
            className="adts-btn adts-btn--danger"
            onClick={() => onConfirm(note)}
          >
            Confirm Rejection
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Toast ────────────────────────────────────────────────────────────────────

const useToast = () => {
  const [toast, setToast] = useState(null);
  const show = useCallback((type, text) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 3500);
  }, []);
  return { toast, show };
};

// ─── Main screen ──────────────────────────────────────────────────────────────

const AdminTestimonialsScreen = () => {
  const [testimonials, setTestimonials]   = useState([]);
  const [filter, setFilter]               = useState('');          // '' | 'pending' | 'approved' | 'rejected'
  const [loading, setLoading]             = useState(true);
  const [actionId, setActionId]           = useState(null);        // id currently being mutated
  const [rejectTarget, setRejectTarget]   = useState(null);        // testimonial pending rejection
  const { toast, show: showToast }        = useToast();

  // ── Fetch ───────────────────────────────────────────────────────────────────
  const fetchTestimonials = useCallback(async () => {
    setLoading(true);
    try {
      const res = await testimonialApi.getAll(filter);
      if (res.success) {
        setTestimonials(res.testimonials);
      } else {
        showToast('error', res.message || 'Failed to load testimonials.');
      }
    } catch (err) {
      showToast('error', err.message || 'Network error.');
    } finally {
      setLoading(false);
    }
  }, [filter, showToast]);

  useEffect(() => { fetchTestimonials(); }, [fetchTestimonials]);

  // ── Approve ─────────────────────────────────────────────────────────────────
  const handleApprove = async (id) => {
    setActionId(id);
    try {
      const res = await testimonialApi.approve(id);
      if (res.success) {
        setTestimonials((prev) =>
          prev.map((t) => (t._id === id ? { ...t, status: 'approved' } : t))
        );
        showToast('success', 'Testimonial approved — now live on the home page.');
      } else {
        showToast('error', res.message);
      }
    } catch (err) {
      showToast('error', err.message);
    } finally {
      setActionId(null);
    }
  };

  // ── Reject ──────────────────────────────────────────────────────────────────
  const handleReject = async (id, adminNote) => {
    setRejectTarget(null);
    setActionId(id);
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
      setActionId(null);
    }
  };

  // ── Delete ──────────────────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    if (!window.confirm('Permanently delete this testimonial? This cannot be undone.')) return;
    setActionId(id);
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
      setActionId(null);
    }
  };

  // ── Counts for filter tabs ───────────────────────────────────────────────────
  const counts = testimonials.reduce(
    (acc, t) => ({ ...acc, [t.status]: (acc[t.status] || 0) + 1 }),
    {}
  );

  const FILTERS = [
    { label: 'All',      value: '' },
    { label: 'Pending',  value: 'pending' },
    { label: 'Approved', value: 'approved' },
    { label: 'Rejected', value: 'rejected' },
  ];

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div className="admin-testimonials-screen">

      {/* Toast */}
      {toast && (
        <div className={`adts-toast adts-toast--${toast.type}`}>{toast.text}</div>
      )}

      {/* Reject modal */}
      {rejectTarget && (
        <RejectModal
          onConfirm={(note) => handleReject(rejectTarget._id, note)}
          onCancel={() => setRejectTarget(null)}
        />
      )}

      {/* Header — mirrors adminBlogScreen pattern */}
      <div className="admin-testimonials-header">
        <h2>Testimonial Management</h2>
        <button
          className="adts-refresh-btn"
          onClick={fetchTestimonials}
          disabled={loading}
          title="Refresh"
        >
          <RefreshCw size={15} />
          Refresh
        </button>
      </div>

      {/* Summary cards */}
      <div className="adts-summary-row">
        {[
          { label: 'Total',    count: testimonials.length,       color: '#DDE1FF' },
          { label: 'Pending',  count: counts.pending  || 0,      color: '#FFF3CD' },
          { label: 'Approved', count: counts.approved || 0,      color: '#D4EDDA' },
          { label: 'Rejected', count: counts.rejected || 0,      color: '#F8D7DA' },
        ].map(({ label, count, color }) => (
          <div key={label} className="adts-summary-card" style={{ backgroundColor: color }}>
            <span className="adts-summary-count">{count}</span>
            <span className="adts-summary-label">{label}</span>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="adts-filter-row">
        {FILTERS.map(({ label, value }) => (
          <button
            key={value}
            className={`adts-filter-btn ${filter === value ? 'adts-filter-btn--active' : ''}`}
            onClick={() => setFilter(value)}
          >
            {label}
            {value === 'pending' && counts.pending > 0 && (
              <span className="adts-filter-badge">{counts.pending}</span>
            )}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="admin-testimonials-table">
        {loading ? (
          <div className="adts-state-msg">Loading testimonials…</div>
        ) : testimonials.length === 0 ? (
          <div className="adts-state-msg">
            No testimonials found{filter ? ` with status "${filter}"` : ''}.
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Review</th>
                <th>Rating</th>
                <th>Status</th>
                <th>Submitted</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map((t) => {
                const busy   = actionId === t._id;
                const name   = t.user?.username || 'Deleted User';
                const email  = t.user?.email    || '—';
                const date   = new Date(t.createdAt).toLocaleDateString('en-GB', {
                  day: '2-digit', month: 'short', year: 'numeric',
                });

                return (
                  <tr key={t._id} className={busy ? 'adts-row--busy' : ''}>
                    {/* User */}
                    <td>
                      <div className="adts-user-cell">
                        <div className="adts-avatar">
                          {t.user?.avatar
                            ? <img src={t.user.avatar} alt={name} />
                            : <span>{name.slice(0, 2).toUpperCase()}</span>
                          }
                        </div>
                        <span className="adts-username">{name}</span>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="adts-email">{email}</td>

                    {/* Review */}
                    <td>
                      <p className="adts-review-text">{t.text}</p>
                      {t.adminNote && (
                        <p className="adts-admin-note">Note: {t.adminNote}</p>
                      )}
                    </td>

                    {/* Rating */}
                    <td><Stars rating={t.rating} /></td>

                    {/* Status */}
                    <td><StatusBadge status={t.status} /></td>

                    {/* Date */}
                    <td className="adts-date">{date}</td>

                    {/* Actions */}
                    <td>
                      <div className="adts-actions">
                        {t.status !== 'approved' && (
                          <button
                            className="adts-action-btn adts-action-btn--approve"
                            onClick={() => handleApprove(t._id)}
                            disabled={busy}
                            title="Approve"
                          >
                            <CheckCircle size={15} /> Approve
                          </button>
                        )}
                        {t.status !== 'rejected' && (
                          <button
                            className="adts-action-btn adts-action-btn--reject"
                            onClick={() => setRejectTarget(t)}
                            disabled={busy}
                            title="Reject"
                          >
                            <XCircle size={15} /> Reject
                          </button>
                        )}
                        <button
                          className="adts-action-btn adts-action-btn--delete"
                          onClick={() => handleDelete(t._id)}
                          disabled={busy}
                          title="Delete permanently"
                        >
                          <Trash size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminTestimonialsScreen;