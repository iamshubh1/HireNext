import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-[#1c1c2e]/80 shadow-md">
      <div className="flex items-center justify-between max-w-7xl mx-auto h-16 px-4">
        <div className="flex items-center gap-3">
          <img
            src="https://iili.io/FB3jIJp.png"
            alt="HireNext Logo"
            className="h-10 w-10"
          />
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2648F0] tracking-tight">
            Hire<span className="text-[#DE4A82]">Next</span>
          </h1>
        </div>

        <div className="flex items-center gap-10">
          <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700 dark:text-gray-300">
            {user && user.role === "recruiter" ? (
              <>
                <li className="hover:text-[#3F5EFB] relative group">
                  <Link to="/admin/companies">Companies</Link>
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#3F5EFB] group-hover:w-full transition-all duration-300"></span>
                </li>
                <li className="hover:text-[#3F5EFB] relative group">
                  <Link to="/admin/jobs">Jobs</Link>
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#3F5EFB] group-hover:w-full transition-all duration-300"></span>
                </li>
              </>
            ) : (
              <>
                <li className="hover:text-[#3F5EFB] relative group font-semibold">
                  <Link to="/">Home</Link>
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#3F5EFB] group-hover:w-full transition-all duration-300"></span>
                </li>
                <li className="hover:text-[#3F5EFB] relative group">
                  <Link to="/jobs">Jobs</Link>
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#3F5EFB] group-hover:w-full transition-all duration-300"></span>
                </li>
                <li className="hover:text-[#3F5EFB] relative group">
                  <Link to="/browse">Explore</Link>
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#3F5EFB] group-hover:w-full transition-all duration-300"></span>
                </li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex gap-2">
              <Link to="/login">
                <Button className="bg-[#DE4A82] hover:bg-[#FF2954] rounded-xl px-6 py-2 text-sm font-semibold">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#2648F0] hover:bg-[#0B1EE6] rounded-xl px-6 py-2 text-sm font-semibold">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer ring-2 ring-[#2648F0]">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="User Avatar"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-72 bg-white dark:bg-[#2a2a3d] border rounded-xl shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar>
                    <AvatarImage src={user?.profile?.profilePhoto} />
                  </Avatar>
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-white">
                      {user?.fullname}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{user?.profile?.bio}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 text-sm text-gray-700 dark:text-gray-300">
                  {user?.role === "student" && (
                    <div className="flex items-center gap-2">
                      <User2 size={18} />
                      <Link to="/profile">
                        <Button variant="link" className="p-0 h-auto text-sm">
                          View Profile
                        </Button>
                      </Link>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <LogOut size={18} />
                    <Button
                      onClick={logoutHandler}
                      variant="link"
                      className="p-0 h-auto text-sm"
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
