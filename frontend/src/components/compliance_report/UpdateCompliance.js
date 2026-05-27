import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateComplianceReport() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [scope, setScope] = useState("");
  const [metrics, setMetrics] = useState("");
  const [date, setDate] = useState("");

  // ✅ Fetch existing record
  useEffect(() => {

    const fetchReport = async () => {
      try {
        const url = "http://localhost:9002/api/compliance-reports/fetchAllComplianceReports";

        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        const report = res.data.find(r => r.reportId == id);

        if (report) {
          setScope(report.reportScope);
          setMetrics(report.reportMetrics);
          setDate(report.reportGeneratedDate);
        } else {
          alert("❌ Report not found");
          navigate("/compliance-reports/display");
        }

      } catch (err) {
        console.error(err);
        alert(err.response?.data || err.message);
      }
    };

    fetchReport();

  }, [id, navigate]);

  // ✅ Update record
  const updateButtonHandler = async () => {
    try {
      const url = "http://localhost:9002/api/compliance-reports/updateComplianceReport";

      const data = {
        complianceReport: {
          reportId: id,
          reportScope: scope,
          reportMetrics: metrics,
          reportGeneratedDate: date
        }
      };

      await axios.put(url, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      alert("✅ Compliance Report updated successfully");
      navigate("/compliance_report/display");

    } catch (err) {
      console.error(err);
      alert(err.response?.data || err.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Update Compliance Report {id}</h2>

      <div className="mb-3">
        <label className="form-label">Report ID</label>
        <input className="form-control" value={id} readOnly />
      </div>

      <div className="mb-3">
        <label className="form-label">Scope</label>
        <input
          className="form-control"
          value={scope}
          onChange={(e) => setScope(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Metrics</label>
        <input
          className="form-control"
          value={metrics}
          onChange={(e) => setMetrics(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Date</label>
        <input
          type="date"
          className="form-control"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <button className="btn btn-warning" onClick={updateButtonHandler}>
        Update
      </button>
    </div>
  );
}