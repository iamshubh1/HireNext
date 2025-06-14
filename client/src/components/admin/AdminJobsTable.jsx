import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, Eye, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) return true;
      const titleMatch = job?.title?.toLowerCase().includes(searchJobByText.toLowerCase());
      const companyMatch = job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
      return titleMatch || companyMatch;
    });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableCaption>A list of your recently posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-700 dark:text-gray-300">Company</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Role</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Posted On</TableHead>
            <TableHead className="text-right text-gray-700 dark:text-gray-300">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs?.map((job) => (
            <TableRow key={job._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
              <TableCell className="font-medium text-gray-900 dark:text-white">
                {job?.company?.name}
              </TableCell>
              <TableCell className="text-gray-700 dark:text-gray-300">{job?.title}</TableCell>
              <TableCell className="text-gray-700 dark:text-gray-300">
                {job?.createdAt?.split('T')[0]}
              </TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger className="outline-none">
                    <MoreHorizontal className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  </PopoverTrigger>
                  <PopoverContent className="w-36 p-2 rounded-md shadow-md bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-gray-100">
                    <div
                      onClick={() => navigate(`/admin/companies/${job._id}`)}
                      className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                    >
                      <Edit2 className="w-4 h-4" />
                      <span>Edit</span>
                    </div>
                    <div
                      onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                      className="flex items-center gap-2 p-2 mt-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Applicants</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
