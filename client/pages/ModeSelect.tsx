import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Briefcase, User } from "lucide-react";

export default function ModeSelect() {
  const navigate = useNavigate();

  const handleModeSelect = (mode: "seeker" | "recruiter") => {
    sessionStorage.setItem("userMode", mode);
    if (mode === "seeker") {
      navigate("/seeker");
    } else {
      navigate("/recruiter");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <section className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
              Resume Ranker
            </h1>
            <p className="text-lg text-slate-600">
              Choose your role to get started
            </p>
          </div>

          {/* Mode Selection Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Job Seeker Card */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-200 p-8 sm:p-10 hover:shadow-lg transition-shadow duration-200">
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Job Seeker</h2>
                  <p className="text-slate-700 mb-4">
                    Upload your resume and check how well it matches with a job description
                  </p>
                  <ul className="text-sm text-slate-600 space-y-2 mb-6 text-left">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span>Get your match score</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span>See missing skills to improve</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span>Instant analysis</span>
                    </li>
                  </ul>
                </div>
                <Button
                  onClick={() => handleModeSelect("seeker")}
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
                >
                  Continue as Job Seeker
                </Button>
              </div>
            </div>

            {/* Recruiter Card */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border-2 border-purple-200 p-8 sm:p-10 hover:shadow-lg transition-shadow duration-200">
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Recruiter</h2>
                  <p className="text-slate-700 mb-4">
                    Upload up to 10 resumes and find the top 3 best matches for your job
                  </p>
                  <ul className="text-sm text-slate-600 space-y-2 mb-6 text-left">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">✓</span>
                      <span>Upload up to 10 resumes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">✓</span>
                      <span>Find top 3 matches instantly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">✓</span>
                      <span>Compare candidates easily</span>
                    </li>
                  </ul>
                </div>
                <Button
                  onClick={() => handleModeSelect("recruiter")}
                  className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors duration-200"
                >
                  Continue as Recruiter
                </Button>
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-12 text-center">
            <p className="text-sm text-slate-600">
              No account needed. Your data is only stored temporarily during this session.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
