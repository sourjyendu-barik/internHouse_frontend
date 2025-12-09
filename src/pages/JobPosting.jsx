import React from "react";
import Navbar from "../components/Navbar";
import { useJobContext } from "../context/JobContextProvider";
import { useNavigate } from "react-router-dom";
const JobPosting = () => {
  const { jobsDataLoading, jobsError, jobList } = useJobContext();
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div className="container p-3">
        {jobsDataLoading && <p>Data is loading.........</p>}
        {jobsError && <p>Error while loading data</p>}
        {jobList.length > 0 && (
          <div className="table-responsive mt-3">
            <table className="table table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Job Title</th>
                  <th>Salary</th>
                  <th>Qualification</th>
                </tr>{" "}
              </thead>

              {jobList.map((j) => {
                const {
                  jobTitle,
                  companyName,
                  location,
                  salary,
                  jobType,
                  description,
                  qualification,
                  _id,
                } = j;
                return (
                  <tr
                    key={`${_id}table`}
                    onClick={() => navigate(`/jobDetails/${_id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <td className="fw-semibold">{jobTitle}</td>
                    <td>{salary}</td>
                    <td className="align-middle">{qualification}</td>
                  </tr>
                );
              })}
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobPosting;
