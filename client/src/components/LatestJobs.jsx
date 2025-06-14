import React from 'react'
import LatestJobCards from './LatestJobCards'
import { useSelector } from 'react-redux'

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job)

  return (
    <section className="relative py-20 px-4 md:px-8 bg-gradient-to-b from-white via-[#f7f4ff] to-white dark:from-[#121212] dark:via-[#1e1e2f] dark:to-[#121212] overflow-hidden">
      
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-[#6A38C2]/30 rounded-full blur-3xl opacity-70 animate-pulse z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-10 text-center">
          <span className="bg-gradient-to-r from-[#6A38C2] to-[#FF6FD8] text-transparent bg-clip-text">Latest & Top</span>{' '}
          Job Openings
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {
            allJobs.length <= 0
              ? <span className="text-center text-gray-500 dark:text-gray-400 col-span-3">No Jobs Available</span>
              : allJobs?.slice(0, 6).map((job, i) => (
                  <div key={job._id} className="animate-fade-in-up transition-all duration-300 hover:scale-[1.02]">
                    <LatestJobCards job={job} />
                  </div>
              ))
          }
        </div>
      </div>
    </section>
  )
}

export default LatestJobs
