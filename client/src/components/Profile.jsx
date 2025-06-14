import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="bg-gray-100 dark:bg-[#121212] min-h-screen">
      <Navbar />
      <div className="max-w-5xl mx-auto py-10 px-4 space-y-10">

        {/* Profile Header */}
        <div className="relative bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-md p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24 shadow-md ring-2 ring-blue-500">
                <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{user?.fullname}</h1>
                <p className="text-gray-500 dark:text-gray-300">{user?.profile?.bio || "No bio available."}</p>
              </div>
            </div>
            <Button onClick={() => setOpen(true)} variant="outline" className="rounded-full">
              <Pen className="h-4 w-4 mr-2" /> Edit Profile
            </Button>
          </div>
        </div>

        {/* Contact + Skills + Resume */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Contact Info */}
          <div className="bg-white dark:bg-[#1e1e1e] rounded-xl p-6 shadow">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Contact Info</h2>
            <div className="space-y-3 text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>{user?.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Contact className="w-4 h-4" />
                <span>{user?.phoneNumber}</span>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="bg-white dark:bg-[#1e1e1e] rounded-xl p-6 shadow">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {user?.profile?.skills?.length > 0
                ? user?.profile?.skills.map((skill, i) => (
                    <Badge key={i} variant="outline" className="text-sm border-blue-300 dark:border-blue-500 text-blue-600 dark:text-blue-400">
                      {skill}
                    </Badge>
                  ))
                : <span className="text-gray-500 dark:text-gray-400">NA</span>}
            </div>
          </div>

          {/* Resume */}
          <div className="bg-white dark:bg-[#1e1e1e] rounded-xl p-6 shadow">
            <Label className="text-md font-bold text-gray-800 dark:text-white">Resume</Label>
            <div className="mt-3">
              {isResume && user?.profile?.resume ? (
                <a
                  href={user?.profile?.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm break-all"
                >
                  {user?.profile?.resumeOriginalName}
                </a>
              ) : (
                <span className="text-gray-500 dark:text-gray-400 text-sm">NA</span>
              )}
            </div>
          </div>
        </div>

        {/* Applied Jobs */}
        <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl p-6 shadow">
          <h1 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Applied Jobs</h1>
          <AppliedJobTable />
        </div>
      </div>

      {/* Profile Update Dialog */}
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
