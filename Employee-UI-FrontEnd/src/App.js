import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import './App.css';

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [displayedEmployees, setDisplayedEmployees] = useState([]); // Employees to display on current page
  const [pageCount, setPageCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10; // Number of employees to display per page

  axios.defaults.baseURL = 'http://localhost:8080';

  // Fetch employee data
  const fetchEmployees = async (page = 0, search = "") => {
    console.log("Fetching employees for page:", page, "Search term:", search);
    try {
      setLoading(true); // Start loading
      const response = await axios.get(`/employees?page=${page}&size=${pageSize}&search=${search}`);
      console.log("Full Response:", response); // Log the full response
      console.log("Response Data:", response.data); // Log response data

      if (Array.isArray(response.data)) {
        setEmployees(response.data); // Set employees directly from response data
        setPageCount(Math.ceil(response.data.length / pageSize)); // Calculate total pages based on response length
        setDisplayedEmployees(response.data.slice(page * pageSize, (page + 1) * pageSize)); // Slice the data for current page
      } else {
        setEmployees([]); // Reset employees if content is not in expected format
        setPageCount(0);
        setDisplayedEmployees([]); // Reset displayed employees on error
      }

      setCurrentPage(page); // Set current page
    } catch (error) {
      console.error("There was an error!", error);
      setEmployees([]); // Reset employees data on error
      setPageCount(0);
      setDisplayedEmployees([]); // Reset displayed employees on error
    } finally {
      setLoading(false); // End loading
    }
  };

  // Search handler
  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search term:", searchTerm); // Log search term to debug
    fetchEmployees(0, searchTerm); // Fetch employees with search term
  };

  // Pagination handler
  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    fetchEmployees(selectedPage, searchTerm); // Fetch employees for the selected page
  };

  // Load employees when component mounts or search term changes
  useEffect(() => {
    fetchEmployees(); // Default load when the component mounts
  }, []); // Empty dependency array ensures it runs only on mount

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Employee Data</h1>
      
      {/* Search Input aligned to the right */}
      <form onSubmit={handleSearch} style={{ textAlign: "right", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px",
            width: "300px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 15px",
            marginLeft: "10px",
            fontSize: "16px",
            border: "none",
            backgroundColor: "#4CAF50",
            color: "white",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </form>

      {/* Loading or Employee Table */}
      {loading ? (
        <div style={{ textAlign: "center" }}>Loading...</div>
      ) : displayedEmployees.length === 0 ? (
        <div style={{ textAlign: "center" }}>No employees found.</div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginBottom: "20px",
              textAlign: "left",
            }}
          >
            <thead>
              <tr>
                <th style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>ID</th>
                <th style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>Name</th>
                <th style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>Email</th>
                <th style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>Salary</th>
                <th style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {displayedEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{employee.id}</td>
                  <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{employee.name}</td>
                  <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{employee.email}</td>
                  <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{employee.salary}</td>
                  <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{employee.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <ReactPaginate
          previousLabel={<button className="previous-button">Previous</button>}
          nextLabel={<button className="next-button">Next</button>}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          activeClassName="active"
          previousClassName="previous-button"
          nextClassName="next-button"
          breakLabel="..."
        />
      </div>
    </div>
  );
};

const buttonStyle = {
  padding: "8px 16px",
  fontSize: "16px",
  border: "1px solid #ddd",
  backgroundColor: "#f4f4f4",
  borderRadius: "4px",
  cursor: "pointer",
  margin: "0 5px",
};

export default App;
