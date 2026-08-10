import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../../components/public/Footer";
import JobHero from "../../../components/public/job-details/JobHero";
import JobDescription from "../../../components/public/job-details/JobDescription";
import JobSidebar from "../../../components/public/job-details/JobSidebar";
import HiringProcess from "../../../components/public/job-details/HiringProcess";
import CompanyBenefits from "../../../components/public/job-details/CompanyBenefits";
import { getPublicJob } from "../../../api/publicApi";

export default function JobDetails() {
  const { id } = useParams();
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
      <div className="flex min-h-[60vh] items-center justify-center pt-24">
        <p className="text-[15px] font-medium text-[var(--color-ink-secondary)]">
          Loading role…
        </p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center pt-24">
        <p className="text-lg font-semibold text-[var(--color-ink)]">
          Job not found
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[var(--color-canvas)]">
      <JobHero job={job} />
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
          <div className="space-y-8 lg:col-span-2">
            <JobDescription job={job} />
            <HiringProcess />
            <CompanyBenefits />
          </div>
          <div>
            <JobSidebar job={job} />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
