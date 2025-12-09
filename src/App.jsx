import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from "./components/Navbar";
import { useJobContext } from "./context/JobContextProvider";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
function App() {
  const {
    jobsDataLoading,
    jobsError,
    jobList,
    filteredJobList,
    makeTrigger,
    updateFilter,
  } = useJobContext();
  const deleteJob = (id) => {
    axios
      .delete(`https://intern-house-beta.vercel.app/api/jobs/delete/${id}`)
      .then((response) => {
        console.log("Data deleted successfully");
        toast.success("Data deleted successfully");
        makeTrigger();
      })
      .catch(() => {
        console.log("Error while deleting Data");
        toast.error("Error while deleting data");
      });
  };
  const onChangeHandler = (e) => {
    updateFilter(e.target.value);
  };
  return (
    <div>
      <Navbar />

      <div className="container p-3">
        <input
          type="text"
          placeholder="Search By Title here"
          onChange={onChangeHandler}
          className="form-control my-3"
        />
        <h2>All Jobs</h2>

        {jobsDataLoading && <p>Data is loading.........</p>}
        {jobsError && <p>Error while loading data</p>}
        {filteredJobList.length > 0 && (
          <div>
            <div className="row mt-3">
              {filteredJobList.map((j) => {
                const { jobTitle, companyName, location, jobType, _id } = j;
                return (
                  <div className="col-md-4 mb-3" key={`${j._id}`}>
                    <div className="card p-3">
                      <div className="card-body">
                        <h3>{jobTitle}</h3>
                        <p>
                          <strong>Company Name</strong> :{companyName}
                        </p>
                        <p>
                          <strong>Location</strong> :{location}
                        </p>
                        <p>
                          <strong>Job Type</strong> :{jobType}
                        </p>
                        <div className="row">
                          <div className="col-md-6 mb-2">
                            <Link
                              className="btn btn-primary w-100"
                              to={`/jobDetails/${_id}`}
                            >
                              Details
                            </Link>
                          </div>
                          <div className="col-md-6">
                            <button
                              onClick={() => deleteJob(_id)}
                              className="btn btn-danger w-100"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
