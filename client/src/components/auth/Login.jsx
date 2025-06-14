import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Login = () => {
  const [input, setInput] = useState({
    email: '',
    password: '',
    role: '',
  });

  const { loading, user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = e => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async e => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate('/');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) navigate('/');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#DE4A82] to-[#2648F0] flex flex-col">
      <Navbar />
      <div className="flex flex-1 items-center justify-center p-6">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 shadow-lg text-white"
        >
          <h2 className="text-3xl font-bold text-center mb-6">Welcome Back 👋</h2>

          <div className="space-y-4">
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
              <Label className="text-white">Password</Label>
              <Input
                type="password"
                name="password"
                value={input.password}
                onChange={changeEventHandler}
                placeholder="Enter your password"
                className="bg-white/20 text-white placeholder-white/70 border-white/30"
              />
            </div>

            <RadioGroup className="flex justify-center gap-8 mt-4">
              <div className="flex items-center gap-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === 'student'}
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
                  checked={input.role === 'recruiter'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label className="text-white">Recruiter</Label>
              </div>
            </RadioGroup>

            {loading ? (
              <Button className="w-full bg-white text-[#2648F0] hover:bg-white/90">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </Button>
            ) : (
              <Button type="submit" className="w-full bg-white text-[#2648F0] hover:bg-white/90">
                Login
              </Button>
            )}
          </div>

          <p className="text-sm text-center mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-white font-medium underline hover:text-[#FFB3C6]">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
