import { useState } from "react";
import { Upload, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedData, setUploadedData] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(file.type)) {
      setResumeFile(file);
    } else {
      alert("Please upload a valid PDF or DOCX file");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!resumeFile || !jobDescription.trim()) {
      alert("Please upload a resume and enter a job description");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const mockScore = Math.floor(Math.random() * 40) + 60;
      setUploadedData({
        fileName: resumeFile.name,
        score: mockScore,
        uploadDate: new Date().toLocaleDateString(),
      });
      
      // Store in session for results page
      sessionStorage.setItem("lastAnalysis", JSON.stringify({
        fileName: resumeFile.name,
        score: mockScore,
        uploadDate: new Date().toLocaleDateString(),
        jobDescription: jobDescription,
      }));

      setIsLoading(false);
      navigate("/results");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
              Resume Ranker
            </h1>
            <p className="text-lg text-slate-600">
              Instantly see how well your resume matches the job description
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-slate-50 rounded-2xl shadow-sm border border-slate-200 p-8 sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* File Upload */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-slate-900">
                  Upload Your Resume
                </label>
                <label className="flex items-center justify-center w-full px-6 py-4 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-200">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Upload className="w-6 h-6 text-slate-500" />
                    <div className="text-center">
                      <p className="text-sm font-medium text-slate-700">
                        {resumeFile ? resumeFile.name : "Click to upload or drag and drop"}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">PDF or DOCX up to 10MB</p>
                    </div>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.docx"
                    onChange={handleFileChange}
                  />
                </label>
                {resumeFile && (
                  <div className="flex items-center gap-2 text-green-600 text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>File selected: {resumeFile.name}</span>
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
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-slate-900 placeholder-slate-500"
                  placeholder="Paste the job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Analyzing...</span>
                  </div>
                ) : (
                  "Rank My Resume"
                )}
              </Button>
            </form>
          </div>

          {/* Features */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg mb-3">
                <Upload className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">Easy Upload</h3>
              <p className="text-sm text-slate-600">Upload PDF or DOCX files instantly</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg mb-3">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000 2H6V5a2 2 0 012-2h4a2 2 0 012 2v2h2a1 1 0 110 2H4a1 1 0 110-2h2V5zm12 0a2 2 0 00-2-2h-4a2 2 0 00-2 2v2H4a1 1 0 100 2h12a1 1 0 100-2h-2V5zm-8 8a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1H7a1 1 0 110-2h1v-1a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">Instant Analysis</h3>
              <p className="text-sm text-slate-600">Get results in seconds</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg mb-3">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">Match Score</h3>
              <p className="text-sm text-slate-600">See your compatibility percentage</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
