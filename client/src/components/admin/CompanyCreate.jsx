import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState('');
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="max-w-xl mx-auto mt-16 px-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            🏢 Your Company Name
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            What would you like to name your company? You can always change this later.
          </p>
        </div>

        <div className="mb-6">
          <Label className="text-gray-700 dark:text-gray-300 block mb-1">
            Company Name
          </Label>
          <Input
            type="text"
            value={companyName}
            className="w-full focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. JobHunt, Microsoft"
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="px-6 py-2"
            onClick={() => navigate('/admin/companies')}
          >
            Cancel
          </Button>
          <Button
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white transition rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={registerNewCompany}
            disabled={!companyName.trim()}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
