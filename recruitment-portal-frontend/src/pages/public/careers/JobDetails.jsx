import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../../components/public/Navbar";
import Footer from "../../../components/public/Footer";
import JobHero from "../../../components/public/job-details/JobHero";
import JobDescription from "../../../components/public/job-details/JobDescription";
import JobSidebar from "../../../components/public/job-details/JobSidebar";
import HiringProcess from "../../../components/public/job-details/HiringProcess";
import CompanyBenefits from "../../../components/public/job-details/CompanyBenefits";


import { getPublicJob } from "../../../api/publicApi";

export default function JobDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [job, setJob] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJob();
  }, [id]);

  const loadJob = async () => {
    try {
      const res = await getPublicJob(id);

      setJob(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl font-semibold">
        Loading Job...
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Job Not Found
      </div>
    );
  }

  return (
    <div className="bg-slate-50">

      <Navbar />

      <JobHero job={job} />

      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid lg:grid-cols-3 gap-12">

          {/* LEFT */}

          <div className="lg:col-span-2 space-y-10">

            <JobDescription job={job} />

            <HiringProcess />

            <CompanyBenefits />

          </div>

          {/* RIGHT */}

          <div>

            <JobSidebar job={job} />

          </div>

        </div>

      </section>

      <Footer />

    </div>
  );
}