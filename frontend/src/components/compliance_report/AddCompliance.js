import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AddCompliance() {

    const [scope, setScope] = useState("");
    const [metrics, setMetrics] = useState("");
    const [date, setDate] = useState("");

    
    const scopeHandler = (e) => {
        const value = e.target.value;

        
        if (/^[A-Za-z ]*$/.test(value)) {
            setScope(value);
        }
    };

    const metricsHandler = (e) => {
        setMetrics(e.target.value);
    };

    const dateHandler = (e) => {
        setDate(e.target.value);
    };

    const buttonHandler = () => {

        let url = "http://localhost:9002/api/compliance-reports/addComplianceReport";

        
        if (!scope.trim() || !metrics.trim() || !date) {
            toast.warning("Please fill all required fields");
            return;
        }

    
        const scopeRegex = /^[A-Za-z ]+$/;
        if (!scopeRegex.test(scope)) {
            toast.warning("Scope should contain only letters");
            return;
        }

        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate > today) {
            toast.warning("Report date cannot be in the future");
            return;
        }

        let data = {
            complianceReport: {
                reportScope: scope,
                reportMetrics: metrics,
                reportGeneratedDate: date
            }
        };

        axios.post(url, data, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then(() => {
            toast.success("Compliance Report Added Successfully");

            
            setScope("");
            setMetrics("");
            setDate("");
        })
        .catch((error) => {
            toast.error(error.response?.data?.message || error.message);
        });
    };

    return (
        <div className="container mt-4">

            <h3 className="mb-4">Add Compliance Report</h3>

            {/* Scope */}
            <div className="mb-3">
                <label className="form-label">
                    Scope <span style={{ color: "red" }}>*</span>
                </label>
                <input
                    className="form-control"
                    type="text"
                    value={scope}
                    placeholder="Enter scope"
                    onChange={scopeHandler}
                />
            </div>

            {/* Metrics */}
            <div className="mb-3">
                <label className="form-label">
                    Metrics <span style={{ color: "red" }}>*</span>
                </label>
                <input
                    className="form-control"
                    type="text"
                    value={metrics}
                    placeholder="Enter metrics"
                    onChange={metricsHandler}
                />
            </div>

            {/* Date */}
            <div className="mb-3">
                <label className="form-label">
                    Report Date <span style={{ color: "red" }}>*</span>
                </label>
                <input
                    type="date"
                    className="form-control"
                    value={date}
                    onChange={dateHandler}
                    max={new Date().toISOString().split("T")[0]}
                />
            </div>

            <button className="btn btn-primary w-100" onClick={buttonHandler}>
                Add Compliance Report
            </button>

        </div>
    );
}