import React from "react";
import useAxios from "../hooks/useAxios";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const JobDetails = () => {
  const { id } = useParams();
  const { loading, data, error } = useAxios(
    `https://intern-house-beta.vercel.app/api/jobs/data/${id}`
  );

  return (
    <div>
      <Navbar />
      <div className="container mt-3">
        {loading && <p>Job Details loading..........</p>}
        {error && <p>Error while loading job data.</p>}
        {data?.data && (
          <div>
            <h2>{data?.data?.jobTitle}</h2>
            <div className="card mt-3">
              <div className="card-body p-3">
                <p>
                  <strong>Company Name</strong> :{data?.data?.companyName}
                </p>
                <p>
                  <strong>Location</strong> :{data?.data?.location}
                </p>
                <p>
                  <strong>Salary</strong> :{data?.data?.salary}
                </p>
                <p>
                  <strong>Job type</strong> :{data?.data?.jobType}
                </p>

                <p>
                  <strong> Description</strong> :{data?.data?.description}
                </p>
                <p>
                  <strong> Qualification</strong> :
                  <ol>
                    {data?.data?.qualification.split(".").map((d) => (
                      <li>{d}</li>
                    ))}
                  </ol>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetails;
