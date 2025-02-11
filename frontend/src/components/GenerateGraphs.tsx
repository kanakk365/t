"use client";
import { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import axios from "axios";
import { ApiRoutes } from "@/utils/routeApi";

export function GenerateGraphs() {
  const [file, setFile] = useState<File[]>([]);
  const [graphQuantity, setGraphQuantity] = useState<number | null>(null);
  const [graphTypes, setGraphTypes] = useState({
    lineChart: false,
    barChart: false,
    heatmap: false,
    scatterPlot: false,
  });
  const [annotations, setAnnotation] = useState({
    dataLabels: false,
    trendLines: false,
  });

  const [graphUrls, setGraphUrls] = useState<{ [key: string]: string }>({
    graph_1: "",
    graph_2: "",
    graph_3: "",
    graph_4: "",
  });

  const handleAnnotationChange = (key: keyof typeof annotations) => {
    setAnnotation((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
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

    const formData = new FormData();

    file.forEach((file) => {
      formData.append("file", file);
    });
    formData.append(
      "graphQuantity",
      graphQuantity !== null ? graphQuantity.toString() : ""
    );
    formData.append("specific", JSON.stringify(graphTypes));

    try {
      const res = await axios.post(ApiRoutes.sendCsv, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res.data);
      console.log("Upload successful", res);

      
      const data = res.data;
      setGraphUrls({
        graph_1: data.graph_1,
        graph_2: data.graph_2,
        graph_3: data.graph_3,
        graph_4: data.graph_4,
      });
    } catch (error) {
      console.error("Error uploading file", error);
    }
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
                  className="mt-1 block w-full rounded-md border border-neutral-200/40 px-4 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option>Modern</option>
                  <option>Classic</option>
                  <option>Vibrant</option>
                  <option>Pastel</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700">
                  Annotations
                </label>
                <div className="mt-2 space-y-2">
                  {Object.entries(annotations).map(([key, value]) => (
                    <label key={key} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={() =>
                          handleAnnotationChange(key as keyof typeof annotations)
                        }
                        className="rounded border-neutral-200/40 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-neutral-700">
                        {key === "dataLabels" ? "Data Labels" : "Trend Lines"}
                      </span>
                    </label>
                  ))}
                </div>
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
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["graph_1", "graph_2", "graph_3", "graph_4"].map((key, idx) => (
                <div
                  key={key}
                  className="border border-neutral-200/40 rounded-lg bg-white p-4 h-64 flex flex-col items-center justify-center space-y-2"
                >
                  {graphUrls[key] ? (
                    <>
                      <img
                        src={graphUrls[key]}
                        alt={`Graph ${idx + 1}`}
                        className="object-contain max-h-full"
                      />
                      <button
                        onClick={() => window.open(graphUrls[key], "_blank")}
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
              ))}
            </div>

            {/* Auto-EDA Section */}
            <div className="mt-6 border border-neutral-200/40 rounded-lg bg-white p-6">
              <h3 className="text-lg font-medium text-neutral-800 mb-4">
                Automated Analysis
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="text-sm font-medium text-yellow-800">
                    Outliers Detected
                  </h4>
                  <p className="mt-1 text-sm text-yellow-700">
                    3 potential outliers found in the dataset
                  </p>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="text-sm font-medium text-blue-800">
                    Correlation Analysis
                  </h4>
                  <p className="mt-1 text-sm text-blue-700">
                    Strong positive correlation between variables A and B
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
