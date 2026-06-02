import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AddDoctor() {

  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [availabilitySchedule, setAvailabilitySchedule] = useState("");
  const [loading, setLoading] = useState(false);

  const buttonHandler = () => {
    if (loading) return;

    if (!name || !department || !availabilitySchedule) {
      toast.warning("Please fill all fields");
      return;
    }

    setLoading(true);

    const url = "http://localhost:9002/api/doctor/add";

    const data = {
      doctor: {
        name: name.trim(),
        department: department.trim(),
        availabilitySchedule: availabilitySchedule.trim()
      }
    };

    axios.post(url, data, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
    .then(() => {
      toast.success("Doctor added successfully");

      setName("");
      setDepartment("");
      setAvailabilitySchedule("");

      setLoading(false);
    })
    .catch((error) => {
      toast.error(error.response?.data?.message || "Error adding doctor");
      setLoading(false);
    });
  };

  return (
    <div className="container mt-4">

      <h3 className="mb-4">Add Doctor</h3>

      <form onSubmit={(e) => {
        e.preventDefault();
        buttonHandler();
      }}>

        {/* Name */}
        <div className="mb-3">
          <label className="form-label">
            Doctor Name <span className="text-danger">*</span>
          </label>
          <input
            className="form-control"
            type="text"
            value={name}
            placeholder="Enter doctor name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Department */}
        <div className="mb-3">
          <label className="form-label">
            Department <span className="text-danger">*</span>
          </label>
          <input
            className="form-control"
            type="text"
            value={department}
            placeholder="Enter department"
            onChange={(e) => setDepartment(e.target.value)}
            required
          />
        </div>

        {/* Availability */}
        <div className="mb-3">
          <label className="form-label">
            Availability (HH:mm-HH:mm) <span className="text-danger">*</span>
          </label>
          <input
            className="form-control"
            type="text"
            placeholder="08:00-20:00"
            value={availabilitySchedule}
            onChange={(e) => setAvailabilitySchedule(e.target.value)}
            pattern="^([01]\d|2[0-3]):[0-5]\d-([01]\d|2[0-3]):[0-5]\d$"
            title="Enter time range like 08:00-20:00"
            required
          />
        </div>

        {/* Submit */}
        <button
          className="btn btn-primary w-100"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>
              Submitting...
            </>
          ) : (
            "Add Doctor"
          )}
        </button>

      </form>
    </div>
  );
}
