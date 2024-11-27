import React, { useState, useEffect } from "react";
import axios from "axios";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        setReports(response.data.products); // Assuming the response has `products` data
      } catch (err) {
        console.error("Error fetching reports:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <div>
      <h2>Reports</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {reports.map((report) => (
            <li key={report.id}>
              <p>
                {report.name} - {report.price}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Reports;
