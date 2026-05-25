import axios from "axios";
import { useState } from "react";

export default function AddKPIReport() {

  const [scope, setScope] = useState("");
  const [metrics, setMetrics] = useState("");
  const [date, setDate] = useState("");
  const [complianceId, setComplianceId] = useState("");

  const saveHandler = () => {
    const url = "http://localhost:9002/api/addKPIReport";

    const data = {
      kpiReport: {
        kpiReportScope: scope,
        kpiMetrics: metrics,
        kpiGeneratedDate: date,
        complianceReport: {
          reportId: complianceId   
        }
      }
    };

    axios.post(url, data)
      .then((res) => {
        alert("KPI Report Saved ");
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
        alert("Error saving KPI ");
      });
  };

  return (
    <div>
      <h2>Add KPI Report</h2>

      <label>Scope</label>
      <input onChange={(e) => setScope(e.target.value)} />
      <br /><br />

      <label>Metrics</label>
      <input onChange={(e) => setMetrics(e.target.value)} />
      <br /><br />

      <label>Date</label>
      <input type="date" onChange={(e) => setDate(e.target.value)} />
      <br /><br />

      <label>Compliance Report ID</label>
      <input onChange={(e) => setComplianceId(e.target.value)} />
      <br /><br />

      <button onClick={saveHandler}>SAVE</button>
    </div>
  );
}