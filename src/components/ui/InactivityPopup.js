'use client'

import { useState, useEffect } from "react";
import { useIdle } from "@uidotdev/usehooks";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { X } from "lucide-react";

export default function InactivityPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const idle = useIdle(1000);
  const pathname = usePathname();

  useEffect(() => {
    if (idle && !isDismissed && pathname !== '/contact') {
      setIsVisible(true);
    }
  }, [idle, isDismissed, pathname]);

  const handleClose = () => {
    setIsVisible(false);
    setIsDismissed(true);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md">
      <div className="bg-white border border-gray-200 rounded-lg shadow-xl p-6 relative animate-in slide-in-from-bottom-2 duration-300">
        {/* Content */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-3">
            We're Here to Help! 👋
          </h3>
          <div className="space-y-3 mb-5">
            <p className="text-sm text-gray-700 leading-relaxed">
              Have questions about our weighing solutions? Need technical support or product recommendations?
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              Our expert team is ready to assist you with:
            </p>
            <ul className="text-sm text-gray-600 ml-4 space-y-1">
              <li>• Product selection and specifications</li>
              <li>• Technical support and troubleshooting</li>
              <li>• Custom weighing solutions</li>
              <li>• Pricing and availability</li>
            </ul>
            <p className="text-sm font-medium text-gray-800">
              Get in touch - we typically respond within 24 hours!
            </p>
          </div>
          
          {/* Button row */}
          <div className="flex gap-2">
            {/* Contact button - 3/4 width */}
            <Link
              href="/contact"
              className="flex-[3] flex items-center justify-center px-4 py-3 text-sm font-semibold text-white bg-green hover:bg-green/90 rounded-lg transition-colors shadow-md hover:shadow-lg"
              onClick={handleClose}
            >
              Contact Us Today
            </Link>
            
            {/* Close button - 1/4 width */}
            <button
              onClick={handleClose}
              className="flex-1 flex items-center justify-center px-4 py-3 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              aria-label="Close popup"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
