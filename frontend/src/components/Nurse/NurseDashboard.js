// src/components/Nurse/NurseDashboard.jsx
import { useNavigate } from "react-router-dom";

export default function NurseDashboard() {
    const navigate = useNavigate();
    const userName = localStorage.getItem("userName");

    const modules = [
        {
            icon: "🛏️",
            title: "Bed Management",
            description: "Add beds, assign patients, discharge",
            color: "#0d6efd",
            mainPath: "/bed",           // clicking the card goes here
            actions: [
                { label: "Assign Bed", path: "/bed/assignBed" },
                { label: "Discharge", path: "/bed/dischargeBed" },
                { label: "All Beds", path: "/bed/findAll" },
            ]
        },
        {
            icon: "🏨",
            title: "Ward Management",
            description: "View wards and occupancy reports",
            color: "#6610f2",
            mainPath: "/ward",
            actions: [
                { label: "All Wards", path: "/ward/findAll" },
                { label: "Occupancy Report", path: "/ward/occupancy" },
            ]
        },
        {
            icon: "❤️",
            title: "Patient Vitals",
            description: "Record and view patient vitals",
            color: "#dc3545",
            mainPath: "/nursedd/vitals/view",
            actions: [
                { label: "Add Vitals", path: "/nursedd/vitals/add" },
                { label: "View Vitals", path: "/nursedd/vitals/view" },
            ]
        },
        {
            icon: "📝",
            title: "Care Notes",
            description: "Add and review patient care notes",
            color: "#198754",
            mainPath: "/nursedd/carenotes/view",
            actions: [
                { label: "Add Note", path: "/nursedd/carenotes/add" },
                { label: "View Notes", path: "/nursedd/carenotes/view" },
            ]
        },
    ];

    return (
        <div>
            {/* Welcome Banner */}
            <div
                className="rounded-3 p-4 mb-4 text-white"
                style={{ background: "linear-gradient(135deg, #0d6efd, #0a58ca)" }}
            >
                <h4 className="mb-1">👋 Welcome back, {userName}!</h4>
                <p className="mb-0" style={{ opacity: 0.85 }}>
                    Nurse Console — MediServe 360
                </p>
            </div>

            {/* Module Cards */}
            <div className="row g-4">
                {modules.map((mod) => (
                    <div className="col-md-6" key={mod.title}>
                        <div
                            className="card h-100 shadow-sm"
                            style={{
                                borderTop: `4px solid ${mod.color}`,
                                cursor: "pointer",
                                transition: "transform 0.15s, box-shadow 0.15s"
                            }}
                            onClick={() => navigate(mod.mainPath)}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = "translateY(-3px)";
                                e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.12)";
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = "";
                            }}
                        >
                            <div className="card-body">
                                <div className="d-flex align-items-center gap-2 mb-2">
                                    <span style={{ fontSize: "1.5rem" }}>{mod.icon}</span>
                                    <h6 className="mb-0 fw-bold">{mod.title}</h6>
                                    <span className="ms-auto text-muted" style={{ fontSize: "1rem" }}>→</span>
                                </div>
                                <p className="text-muted small mb-3">{mod.description}</p>

                                {/* Quick action buttons — stop propagation so they don't trigger card click */}
                                <div className="d-flex flex-wrap gap-2">
                                    {mod.actions.map((action) => (
                                        <button
                                            key={action.label}
                                            className="btn btn-sm"
                                            style={{
                                                borderColor: mod.color,
                                                color: mod.color
                                            }}
                                            onClick={(e) => {
                                                e.stopPropagation(); // ✅ prevent card click
                                                navigate(action.path);
                                            }}
                                        >
                                            {action.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}