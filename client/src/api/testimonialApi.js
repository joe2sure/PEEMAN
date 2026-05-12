import { apiRequest } from './apiUtils';

const BASE = 'testimonials';

const testimonialApi = {
  /** Home page: fetch all approved testimonials (public) */
  getApproved: () => apiRequest(`${BASE}/approved`, 'GET'),

  /** Logged-in user: submit a new testimonial */
  submit: (payload) => apiRequest(`${BASE}`, 'POST', payload),

  /** Logged-in user: get their own testimonial status */
  getMine: () => apiRequest(`${BASE}/my`, 'GET'),

  // ── Admin ──────────────────────────────────────────────────────────────────

  /** Admin: get all testimonials, optionally filtered by status */
  getAll: (status = '') =>
    apiRequest(`${BASE}${status ? `?status=${status}` : ''}`, 'GET'),

  /** Admin: approve a testimonial */
  approve: (id) => apiRequest(`${BASE}/${id}/approve`, 'PUT'),

  /** Admin: reject a testimonial with optional note */
  reject: (id, adminNote = '') =>
    apiRequest(`${BASE}/${id}/reject`, 'PUT', { adminNote }),

  /** Admin: permanently delete a testimonial */
  remove: (id) => apiRequest(`${BASE}/${id}`, 'DELETE'),
};

export default testimonialApi;