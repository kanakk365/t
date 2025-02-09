import { Outlet } from "react-router-dom";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChartColumnDecreasing, CodeXml, File } from "lucide-react";

export const DashboardLayout = () => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-white dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden ",
        "h-screen"
      )}
    >
      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} animate={false}>
        <SidebarBody className="justify-between gap-10">
          <div className="  flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <>
              <Logo />
            </>
            <div className="mt-8 flex flex-col gap-2">
              <SidebarLink
                link={{
                  label: "Generate Graphs",
                  href: "/app/graphs",
                  icon: <ChartColumnDecreasing/>
                }}
              />
              <SidebarLink
                link={{
                  label: "Generate Docs",
                  href: "/app/docs",
                  icon:<File/>,
                }}
              />
               <SidebarLink
                link={{
                  label: "Code Documentation",
                  href: "/app/codedocs",
                  icon:<CodeXml/>,
                }}
              />
               <SidebarLink
                link={{
                  label: "Github Documentation",
                  href: "/app/gitcodeassist",
                  icon:<CodeXml/>,
                }}
              />

              
            </div>
          </div>
        </SidebarBody>
      </Sidebar>

      {/* Dashboard Content */}
      <div className="flex-1 p-4 bg-[#f4f4f5]  dark:bg-neutral-900 rounded-md overflow-auto">
        <Outlet /> {/* This will render the matched child route */}
      </div>
    </div>
  );
};

export const Logo = () => {
  return (
    <Link
      to="/" // Updated to prop
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Project
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      to="/" // Updated to prop
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};
