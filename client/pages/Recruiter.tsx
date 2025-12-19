import { useState } from "react";
import { Upload, CheckCircle2, ArrowLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Recruiter() {
  const navigate = useNavigate();
  const [resumeFiles, setResumeFiles] = useState<File[]>([]);
  const [jobDescription, setJobDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const MAX_RESUMES = 10;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter((file) =>
      ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(file.type)
    );

    if (validFiles.length === 0) {
      alert("Please upload valid PDF or DOCX files");
      return;
    }

    const totalFiles = resumeFiles.length + validFiles.length;
    if (totalFiles > MAX_RESUMES) {
      alert(`You can upload a maximum of ${MAX_RESUMES} resumes`);
      return;
    }

    setResumeFiles([...resumeFiles, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setResumeFiles(resumeFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (resumeFiles.length === 0 || !jobDescription.trim()) {
      alert("Please upload at least one resume and enter a job description");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Generate mock scores for each resume and find top 3
      const analysisResults = resumeFiles.map((file) => ({
        fileName: file.name,
        score: Math.floor(Math.random() * 40) + 60,
      }));

      // Sort by score descending and get top 3
      const topThree = analysisResults
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);

      sessionStorage.setItem("lastAnalysis", JSON.stringify({
        mode: "recruiter",
        totalResumes: resumeFiles.length,
        topThreeMatches: topThree,
        uploadDate: new Date().toLocaleDateString(),
        jobDescription: jobDescription,
      }));

      setIsLoading(false);
      navigate("/results");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Back Button */}
      <div className="border-b border-slate-200">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4 w-full">
          <button
            onClick={() => {
              sessionStorage.removeItem("userMode");
              navigate("/");
            }}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Mode Selection
          </button>
        </div>
      </div>

      {/* Main Content */}
      <section className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-2xl mb-4">
              <Upload className="w-6 h-6 text-purple-600" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
              Find Top Candidates
            </h1>
            <p className="text-lg text-slate-600">
              Upload up to 10 resumes and find the top 3 matches for your job
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-slate-50 rounded-2xl shadow-sm border border-slate-200 p-8 sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* File Upload */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-semibold text-slate-900">
                    Upload Resumes
                  </label>
                  <span className="text-xs text-slate-600">
                    {resumeFiles.length}/{MAX_RESUMES}
                  </span>
                </div>
                <label className="flex items-center justify-center w-full px-6 py-4 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-purple-400 hover:bg-purple-50 transition-all duration-200">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Upload className="w-6 h-6 text-slate-500" />
                    <div className="text-center">
                      <p className="text-sm font-medium text-slate-700">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-slate-500 mt-1">PDF or DOCX, up to 10 files</p>
                    </div>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.docx"
                    multiple
                    onChange={handleFileChange}
                    disabled={resumeFiles.length >= MAX_RESUMES}
                  />
                </label>

                {/* Uploaded Files List */}
                {resumeFiles.length > 0 && (
                  <div className="space-y-2 mt-4">
                    <h3 className="text-sm font-medium text-slate-900">Uploaded Files ({resumeFiles.length})</h3>
                    <div className="bg-white rounded-lg p-4 space-y-2 max-h-40 overflow-y-auto">
                      {resumeFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-slate-50 rounded border border-slate-200"
                        >
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span className="text-sm text-slate-700 truncate">{file.name}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="ml-2 text-slate-400 hover:text-red-600 transition-colors flex-shrink-0"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Job Description */}
              <div className="space-y-3">
                <label htmlFor="jobDescription" className="block text-sm font-semibold text-slate-900">
                  Paste Job Description
                </label>
                <textarea
                  id="jobDescription"
                  rows={6}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-slate-900 placeholder-slate-500"
                  placeholder="Paste the job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading || resumeFiles.length === 0}
                className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Analyzing...</span>
                  </div>
                ) : (
                  "Find Top 3 Matches"
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
