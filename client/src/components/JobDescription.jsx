import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'
import { setSingleJob } from '@/redux/jobSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

const JobDescription = () => {
  const { singleJob } = useSelector(store => store.job)
  const { user } = useSelector(store => store.auth)
  const isInitiallyApplied = singleJob?.applications?.some(app => app.applicant === user?._id) || false
  const [isApplied, setIsApplied] = useState(isInitiallyApplied)

  const params = useParams()
  const jobId = params.id
  const dispatch = useDispatch()

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true })
      if (res.data.success) {
        setIsApplied(true)
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }]
        }
        dispatch(setSingleJob(updatedSingleJob))
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong.')
    }
  }

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true })
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job))
          setIsApplied(res.data.job.applications.some(app => app.applicant === user?._id))
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchSingleJob()
  }, [jobId, dispatch, user?._id])

  return (
    <section className="max-w-6xl mx-auto my-10 px-4">
      <div className="bg-white dark:bg-[#1f1f2f] rounded-xl shadow-lg p-8 transition-all">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-2">{singleJob?.title}</h1>
            <div className="flex flex-wrap gap-3">
              <Badge className="text-blue-700 font-semibold border border-blue-300" variant="ghost">
                {singleJob?.postion} Positions
              </Badge>
              <Badge className="text-red-600 font-semibold border border-red-300" variant="ghost">
                {singleJob?.jobType}
              </Badge>
              <Badge className="text-purple-700 font-semibold border border-purple-300" variant="ghost">
                {singleJob?.salary} LPA
              </Badge>
            </div>
          </div>
          <Button
            onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied}
            className={`px-6 py-2 rounded-lg transition-all font-bold text-white ${
              isApplied
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#2648F0] to-[#2648F0] hover:from-[#5a2fb3] hover:to-[#9025cc]'
            }`}
          >
            {isApplied ? 'Already Applied' : 'Apply Now'}
          </Button>
        </div>

        <div className="border-t pt-6 space-y-4">
          <div>
            <h2 className="text-lg font-bold text-gray-700 dark:text-gray-300">Role</h2>
            <p className="text-gray-800 dark:text-gray-200 pl-2">{singleJob?.title}</p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-700 dark:text-gray-300">Location</h2>
            <p className="text-gray-800 dark:text-gray-200 pl-2">{singleJob?.location}</p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-700 dark:text-gray-300">Description</h2>
            <p className="text-gray-800 dark:text-gray-200 pl-2 whitespace-pre-line">{singleJob?.description}</p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-700 dark:text-gray-300">Experience</h2>
            <p className="text-gray-800 dark:text-gray-200 pl-2">{singleJob?.experience} years</p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-700 dark:text-gray-300">Salary</h2>
            <p className="text-gray-800 dark:text-gray-200 pl-2">{singleJob?.salary} LPA</p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-700 dark:text-gray-300">Total Applicants</h2>
            <p className="text-gray-800 dark:text-gray-200 pl-2">{singleJob?.applications?.length}</p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-700 dark:text-gray-300">Posted On</h2>
            <p className="text-gray-800 dark:text-gray-200 pl-2">
              {singleJob?.createdAt?.split('T')[0]}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default JobDescription
