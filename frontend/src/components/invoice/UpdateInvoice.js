import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';
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

  const updateButtonHandler = () => {

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

    const url = "http://localhost:9002/api/updateInvoice";

    const data = {
      invoice: {
        invoiceId: iid,
        patient: {
          patientId: patientId
        },
        amount: Number(amount),
        invoiceDate: invoiceDate,
        paymentStatus: paymentStatus,
        paymentMode: paymentMode,
        adjustmentAmount: Number(adjustmentAmount),
        refundStatus: refundStatus
      }
    };

    axios.put(url, data)
      .then(() => {
        toast.success("Invoice updated successfully");
        navigate("/invoice/display");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
    const url = "http://localhost:9002/api/getInvoiceById/" + iid;

    axios.get(url)
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
        toast.error(err.message);
      });
  }, [iid]);

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Update Invoice</h3>

      <div className="mb-3">
        <label className="form-label">Patient ID</label>
        <input
          className="form-control"
          type="number"
          value={patientId}
          onChange={(e) =>
            setPatientId(e.target.value === "" ? "" : Number(e.target.value))
          }
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Amount</label>
        <input
          className="form-control"
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Invoice Date</label>
        <input
          className="form-control"
          type="date"
          value={invoiceDate}
          onChange={(e) => setInvoiceDate(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Payment Status</label>
        <select
          className="form-select"
          value={paymentStatus}
          onChange={(e) => setPaymentStatus(e.target.value)}
        >
          <option value="">--Select--</option>
          <option value="PAID">PAID</option>
          <option value="PENDING">PENDING</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Payment Mode</label>
        <select
          className="form-select"
          value={paymentMode}
          onChange={(e) => setPaymentMode(e.target.value)}
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
          step="0.01"
          value={adjustmentAmount}
          onChange={(e) => setAdjustmentAmount(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Refund Status</label>
        <select
          className="form-select"
          value={refundStatus}
          onChange={(e) => setRefundStatus(e.target.value)}
        >
          <option value="">--Select--</option>
          <option value="NONE">NONE</option>
          <option value="PENDING">PENDING</option>
          <option value="PROCESSED">PROCESSED</option>
        </select>
      </div>

      <button
        className="btn btn-warning w-100"
        onClick={updateButtonHandler}
      >
        Update Invoice
      </button>
    </div>
  );
}