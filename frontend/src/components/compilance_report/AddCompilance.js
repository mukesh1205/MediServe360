import axios from "axios";
import { useState } from "react";

export default function AddComplianceReport() {

  const [scope, setScope] = useState("");
  const [metrics, setMetrics] = useState("");
  const [date, setDate] = useState("");

  const saveHandler = () => {

    const url = "http://localhost:9002/api/addComplianceReport";

    const data = {
      complianceReport: {
        reportScope: scope,
        reportMetrics: metrics,
        reportGeneratedDate: date
      }
    };

    axios.post(url, data)
      .then((res) => {
        alert("Compliance Report Saved ");
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
        alert("Error saving report ");
      });
  };

  return (
    <div>
      <h2>Add Compliance Report</h2>

      <label>Scope</label>
      <input onChange={(e) => setScope(e.target.value)} />
      <br /><br />

      <label>Metrics</label>
      <input onChange={(e) => setMetrics(e.target.value)} />
      <br /><br />

      <label>Date</label>
      <input type="date" onChange={(e) => setDate(e.target.value)} />
      <br /><br />

      <button onClick={saveHandler}>SAVE</button>
    </div>
  );
}
