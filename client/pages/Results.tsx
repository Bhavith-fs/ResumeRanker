import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RotateCcw, Plus, TrendingUp, Award } from "lucide-react";

interface JobSeekerAnalysis {
  mode: "seeker";
  fileName: string;
  score: number;
  uploadDate: string;
  jobDescription: string;
  missingSkills: string[];
}

interface RecruiterAnalysis {
  mode: "recruiter";
  totalResumes: number;
  topThreeMatches: Array<{
    fileName: string;
    score: number;
  }>;
  uploadDate: string;
  jobDescription: string;
}

type Analysis = JobSeekerAnalysis | RecruiterAnalysis;

export default function Results() {
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState<Analysis | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("lastAnalysis");
    if (stored) {
      setAnalysis(JSON.parse(stored));
    } else {
      navigate("/");
    }
  }, [navigate]);

  if (!analysis) {
    return null;
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-blue-600";
    if (score >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return "bg-green-100";
    if (score >= 60) return "bg-blue-100";
    if (score >= 40) return "bg-yellow-100";
    return "bg-red-100";
  };

  const handleBackToHome = () => {
    sessionStorage.removeItem("lastAnalysis");
    sessionStorage.removeItem("userMode");
    navigate("/");
  };

  if (analysis.mode === "seeker") {
    return (
      <div className="min-h-screen bg-white">
        {/* Back Button */}
        <div className="border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          </div>
        </div>

        {/* Main Content */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
                Analysis Results
              </h1>
              <p className="text-slate-600">Here's how well your resume matches the job</p>
            </div>

            {/* Score Card */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border border-slate-200 p-8 sm:p-10 mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                {/* Resume File */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-600">Resume File</p>
                  <p className="text-lg font-semibold text-slate-900 break-all">{analysis.fileName}</p>
                </div>

                {/* Match Score */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-600">Match Score</p>
                  <div className={`${getScoreBgColor(analysis.score)} ${getScoreColor(analysis.score)} rounded-lg p-4`}>
                    <div className="text-4xl font-bold">{analysis.score}%</div>
                  </div>
                </div>

                {/* Upload Date */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-600">Analyzed On</p>
                  <p className="text-lg font-semibold text-slate-900">{analysis.uploadDate}</p>
                </div>
              </div>

              {/* Score Interpretation */}
              <div className="border-t border-slate-300 pt-6">
                <h3 className="font-semibold text-slate-900 mb-3">What does this score mean?</h3>
                <div className="space-y-2 text-sm text-slate-700">
                  {analysis.score >= 80 && (
                    <>
                      <p>✓ <strong>Excellent match!</strong> Your resume strongly aligns with the job requirements.</p>
                      <p>You have most of the key skills and experience mentioned in the job description.</p>
                    </>
                  )}
                  {analysis.score >= 60 && analysis.score < 80 && (
                    <>
                      <p>✓ <strong>Good match!</strong> Your resume aligns well with the job requirements.</p>
                      <p>Consider emphasizing relevant skills and experiences that match the job description.</p>
                    </>
                  )}
                  {analysis.score >= 40 && analysis.score < 60 && (
                    <>
                      <p>◐ <strong>Moderate match.</strong> Some of your skills match the job requirements.</p>
                      <p>Consider tailoring your resume to highlight experiences that better align with this role.</p>
                    </>
                  )}
                  {analysis.score < 40 && (
                    <>
                      <p>✗ <strong>Limited match.</strong> Your resume has some gaps compared to the job requirements.</p>
                      <p>Consider acquiring or emphasizing skills that are critical for this position.</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Missing Skills Card */}
            <div className="bg-blue-50 rounded-2xl border border-blue-200 p-8 sm:p-10 mb-8">
              <div className="flex items-start gap-4">
                <TrendingUp className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 mb-4">Skills to Acquire</h3>
                  <p className="text-sm text-slate-700 mb-4">
                    These skills appear in the job description but are not prominently featured in your resume:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {analysis.missingSkills.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-blue-300 text-sm font-medium text-blue-900"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Job Description Preview */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 sm:p-10 mb-8">
              <h3 className="font-semibold text-slate-900 mb-4">Job Description Analyzed</h3>
              <div className="bg-white rounded-lg p-4 max-h-48 overflow-y-auto">
                <p className="text-sm text-slate-700 whitespace-pre-wrap">{analysis.jobDescription}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                onClick={() => {
                  sessionStorage.removeItem("lastAnalysis");
                  navigate("/seeker");
                }}
                variant="outline"
                className="h-12 border-slate-300 text-slate-900 hover:bg-slate-100 font-semibold rounded-lg flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Analyze Another Resume
              </Button>
              <Button
                onClick={handleBackToHome}
                className="h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Switch Mode
              </Button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Recruiter Mode Results
  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
              Top Candidates
            </h1>
            <p className="text-slate-600">Your 3 best matches from {analysis.totalResumes} resumes</p>
          </div>

          {/* Top 3 Matches */}
          <div className="space-y-4 mb-8">
            {analysis.topThreeMatches.map((match, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl border border-slate-200 p-6 sm:p-8"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex-shrink-0">
                        {index === 0 && (
                          <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                            <span className="text-lg font-bold text-yellow-700">🥇</span>
                          </div>
                        )}
                        {index === 1 && (
                          <div className="w-10 h-10 bg-slate-300 rounded-full flex items-center justify-center">
                            <span className="text-lg font-bold text-slate-700">🥈</span>
                          </div>
                        )}
                        {index === 2 && (
                          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                            <span className="text-lg font-bold text-orange-700">🥉</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-600 uppercase">
                          {index === 0 ? "Top Match" : index === 1 ? "2nd Match" : "3rd Match"}
                        </p>
                        <h3 className="text-lg font-semibold text-slate-900 break-all">{match.fileName}</h3>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600">Compatibility score</p>
                  </div>
                  <div className={`${getScoreBgColor(match.score)} ${getScoreColor(match.score)} rounded-xl p-4 text-right flex-shrink-0`}>
                    <div className="text-3xl font-bold">{match.score}%</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Job Description Preview */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 sm:p-10 mb-8">
            <h3 className="font-semibold text-slate-900 mb-4">Job Description Analyzed</h3>
            <div className="bg-white rounded-lg p-4 max-h-48 overflow-y-auto">
              <p className="text-sm text-slate-700 whitespace-pre-wrap">{analysis.jobDescription}</p>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-purple-50 rounded-2xl border border-purple-200 p-8 sm:p-10 mb-8">
            <div className="flex items-start gap-4">
              <Award className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Next Steps</h3>
                <p className="text-sm text-slate-700">
                  Review the top 3 candidates above. You can now move forward with interviews, request additional materials, or analyze another batch of resumes.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button
              onClick={() => {
                sessionStorage.removeItem("lastAnalysis");
                navigate("/recruiter");
              }}
              variant="outline"
              className="h-12 border-slate-300 text-slate-900 hover:bg-slate-100 font-semibold rounded-lg flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Analyze New Batch
            </Button>
            <Button
              onClick={handleBackToHome}
              className="h-12 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Switch Mode
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
