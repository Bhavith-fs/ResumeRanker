import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              About Resume Ranker
            </h1>
            <p className="text-lg text-slate-600">
              Making resume optimization simple and straightforward
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {/* How It Works */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 sm:p-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">How It Works</h2>
              <p className="text-slate-700 mb-4">
                Resume Ranker uses advanced algorithms to analyze how well your resume matches a specific job description. Simply upload your resume and paste the job details you're interested in, and we'll provide instant insights on your compatibility.
              </p>
              <p className="text-slate-700">
                Our matching algorithm examines key factors including your relevant skills, experience, education, and keywords that align with the job requirements. You'll get a clear score and actionable feedback to help improve your application.
              </p>
            </div>

            {/* Features */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 sm:p-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Why Use Resume Ranker?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Instant Feedback</h3>
                  <p className="text-slate-700 text-sm">Get immediate insights on how well your resume matches the job in seconds.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Easy to Use</h3>
                  <p className="text-slate-700 text-sm">Simple upload process with no registration required. Just upload and paste.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Increase Success Rate</h3>
                  <p className="text-slate-700 text-sm">Improve your chances of getting interviewed by tailoring your resume.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Free to Use</h3>
                  <p className="text-slate-700 text-sm">No hidden fees or premium plans. Analyze as many resumes as you need.</p>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-blue-50 rounded-2xl border border-blue-200 p-8 sm:p-10 text-center">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Get in Touch</h2>
              <p className="text-slate-700 mb-6">
                Have feedback or questions? We'd love to hear from you.
              </p>
              <a href="mailto:support@resumeranker.com">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2 mx-auto">
                  <Mail className="w-4 h-4" />
                  Contact Us
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
