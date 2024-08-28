import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table.jsx";
// import { Avatar, AvatarImage } from "../ui/avatar";
import nopersonImage from "../shared/noperson.jpg";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover.jsx";
import { Edit2, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "../ui/avatar.jsx";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);

  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("called");
    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) {
        return true;
      }
      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
      );
    });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);
  const deleteJob = async (jobId) => {
    try {
      const response = await axios.delete(`${JOB_API_END_POINT}/jobs/${jobId}`);

      if (response.data.success) {
        // Remove the job from the local state immediately
        setFilterJobs((prevJobs) =>
          prevJobs.filter((job) => job._id !== jobId)
        );
        toast.success("Job deleted successfully");
        // Optionally refresh the job list from the server
        // dispatch(fetchAdminJobs());
      } else {
        toast.error("Failed to delete job");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while deleting the job");
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs?.map((job) => (
            <tr key={job._id}>
              <TableCell>
                <Avatar>
                  <AvatarImage
                    src={
                      job.company.logo && job.company.logo !== ""
                        ? job.company.logo
                        : nopersonImage
                    }
                    alt="Company Logo"
                  />
                </Avatar>
              </TableCell>
              <TableCell>{job?.company?.name}</TableCell>
              <TableCell>{job?.title}</TableCell>
              <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div
                      onClick={() =>
                        navigate(`/admin/jobs/${job._id}/applicants`)
                      }
                      className="flex items-center w-fit gap-2 cursor-pointer mt-2"
                    >
                      <Eye className="w-4" />
                      <span>Applicants</span>
                    </div>
                    <div
                      onClick={() => deleteJob(job._id)}
                      className="flex items-center gap-2 w-fit cursor-pointer mt-2 text-red-600"
                    >
                      <Trash2 className="w-4" />
                      <span>Delete</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
