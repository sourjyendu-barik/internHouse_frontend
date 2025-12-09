import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import Input from "../components/Input";
import { toast } from "react-toastify";
import { useJobContext } from "../context/JobContextProvider";

const AddNewJob = () => {
  const { makeTrigger } = useJobContext();
  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    location: "",
    salary: "",
    jobType: "",
    description: "",
    qualification: "",
  });
  const jobtypes = [
    "Full-time (On-site)",
    "Part-time (On-site)",
    "Full-time (Remote)",
    "Part-time (Remote)",
  ];
  const inputHandler = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://intern-house-beta.vercel.app/api/jobs/addNewJob", formData)
      .then((response) => {
        console.log("Data added successfully", response.data);
        setFormData((prev) => ({
          jobTitle: "",
          companyName: "",
          location: "",
          salary: "",
          jobType: "",
          description: "",
          qualification: "",
        }));
        toast.success("Data added successfully.");
        makeTrigger();
      })

      .catch((error) => {
        console.log("error while adding data", error.message);
        toast.error("Error while deleting data.");
      });
  };
  return (
    <div>
      <Navbar />
      <div className="container p-3">
        <h2>Post a job</h2>

        <form onSubmit={handleOnSubmit}>
          <Input
            placeholder="Job Title"
            name="jobTitle"
            type="text"
            value={formData.jobTitle}
            onChangeFunction={inputHandler}
          />

          <Input
            placeholder="Company name"
            name="companyName"
            type="text"
            value={formData.companyName}
            onChangeFunction={inputHandler}
          />

          <Input
            placeholder="Location"
            name="location"
            type="text"
            value={formData.location}
            onChangeFunction={inputHandler}
          />

          <Input
            placeholder="Salary"
            name="salary"
            type="number"
            value={formData.salary}
            onChangeFunction={inputHandler}
          />
          <div className="mb-2">
            <label htmlFor="jobType">Job Type</label>
            <select
              className="form-select"
              aria-label="Job Type"
              value={formData.jobType}
              onChange={inputHandler}
              id="jobType"
              name="jobType"
              required
            >
              <option>Select Job Type</option>
              {jobtypes.map((o) => {
                return (
                  <option key={`${o}-option`} value={o}>
                    {o}
                  </option>
                );
              })}
            </select>
          </div>

          <Input
            placeholder="Job Description"
            name="description"
            type="text"
            value={formData.description}
            onChangeFunction={inputHandler}
          />
          <Input
            placeholder="Qualification"
            name="qualification"
            type="text"
            value={formData.qualification}
            onChangeFunction={inputHandler}
          />
          <button className="btn btn-primary">Post Job</button>
        </form>
      </div>
    </div>
  );
};

export default AddNewJob;
