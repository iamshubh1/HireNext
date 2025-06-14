import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div className="placeholder-gray-600 min-h-screen bg-gradient-to-r from-[#DE4A82] to-[#2648F0] flex flex-col">
      <Navbar />
      <div className="flex flex-1 items-center justify-center px-4">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-xl bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 shadow-lg text-white"
        >
          <h2 className="text-3xl font-bold text-center mb-6">
            Create an Account ✨
          </h2>

          <div className="space-y-4">
            <div>
              <Label className="text-white placeholder-gray-600">Full Name</Label>
              <Input
                type="text"
                name="fullname"
                value={input.fullname}
                onChange={changeEventHandler}
                placeholder="Enter full name"
                className="bg-white/20 text-white placeholder-white/70 border-white/30"
              />
            </div>
            <div>
              <Label className="text-white">Email</Label>
              <Input
                type="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                placeholder="you@example.com"
                className="bg-white/20 text-white placeholder-white/70 border-white/30"
              />
            </div>
            <div>
              <Label className="text-white">Phone Number</Label>
              <Input
                type="text"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                placeholder="Enter phone number. E.g. +910000000000"
                className="bg-white/20 text-white placeholder-white/70 border-white/30"
              />
            </div>
            <div>
              <Label className="text-white">Password</Label>
              <Input
                type="password"
                name="password"
                value={input.password}
                onChange={changeEventHandler}
                placeholder="Enter password"
                className="bg-white/20 text-white placeholder-white/70 border-white/30"
              />
            </div>

            <RadioGroup className="flex justify-center gap-8 mt-4">
              <div className="flex items-center gap-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label className="text-white">Student</Label>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label className="text-white">Recruiter</Label>
              </div>
            </RadioGroup>

            <div className="flex flex-col gap-2">
              <Label className="text-white">Upload Profile Picture</Label>
              <label
                htmlFor="profile-upload"
                className="cursor-pointer bg-white/20 border border-white/30 text-white px-4 py-2 rounded-md text-sm w-fit hover:bg-white/30 transition"
              >
                {input.file ? "Change Image" : "Choose File"}
              </label>
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="hidden"
              />
              {input.file && (
                <span className="text-xs text-white/80 mt-1">
                  Selected: {input.file.name}
                </span>
              )}
            </div>

            {loading ? (
              <Button className="w-full bg-white text-[#2648F0] hover:bg-white/90">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait...
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full bg-white text-[#2648F0] hover:bg-white/90"
              >
                Signup
              </Button>
            )}
          </div>

          <p className="text-sm text-center mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-white underline font-medium hover:text-[#FFB3C6]"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
