import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function UpdateComplianceReport() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [scope, setScope] = useState("");
  const [metrics, setMetrics] = useState("");
  const [date, setDate] = useState("");

  // ✅ Fetch existing data
  useEffect(() => {
    axios.get(`http://localhost:9002/api/fetchAllComplianceReports`)
      .then((res) => {
        const report = res.data.complianceReport.find(r => r.reportId == id);
        if (report) {
          setScope(report.reportScope);
          setMetrics(report.reportMetrics);
          setDate(report.reportGeneratedDate);
        }
      })
      .catch(err => console.error(err));
  }, [id]);

  // ✅ Update API
  const updateHandler = () => {

    const data = {
      complianceReport: {
        reportId: id,
        reportScope: scope,
        reportMetrics: metrics,
        reportGeneratedDate: date
      }
    };

    axios.put("http://localhost:9002/api/updateComplianceReport", data)
      .then(() => {
        alert("Compliance Updated ✅");
        navigate("/compilance_report/display");
      })
      .catch(err => {
        console.error(err);
        alert("Update Failed ❌");
      });
  };

  return (
    <div>
      <h2>Update Compliance Report</h2>

      <label>ID</label>
      <input value={id} readOnly /><br /><br />

      <label>Scope</label>
      <input value={scope} onChange={(e) => setScope(e.target.value)} /><br /><br />

      <label>Metrics</label>
      <input value={metrics} onChange={(e) => setMetrics(e.target.value)} /><br /><br />

      <label>Date</label>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} /><br /><br />

      <button onClick={updateHandler}>Update</button>
    </div>
  );
}