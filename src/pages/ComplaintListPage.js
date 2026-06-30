import React, { useState } from "react";
import ComplaintList from "../components/ComplaintList";

function ComplaintListPage() {
  const [editComplaint, setEditComplaint] = useState(null);

  return (
    <div className="container mt-4">
      <ComplaintList
        editComplaint={editComplaint}
        setEditComplaint={setEditComplaint}
      />
    </div>
  );
}

export default ComplaintListPage;