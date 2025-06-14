import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);
  const { singleCompany } = useSelector((store) => store.company);

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: singleCompany.file || null,
    });
  }, [singleCompany]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="max-w-3xl mx-auto mt-10 px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button
            onClick={() => navigate("/admin/companies")}
            variant="outline"
            className="gap-2 text-gray-600 dark:text-gray-300"
          >
            <ArrowLeft size={16} />
            Back
          </Button>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            ✏️ Edit Company
          </h2>
        </div>

        <form
          onSubmit={submitHandler}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Company Name", name: "name" },
              { label: "Description", name: "description" },
              { label: "Website", name: "website" },
              { label: "Location", name: "location" },
            ].map(({ label, name }) => (
              <div key={name}>
                <Label className="text-gray-700 dark:text-gray-300 block mb-1">
                  {label}
                </Label>
                <Input
                  type="text"
                  name={name}
                  value={input[name]}
                  onChange={changeEventHandler}
                  className="w-full focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}

            <div className="md:col-span-2">
              <Label className="text-gray-700 dark:text-gray-300 block mb-1">
                Company Logo
              </Label>
              <div className="relative w-full mt-1">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={changeFileHandler}
                  className="w-full cursor-pointer text-sm text-gray-500
                 file:mr-4 file:py-2 file:px-4
                 file:rounded-md file:border-0
                 file:bg-blue-600 file:text-white
                 hover:file:bg-blue-700
                 dark:file:bg-blue-500 dark:hover:file:bg-blue-600
                 dark:text-gray-300"
                />
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Button
              type="submit"
              className="w-full py-3 text-white bg-blue-600 hover:bg-blue-700 transition rounded-md"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Company"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
