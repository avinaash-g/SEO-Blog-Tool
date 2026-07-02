import React from "react";
//import Navbar from "@/components/Landingpage/Navbar";

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-[#A6FF5D] transition-colors duration-200">
      {/* Top sticky/fixed positioning for your landing page navbar */}
      {/* <Navbar /> */}
      
      {/* The individual tool page is mounted cleanly below */}
      <div className="w-full">
        {children}
      </div>
    </div>
  );
}