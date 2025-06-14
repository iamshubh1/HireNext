import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const PostJob = () => {
  const [input, setInput] = useState({
    title: '',
    description: '',
    requirements: '',
    salary: '',
    location: '',
    jobType: '',
    experience: '',
    position: 0,
    companyId: '',
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/admin/jobs');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="flex items-center justify-center px-4 py-10">
        <form
          onSubmit={submitHandler}
          className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md w-full max-w-4xl"
        >
          <h2 className="text-2xl font-bold mb-8 text-center text-gray-800 dark:text-white">
            🚀 Post a New Job
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: 'Title', name: 'title' },
              { label: 'Description', name: 'description' },
              { label: 'Requirements', name: 'requirements' },
              { label: 'Salary', name: 'salary' },
              { label: 'Location', name: 'location' },
              { label: 'Job Type', name: 'jobType' },
              { label: 'Experience Level', name: 'experience' },
              { label: 'No of Positions', name: 'position', type: 'number' },
            ].map(({ label, name, type = 'text' }) => (
              <div key={name}>
                <Label className="text-gray-700 dark:text-gray-300 mb-1 block">
                  {label}
                </Label>
                <Input
                  type={type}
                  name={name}
                  value={input[name]}
                  onChange={changeEventHandler}
                  className="w-full focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}

            {companies.length > 0 && (
              <div className="md:col-span-2">
                <Label className="text-gray-700 dark:text-gray-300 mb-1 block">
                  Select Company
                </Label>
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className="w-full focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Select a Company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem
                          key={company._id}
                          value={company.name.toLowerCase()}
                        >
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {companies.length === 0 && (
            <p className="text-sm text-center text-red-600 font-medium mt-6">
              ⚠️ Please register a company before posting a job.
            </p>
          )}

          <div className="mt-8">
            <Button
              type="submit"
              className="w-full py-3 text-white bg-blue-600 hover:bg-blue-700 transition rounded-md"
              disabled={loading || companies.length === 0}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Posting...
                </>
              ) : (
                'Post New Job'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
