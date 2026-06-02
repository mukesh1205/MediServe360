import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function MyProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:9002/user/myProfile", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        toast.error(err.response?.data || err.message);
      });
  }, []);

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="card p-4 shadow-sm mt-3">

      <h4 className="mb-3">👤 My Profile</h4>

      <p><strong>Name:</strong> {user.userName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phoneNumber}</p>
      <p><strong>Role:</strong> {user.role}</p>

    </div>
  );
}