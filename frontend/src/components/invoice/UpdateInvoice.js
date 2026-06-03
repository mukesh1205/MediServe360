import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function UpdateInvoice() {

  const { iid } = useParams();
  const navigate = useNavigate();

  const [patientId, setPatientId] = useState("");
  const [amount, setAmount] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [adjustmentAmount, setAdjustmentAmount] = useState("");
  const [refundStatus, setRefundStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const url = "http://localhost:9002/api/invoice/getInvoiceById/" + iid;

    axios.get(url, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
    .then((res) => {
      const inv = res.data.invoice;
      setPatientId(inv.patient?.patientId || "");
      setAmount(inv.amount);
      setInvoiceDate(inv.invoiceDate);
      setPaymentStatus(inv.paymentStatus);
      setPaymentMode(inv.paymentMode);
      setAdjustmentAmount(inv.adjustmentAmount);
      setRefundStatus(inv.refundStatus);
    })
    .catch((err) => {
      toast.error(err.response?.data || err.message);
    });
  }, [iid]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (loading) return;

    if (
      !patientId ||
      !amount ||
      !invoiceDate ||
      !paymentStatus ||
      !paymentMode ||
      !refundStatus
    ) {
      toast.warning("Please fill all required fields");
      return;
    }

    if (amount <= 0) {
      toast.warning("Amount must be greater than 0");
      return;
    }

    if (adjustmentAmount < 0) {
      toast.warning("Adjustment amount cannot be negative");
      return;
    }

    setLoading(true);

    const url = "http://localhost:9002/api/invoice/updateInvoice";

    const data = {
      invoice: {
        invoiceId: iid,
        patient: {
          patientId: patientId
        },
        amount: Number(amount),
        invoiceDate,
        paymentStatus,
        paymentMode,
        adjustmentAmount: adjustmentAmount === "" ? 0 : Number(adjustmentAmount),
        refundStatus
      }
    };

    axios.put(url, data, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
    .then(() => {
      toast.success("Invoice updated successfully");
      navigate("/invoice/display");
    })
    .catch((err) => {
      toast.error(err.response?.data || err.message);
      setLoading(false);
    });
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Update Invoice</h3>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label className="form-label">
            Patient ID <span className="text-danger">*</span>
          </label>
          <input
            className="form-control"
            type="number"
            value={patientId}
            onChange={(e) =>
              setPatientId(e.target.value === "" ? "" : Number(e.target.value))
            }
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Amount <span className="text-danger">*</span>
          </label>
          <input
            className="form-control"
            type="number"
            min="0"
            step="0.01"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value === "" ? "" : Number(e.target.value))
            }
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Invoice Date <span className="text-danger">*</span>
          </label>
          <input
            className="form-control"
            type="date"
            value={invoiceDate}
            onChange={(e) => setInvoiceDate(e.target.value)}
            max={new Date().toISOString().split("T")[0]}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Payment Status <span className="text-danger">*</span>
          </label>
          <select
            className="form-select"
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
            required
          >
            <option value="">--Select--</option>
            <option value="PAID">PAID</option>
            <option value="PENDING">PENDING</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">
            Payment Mode <span className="text-danger">*</span>
          </label>
          <select
            className="form-select"
            value={paymentMode}
            onChange={(e) => setPaymentMode(e.target.value)}
            required
          >
            <option value="">--Select--</option>
            <option value="CASH">CASH</option>
            <option value="CARD">CARD</option>
            <option value="UPI">UPI</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Adjustment Amount</label>
          <input
            className="form-control"
            type="number"
            min="0"
            step="0.01"
            value={adjustmentAmount}
            onChange={(e) =>
              setAdjustmentAmount(e.target.value === "" ? "" : Number(e.target.value))
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Refund Status <span className="text-danger">*</span>
          </label>
          <select
            className="form-select"
            value={refundStatus}
            onChange={(e) => setRefundStatus(e.target.value)}
            required
          >
            <option value="">--Select--</option>
            <option value="NONE">NONE</option>
            <option value="PENDING">PENDING</option>
            <option value="PROCESSED">PROCESSED</option>
          </select>
        </div>

        <button
          className="btn btn-warning w-100"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>
              Updating...
            </>
          ) : (
            "Update Invoice"
          )}
        </button>

      </form>
    </div>
  );
}