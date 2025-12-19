import { useState } from "react";
import { Upload, CheckCircle2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function JobSeeker() {
  const navigate = useNavigate();
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      
      // Sample missing skills
      const allSkills = [
        "Python",
        "JavaScript",
        "React",
        "Node.js",
        "AWS",
        "Docker",
        "Kubernetes",
        "PostgreSQL",
        "MongoDB",
        "GraphQL",
        "TypeScript",
        "Java",
      ];
      
      const missingSkillsCount = Math.floor(Math.random() * 3) + 2;
      const missingSkills = allSkills
        .sort(() => Math.random() - 0.5)
        .slice(0, missingSkillsCount);

      sessionStorage.setItem("lastAnalysis", JSON.stringify({
        mode: "seeker",
        fileName: resumeFile.name,
        score: mockScore,
        uploadDate: new Date().toLocaleDateString(),
        jobDescription: jobDescription,
        missingSkills: missingSkills,
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
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
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
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-2xl mb-4">
              <Upload className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
              Analyze Your Resume
            </h1>
            <p className="text-lg text-slate-600">
              Upload your resume and job description to see your match score and missing skills
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
                  "Analyze Resume"
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
