import Navbar from "@/src/components/common/Navbar";
import Sidebar from "@/src/components/common/Sidebar";

export default function MetricPageLayout({ children }: any) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 h-screen">
        <Navbar />
        <div className="flex-1 bg-[#111317] p-4 sm:p-6 lg:p-7 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}