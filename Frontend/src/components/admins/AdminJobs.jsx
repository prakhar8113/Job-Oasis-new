import { useEffect, useState } from "react";
import Navbar from "../shared/NavBar.jsx";
import { Input } from "../ui/input.jsx";
import { Button } from "../ui/button.jsx";

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable.jsx";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs.jsx";
import { setSearchJobByText } from "@/redux/jobSlice.js";

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-fit"
            placeholder="Filter by name or role"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={() => navigate("/admin/jobs/create")}>
            New Jobs
          </Button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
  );
};

export default AdminJobs;
