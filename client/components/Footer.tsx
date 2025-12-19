import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="flex items-center gap-2 font-bold text-slate-900 mb-2"
            >
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000 2H6V5a2 2 0 012-2h4a2 2 0 012 2v2h2a1 1 0 110 2H4a1 1 0 110-2h2V5zm12 0a2 2 0 00-2-2h-4a2 2 0 00-2 2v2H4a1 1 0 100 2h12a1 1 0 100-2h-2V5zm-8 8a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1H7a1 1 0 110-2h1v-1a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </div>
              <span>Resume Ranker</span>
            </Link>
            <p className="text-sm text-slate-600">Optimize your resume, ace your interview</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">
                  Rank My Resume
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:support@resumeranker.com"
                  className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-200 pt-8 text-center text-sm text-slate-600">
          <p>&copy; {currentYear} Resume Ranker. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
