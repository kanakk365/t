"use client";
import { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import axios from "axios";
import { ApiRoutes } from "@/utils/routeApi";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { AIInputWithLoading } from "./ui/ai-input-with-loading";
import AnimatedLoadingSkeleton from "./ui/animated-loading-skeleton";

export function GenerateGraphs() {
  const [file, setFile] = useState<File[]>([]);
  const [graphQuantity, setGraphQuantity] = useState<number | null>(null);
  const [graphTypes, setGraphTypes] = useState({
    lineGraph: false,
    barChart: false,
    histogram: false,
    scatterPlot: false,
    pieChart: false,
    boxPlot: false,
    bubbleChart: false,
    heatmap: false,
    radarChart: false,
    stepChart: false,
    d3ScatterPlot: false,
    d3SurfacePlot: false,
    d3BarChart: false,
    d3PieChart: false,
    d3LineGraph: false,
    d3ContourPlot: false,
    d3BubbleChart: false,
    d3WireframePlot: false,
    d3Histogram: false,
  });

  type ColorTheme = "Modern" | "Classic";

  const [graphUrls, setGraphUrls] = useState<string[]>([]);
  const [colorTheme, setColorTheme] = useState<ColorTheme>("Modern");
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state: RootState) => state.auth);

  const handleColorThemeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setColorTheme(event.target.value as ColorTheme);
  };

  const handleGraphTypeChange = (chart: keyof typeof graphTypes) => {
    setGraphTypes((prev) => ({
      ...prev,
      [chart]: !prev[chart],
    }));
  };

  const handleFileUpload = (selectedFiles: File[]) => {
    if (selectedFiles.length > 0) {
      setFile(selectedFiles);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      console.log("No file selected");
      return;
    }
    setLoading(true);
    const formData = new FormData();

    file.forEach((file) => {
      formData.append("file", file);
    });
    formData.append(
      "graphQuantity",
      graphQuantity !== null ? graphQuantity.toString() : ""
    );
    formData.append("theme", colorTheme);
    formData.append("specific", JSON.stringify(graphTypes));

    try {
      const res = await axios.post(ApiRoutes.sendCsv, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res.data);
      console.log("Upload successful", res);
      const data = res.data;
      checkStatus(data.task_id);
    } catch (error) {
      console.error("Error uploading file", error);
      setLoading(false);
    }
  };

  const checkStatus = async (taskId: string) => {
    const interval = setInterval(async () => {
      try {
        const res = await axios.post(
          `http://localhost:8000/task-status4/${taskId}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = res.data;

        if (data.status === "COMPLETED") {
          // Extract all values from the data object
          const links = Object.values(data).filter(
            (value): value is string =>
              typeof value === "string" && value.includes("graph")
          );
          setLoading(false);
          setGraphUrls(links);
          clearInterval(interval);
        }
      } catch (error) {
        console.error("Error checking status:", error);
        clearInterval(interval);
        setLoading(false);
      }
    }, 2000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  };

  return (
    <section id="data-visualizer" className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-neutral-800">
            Data Visualizer
          </h1>
          <p className="text-neutral-600 mt-2">
            Transform your CSV data into insightful visualizations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Control Panel */}
          <div className="lg:col-span-4 space-y-6">
            {/* File Upload */}
            <FileUpload onChange={handleFileUpload} />

            {/* Graph Controls */}
            <div className="border border-neutral-200/40 rounded-lg p-6 bg-white space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700">
                  Graph Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={graphQuantity ?? ""}
                  onChange={(e) => setGraphQuantity(Number(e.target.value))}
                  className="mt-1 block w-full rounded-md border border-neutral-200/40 px-4 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700">
                  Graph Types
                </label>
                <div className="mt-2 space-y-2">
                  {Object.entries(graphTypes).map(([key, value]) => (
                    <label key={key} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={() =>
                          handleGraphTypeChange(key as keyof typeof graphTypes)
                        }
                        className="rounded border-neutral-200/40 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-neutral-700">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700">
                  Color Theme
                </label>
                <select
                  value={colorTheme}
                  onChange={handleColorThemeChange}
                  className="mt-1 block w-full rounded-md border border-neutral-200/40 px-4 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option>Modern</option>
                  <option>Classic</option>
                </select>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Generate Visualizations
              </button>
            </div>
          </div>

          {/* Visualization Grid */}
          <div className="lg:col-span-8 bg-gray-50 rounded-lg ">
            {/* Added a fixed height container with vertical scroll */}
            <div className="h-[900px] overflow-y-auto rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 h-[85%] w-full ">
              
                {loading ? (
                  <div className=" col-span-1 md:col-span-2 w-full h-full "> <AnimatedLoadingSkeleton  /></div>
                 
                ) : graphUrls.length > 0 ? (
                  graphUrls.map((url, idx) => (
                    <div
                      key={idx}
                      className="border border-neutral-200/40 rounded-lg bg-white p-4 h-64 flex flex-col items-center justify-center space-y-2"
                    >
                      {url ? (
                        <>
                          <img
                            src={url}
                            alt={`Graph ${idx + 1}`}
                            className="object-contain max-h-full"
                          />
                          <button
                            onClick={() => window.open(url, "_blank")}
                            className="bg-blue-600 text-white rounded px-3 py-1 text-sm hover:bg-blue-700 focus:outline-none"
                          >
                            Download Graph {idx + 1}
                          </button>
                        </>
                      ) : (
                        <p className="text-sm text-neutral-400">{`Graph ${
                          idx + 1
                        } Placeholder`}</p>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 flex items-center justify-center h-full">
                    <p className="text-neutral-500">
                      Upload a CSV file and generate visualizations to see them
                      here
                    </p>
                  </div>
                )}
              </div>
              <div className="mt-4">
                <AIInputWithLoading />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
