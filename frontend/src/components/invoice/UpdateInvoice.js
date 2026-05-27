import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateInvoice() {

  const { iid } = useParams();   
  const navigate = useNavigate();

  const [patientId, setPatientId] = useState(0);
  const [amount, setAmount] = useState(0);
  const [invoiceDate, setInvoiceDate] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [adjustmentAmount, setAdjustmentAmount] = useState(0);
  const [refundStatus, setRefundStatus] = useState("");

  
  const updateButtonHandler = () => {

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
      .then((res) => {
        alert("Invoice updated successfully");
        navigate("/invoice/display");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {

    const url = "http://localhost:9002/api/getInvoiceById/" + iid;

    axios.get(url)
      .then((res) => {

        let inv = res.data.invoice;

        setPatientId(inv.patient?.patientId || 0);
        setAmount(inv.amount);
        setInvoiceDate(inv.invoiceDate);
        setPaymentStatus(inv.paymentStatus);
        setPaymentMode(inv.paymentMode);
        setAdjustmentAmount(inv.adjustmentAmount);
        setRefundStatus(inv.refundStatus);
      })
      .catch((err) => {
        alert(err.message);
      });

  }, [iid]);

  return (
    <div>
      <h3>Update Invoice</h3>

      <label>Patient ID</label>
      <input
        type="number"
        value={patientId}
        onChange={(e) => setPatientId(Number(e.target.value))}
      />
      <br />

      <label>Amount</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <br />

      <label>Invoice Date</label>
      <input
        type="date"
        value={invoiceDate}
        onChange={(e) => setInvoiceDate(e.target.value)}
      />
      <br />

      <label>Payment Status</label>
      <select
        value={paymentStatus}
        onChange={(e) => setPaymentStatus(e.target.value)}
      >
        <option value="">--Select--</option>
        <option value="PAID">PAID</option>
        <option value="PENDING">PENDING</option>
      </select>
      <br />

      <label>Payment Mode</label>
      <select
        value={paymentMode}
        onChange={(e) => setPaymentMode(e.target.value)}
      >
        <option value="">--Select--</option>
        <option value="CASH">CASH</option>
        <option value="CARD">CARD</option>
        <option value="UPI">UPI</option>
      </select>
      <br />

      <label>Adjustment Amount</label>
      <input
        type="number"
        value={adjustmentAmount}
        onChange={(e) => setAdjustmentAmount(e.target.value)}
      />
      <br />

      <label>Refund Status</label>
      <select
        value={refundStatus}
        onChange={(e) => setRefundStatus(e.target.value)}
      >
        <option value="">--Select--</option>
        <option value="NONE">NONE</option>
        <option value="PENDING">PENDING</option>
        <option value="PROCESSED">PROCESSED</option>
      </select>
      <br />

      <button onClick={updateButtonHandler}>Update Invoice</button>
    </div>
  );
}