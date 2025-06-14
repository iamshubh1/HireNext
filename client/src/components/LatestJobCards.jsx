import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from './ui/badge';
import { Briefcase, MapPin, DollarSign } from 'lucide-react';

const LatestJobCard = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1f1f1f] hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer space-y-4"
    >
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 font-bold rounded-full flex items-center justify-center uppercase text-sm">
          {job?.company?.name?.charAt(0) || 'C'}
        </div>
        <div>
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
            {job?.company?.name}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <MapPin className="h-4 w-4" /> {job?.location || 'Remote'}
          </p>
        </div>
      </div>

      <div>
        <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100">
          {job?.title}
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
          {job?.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 text-sm">
        <Badge variant="outline" className="flex items-center gap-1 text-blue-700 border-blue-300 dark:text-blue-300 dark:border-blue-600">
          <Briefcase className="h-4 w-4" /> {job?.position} Positions
        </Badge>
        <Badge variant="outline" className="flex items-center gap-1 text-[#F83002] border-red-300 dark:border-red-600">
          {job?.jobType}
        </Badge>
        <Badge variant="outline" className="flex items-center gap-1 text-[#7209b7] border-purple-300 dark:border-purple-600">
          <DollarSign className="h-4 w-4" /> {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCard;
