// app/(main)/layout.js

import Sidebar from "@/components/ui/Sidebar";

  export default function MainLayout({ children }) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
  
        {/* Main Content */}
        <main>{children}</main>
      </div>
    );
  }