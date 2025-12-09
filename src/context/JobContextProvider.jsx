import { createContext, useContext, useEffect, useMemo, useState } from "react";
import useAxios from "../hooks/useAxios";
const JobContext = createContext();
export const useJobContext = () => useContext(JobContext);
const JobContextProvider = ({ children }) => {
  const [trigger, setTrigger] = useState(false);
  const [jobList, setJobList] = useState([]);
  const [filter, setFilter] = useState({ jobTitle: "" });
  const updateFilter = (searchTerm) => setFilter({ jobTitle: searchTerm });

  const url = `https://intern-house-beta.vercel.app/api/jobs/allJobs?t=${trigger}`;

  const {
    loading: jobsDataLoading,
    data: jobsData,
    error: jobsError,
  } = useAxios(url);

  useEffect(() => {
    if (jobsData?.data?.length > 0) {
      setJobList(jobsData.data);
    }
  }, [jobsData]);

  const makeTrigger = () => {
    setTrigger(!trigger);
  };

  const filteredJobList = useMemo(() => {
    if (!filter.jobTitle) return jobList;

    return jobList.filter((j) =>
      j.jobTitle.toLowerCase().includes(filter.jobTitle.toLowerCase())
    );
  }, [jobList, filter.jobTitle]);
  const value = {
    jobsDataLoading,
    jobsError,
    jobList,
    makeTrigger,
    filteredJobList,
    updateFilter,
    filter,
  };
  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
};

export default JobContextProvider;
