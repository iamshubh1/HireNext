import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {
  const navigate = useNavigate()

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime)
    const currentTime = new Date()
    const timeDifference = currentTime - createdAt
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24))
  }

  return (
    <div className="p-6 rounded-2xl shadow-lg bg-white dark:bg-[#1f1f2f] border border-gray-100 dark:border-gray-700 transition hover:shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-semibold text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? '📅 Posted Today'
            : `📅 ${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button variant="outline" className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800" size="icon">
          <Bookmark className="text-gray-600 dark:text-gray-300" />
        </Button>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <Avatar className="h-12 w-12 border border-gray-200 dark:border-gray-700 shadow-sm">
          <AvatarImage src={job?.company?.logo} alt="logo" />
        </Avatar>
        <div>
          <h1 className="text-md font-semibold text-gray-900 dark:text-white">{job?.company?.name}</h1>
          <p className="text-xs text-gray-500">{job?.location}</p>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-1">{job?.title}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{job?.description}</p>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <Badge className="text-blue-700 font-semibold border border-blue-200" variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className="text-red-600 font-semibold border border-red-200" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-purple-700 font-semibold border border-purple-300" variant="ghost">
          ₹ {job?.salary} LPA
        </Badge>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-6">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="w-full sm:w-auto"
        >
          View Details
        </Button>
        <Button
          className="w-full sm:w-auto bg-gradient-to-r from-[#2648F0] to-[#2648F0] hover:from-[#5e0ca3] hover:to-[#3f0b8a] text-white font-semibold transition-all"
        >
          Save for Later
        </Button>
      </div>
    </div>
  )
}

export default Job
