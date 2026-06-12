import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function FindDoctor() {
  const [id, setId] = useState("");
  const [doctor, setDoctor] = useState(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const idHandler = (e) => {
    setId(e.target.value);
  };

  const buttonHandler = async () => {
    try {
      if (!id.trim()) {
        toast.warning("Please enter Doctor ID");
        return;
      }

      setLoading(true);
      setDoctor(null);
      setSearched(false);

      const url = `http://localhost:9002/api/doctor/get/${id.trim()}`;

      const res = await axios.get(url, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      setDoctor(res.data); 
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setDoctor(null);
      } else {
        toast.error(err.response?.data || err.message);
      }
    } finally {
      setSearched(true);
      setLoading(false);
    }
  };

  return (
    <div className="mt-3">

      {/*  Header + Search Bar */}
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        
        <h4 className="mb-0">🩺 Find Doctor</h4>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            buttonHandler();
          }}
          className="d-flex gap-2"
        >
          <input
            className="form-control"
            type="number"
            placeholder="Enter doctor ID"
            value={id}
            onChange={idHandler}
            style={{ width: "200px" }}
            required
          />

          <button
            className="btn btn-primary"
            type="submit"
            disabled={!id.trim() || loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-1"></span>
                Searching
              </>
            ) : (
              <>
                <i className="bi bi-search me-1"></i>
                Search
              </>
            )}
          </button>
        </form>
      </div>

      {/* No result message */}
      {searched && !doctor && id && (
        <p className="text-danger fw-semibold">
          No doctor found with this ID
        </p>
      )}

      {/* Result Table */}
      {doctor && (
        <div>

          <p className="mb-2 text-success">
            {/* Doctor found */}
          </p>

          <div className="table-responsive">
            <table className="table table-bordered table-hover table-striped">

              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Availability</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>{doctor.id}</td>
                  <td>{doctor.name}</td>
                  <td>{doctor.department}</td>
                  <td>{doctor.availabilitySchedule}</td>
                </tr>
              </tbody>

            </table>
          </div>
        </div>
      )}
    </div>
  );
}