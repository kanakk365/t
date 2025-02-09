import { Link } from "react-router-dom";

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xl font-semibold">Project</span>
    </div>
  );
}

export default function Footer() {
  return (
    <div className=" ">
      <footer className="bg-[#eeeeee] py-12 px-10 w-[90%] sm:max-w-7xl mx-auto rounded-lg mt-16">
        <div className="  max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {/* Logo Section */}
            <div className="md:col-span-2">
              <Logo />
            </div>

            {/* Links Sections */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Contact</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="#" className="text-gray-600 hover:text-gray-900">
                    LinkedIn
                  </Link>
                </li>
              </ul>
            </div>

            

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Help</h3>
              <ul className="space-y-3">
                {/* <li>
                  <Link to="#" className="text-gray-600 hover:text-gray-900">
                    Contact Us
                  </Link>
                </li> */}
                <li>
                  <Link to="#" className="text-gray-600 hover:text-gray-900">
                    FAQ
                  </Link>
                </li>
                {/* <li>
                  <Link to="#" className="text-gray-600 hover:text-gray-900">
                    Feedback
                  </Link>
                </li> */}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Socials</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="#" className="text-gray-600 hover:text-gray-900">
                    X
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-600 hover:text-gray-900">
                    LinkedIn
                  </Link>
                </li>
                {/* <li>
                  <Link to="#" className="text-gray-600 hover:text-gray-900">
                    Slack
                  </Link>
                </li> */}
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-2 pt-8 border-t border-gray-200">
            <p className="text-gray-600 text-sm">
              © 2025 | All rights reserved | Project
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
