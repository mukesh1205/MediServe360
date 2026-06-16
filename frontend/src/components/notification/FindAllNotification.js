import { useState, useEffect } from "react";
import axios from "axios";
import TopNavbar from "../common/TopNavbar";

const BASE = "http://localhost:9002";

const CATEGORY_STYLES = {
  CANCELLATION: { bg: "#fee2e2", text: "#991b1b", dot: "#ef4444", icon: "bi-x-circle-fill"      },
  RESCHEDULE:   { bg: "#e0e7ff", text: "#3730a3", dot: "#6366f1", icon: "bi-arrow-repeat"        },
  APPOINTMENT:  { bg: "#dbeafe", text: "#1e40af", dot: "#3b82f6", icon: "bi-calendar-check-fill" },
  DEFAULT:      { bg: "#f3f4f6", text: "#374151", dot: "#9ca3af", icon: "bi-bell-fill"           },
};

function getStyle(category) {
  return CATEGORY_STYLES[(category || "").toUpperCase()] || CATEGORY_STYLES.DEFAULT;
}

export default function FindAllNotification() {
  const [notifications, setNotifications] = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [filter,        setFilter]        = useState("ALL");

  const token   = localStorage.getItem("token");
  const userId  = parseInt(localStorage.getItem("userId") || "0");
  const headers = { Authorization: "Bearer " + token };

  //Fetch notifications for logged-in user
  useEffect(() => {
    if (!userId) { setLoading(false); return; }
    axios.get(`${BASE}/notification/user/${userId}`, { headers })
      .then((res) => setNotifications(res.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Mark single notification as read
  function markAsRead(id) {
    axios.put(`${BASE}/notification/markread/${id}`, {}, { headers })
      .then(() => setNotifications((prev) =>
        prev.map((n) => n.notificationID === id ? { ...n, status: "READ" } : n)
      ))
      .catch(console.error);
  }

  //Mark all as read
  function markAllAsRead() {
    const unread = notifications.filter((n) => n.status === "UNREAD");
    Promise.all(unread.map((n) =>
      axios.put(`${BASE}/notification/markread/${n.notificationID}`, {}, { headers })
    )).then(() =>
      setNotifications((prev) => prev.map((n) => ({ ...n, status: "READ" })))
    ).catch(console.error);
  }

  // Delete notification
  function deleteNotification(id) {
    axios.delete(`${BASE}/notification/deletenotification/${id}`, { headers })
      .then(() => setNotifications((prev) =>
        prev.filter((n) => n.notificationID !== id)
      ))
      .catch(console.error);
  }

  const filtered    = notifications.filter((n) => {
    if (filter === "UNREAD") return n.status === "UNREAD";
    if (filter === "READ")   return n.status === "READ";
    return true;
  });
  const unreadCount = notifications.filter((n) => n.status === "UNREAD").length;

  if (loading) return (
    <div className="min-vh-100 bg-body-tertiary">
      <TopNavbar />
      <div className="d-flex align-items-center justify-content-center" style={{ height: "60vh" }}>
        <div className="spinner-border text-primary" />
      </div>
    </div>
  );

  return (
    <div className="min-vh-100 bg-body-tertiary">
      <TopNavbar />
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "28px 20px" }}>

        {/* Header */}
        <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
          <div>
            <h5 className="fw-bold mb-0">
              <i className="bi bi-bell me-2 text-primary"></i>
              Notifications
              {unreadCount > 0 && (
                <span className="badge bg-danger ms-2" style={{ fontSize: 12 }}>
                  {unreadCount} new
                </span>
              )}
            </h5>
            <small className="text-muted">{notifications.length} total</small>
          </div>
          {unreadCount > 0 && (
            <button className="btn btn-sm btn-outline-primary" onClick={markAllAsRead}>
              <i className="bi bi-check2-all me-1"></i>Mark all read
            </button>
          )}
        </div>

        {/* Filter tabs */}
        <div className="d-flex gap-1 mb-4 border-bottom pb-2">
          {["ALL", "UNREAD", "READ"].map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`btn btn-sm ${filter === f ? "btn-primary" : "btn-outline-secondary"}`}
              style={{ borderRadius: 20, fontSize: 12 }}>
              {f}
              {f === "UNREAD" && unreadCount > 0 && (
                <span className="ms-1 badge bg-danger" style={{ fontSize: 10 }}>{unreadCount}</span>
              )}
            </button>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 ? (
          <div className="text-center text-muted py-5">
            <i className="bi bi-bell-slash fs-2 d-block mb-2"></i>
            {filter === "UNREAD" ? "No unread notifications" : "No notifications found"}
          </div>
        ) : (
          <div className="d-flex flex-column gap-3">
            {filtered.map((n) => {
              const s        = getStyle(n.category);
              const isUnread = n.status === "UNREAD";
              return (
                <div key={n.notificationID} className="card border-0 shadow-sm"
                  style={{ borderRadius: 12, borderLeft: `4px solid ${s.dot}`, opacity: isUnread ? 1 : 0.75 }}>
                  <div className="card-body py-3 px-4">
                    <div className="d-flex align-items-start justify-content-between gap-3">

                      {/* Icon */}
                      <div className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                        style={{ width: 38, height: 38, background: s.bg }}>
                        <i className={`bi ${s.icon}`} style={{ color: s.dot, fontSize: 16 }}></i>
                      </div>

                      {/* Content */}
                      <div style={{ flex: 1 }}>
                        <div className="d-flex align-items-center gap-2 mb-1 flex-wrap">
                          <span className="badge" style={{ background: s.bg, color: s.text, fontSize: 10 }}>
                            {n.category}
                          </span>
                          {isUnread && (
                            <span className="badge bg-danger" style={{ fontSize: 10 }}>NEW</span>
                          )}
                        </div>
                        <p className="mb-1 fw-medium" style={{ fontSize: 13, lineHeight: 1.5 }}>
                          {n.message}
                        </p>
                        <small className="text-muted">
                          <i className="bi bi-clock me-1"></i>
                          {n.createdDate ? new Date(n.createdDate).toLocaleString() : "—"}
                        </small>
                      </div>

                      {/* Actions */}
                      <div className="d-flex flex-column gap-1 flex-shrink-0">
                        {isUnread && (
                          <button onClick={() => markAsRead(n.notificationID)}
                            className="btn btn-sm btn-outline-primary" style={{ fontSize: 11 }}>
                            <i className="bi bi-check2 me-1"></i>Mark read
                          </button>
                        )}
                        <button onClick={() => deleteNotification(n.notificationID)}
                          className="btn btn-sm btn-outline-danger" style={{ fontSize: 11 }}>
                          <i className="bi bi-trash me-1"></i>Delete
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}



