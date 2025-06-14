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
import { Avatar, AvatarImage } from '../ui/avatar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../ui/popover';
import { Edit2, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector((store) => store.company);
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = companies?.filter((company) =>
      !searchCompanyByText
        ? true
        : company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
    );
    setFilterCompany(filtered);
  }, [companies, searchCompanyByText]);

  return (
    <div className="mt-10 overflow-x-auto">
      <Table className="min-w-full bg-white dark:bg-gray-800 rounded-md shadow">
        <TableCaption className="text-gray-500 dark:text-gray-400">
          A list of your recently registered companies
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100 dark:bg-gray-700">
            <TableHead className="text-gray-700 dark:text-gray-300">Logo</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Name</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Date</TableHead>
            <TableHead className="text-right text-gray-700 dark:text-gray-300">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany?.map((company) => (
            <TableRow
              key={company._id}
              className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              <TableCell>
                <Avatar>
                  <AvatarImage src={company.logo} />
                </Avatar>
              </TableCell>
              <TableCell className="text-gray-800 dark:text-gray-200">{company.name}</TableCell>
              <TableCell className="text-gray-700 dark:text-gray-300">
                {company.createdAt?.split('T')[0]}
              </TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger className="hover:text-blue-600 transition">
                    <MoreHorizontal className="w-5 h-5" />
                  </PopoverTrigger>
                  <PopoverContent className="w-36 bg-white dark:bg-gray-800 shadow-lg rounded-md p-2">
                    <div
                      onClick={() => navigate(`/admin/companies/${company._id}`)}
                      className="flex items-center gap-2 text-gray-800 dark:text-gray-200 hover:text-blue-600 cursor-pointer px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    >
                      <Edit2 className="w-4 h-4" />
                      <span>Edit</span>
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

export default CompaniesTable;
