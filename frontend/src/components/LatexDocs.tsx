"use client";
import { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import axios from "axios";
import { ApiRoutes } from "@/utils/routeApi";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { AIInputWithLoading } from "./ui/ai-input-with-loading";


export function LatexDocs() {
  const [file, setFile] = useState<File[]>([]);
  const [desiredFormat, setDesiredFormat] = useState<string>("");
  const [latexSpecifics, setLatexSpecifics] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [customFormate, setCustomFormate] = useState<File | null>(null);
  const [latexCode, setLatexCode] = useState("");
  const [pdfUrl, setPdfUrl] = useState<string>("");
  // const [message , setMessage] = useState<{role: "user" | "ai"; text:string}[]>([])

  const {token} = useSelector((state: RootState)=> state.auth)

  const handleChatSubmit = async ( inputValue: string )=>{
    setIsProcessing(true);
    const formData = new FormData()

    formData.append("latex", latexCode)
    formData.append("chatInput", inputValue)

    try {
      const res = await axios.post("dontknow", formData , {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        }
      })

      const data = res.data 

      checkStatus(data.task_id);
      setIsProcessing(false);
    } catch (error) {
      console.log(error)
      setIsProcessing(false);
    }
  }

  const handleFileUpload = (selectedFiles: File[]) => {
    if (selectedFiles.length > 0) {
      setFile(selectedFiles);
    }
  };

  const handleCustomFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCustomFormate(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    setIsProcessing(true);
    if (!file) {
      console.log("No file selected");
      return;
    }

    const formData = new FormData();

    file.forEach((file) => {
      formData.append("file", file);
    });
    formData.append("desiredFormat", desiredFormat);
    formData.append("latexSpecifics", latexSpecifics);

    if (latexSpecifics === "Custom" && customFormate) {
      formData.append("custom", customFormate);
    }

    try {
      const res = await axios.post(ApiRoutes.sendDoc, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      const data = res.data;
      checkStatus(data.task_id);
      setIsProcessing(false);
    } catch (error) {
      setIsProcessing(false);
      console.error("Error uploading file", error);
    }
  };

  const checkStatus = async (taskId: string) => {
    const interval = setInterval(async () => {
      const res = await axios.post(`http://localhost:8000/task-status/${taskId}`,{
        headers:{
          Authorization: `Bearer ${token}`,
        }
      });
      const data = res.data;

      if (data.status === "COMPLETED") {
        setLatexCode(data.latex_code);
        setPdfUrl(data.pdf_url);
        clearInterval(interval);
      }
    }, 2000);
  };



  return (
    <section id="document-formatter" className="p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-neutral-800">
            Document Formatter
          </h1>
          <p className="text-neutral-600 mt-2">
            Convert your documents to LaTeX format with AI assistance
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <FileUpload onChange={handleFileUpload} />

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700">
                  Desired Format
                </label>
                <input
                  type="text"
                  placeholder="e.g., IEEE paper, letter"
                  className="mt-1 block w-full rounded-md border border-neutral-200/40 px-4 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                  value={desiredFormat}
                  onChange={(e) => setDesiredFormat(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700">
                  LaTeX Specifics
                </label>
                <select
                  className="mt-1 block w-full rounded-md border border-neutral-200/40 px-4 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                  value={latexSpecifics}
                  onChange={(e) => setLatexSpecifics(e.target.value)}
                >
                  <option>Select options...</option>
                  <optgroup label="Font Styles">
                    <option>Computer Modern</option>
                    <option>Times New Roman</option>
                    <option>Helvetica</option>
                  </optgroup>
                  <optgroup label="Citation Formats">
                    <option>IEEE</option>
                    <option>APA</option>
                    <option>MLA</option>
                  </optgroup>
                  <optgroup label="Section Presets">
                    <option>Academic Paper</option>
                    <option>Technical Report</option>
                    <option>Business Letter</option>
                    <option>Custom</option>
                  </optgroup>
                </select>
              </div>
              {latexSpecifics === "Custom" && (
                <div>
                  <label className="block text-sm font-medium text-neutral-700">
                    Upload Custom LaTeX File
                  </label>
                  <input
                    type="file"
                    className="mt-1 block w-full"
                    onChange={handleCustomFileUpload}
                  />
                </div>
              )}

              <button
                className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={handleSubmit}
              >
                Generate LaTeX
              </button>
            </div>
          </div>

          <div className="border border-neutral-200/40 rounded-lg bg-white h-">
            <div className="border-b border-neutral-200/40 px-4 py-3 flex justify-between items-center">
              <h3 className="text-sm font-medium text-neutral-700">
                Generated LaTeX Code
              </h3>
              <div className="flex space-x-2 ">
                <button className="p-2 text-neutral-600 hover:text-neutral-900 rounded-md hover:bg-neutral-100">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    ></path>
                  </svg>
                </button>
                <button className="p-2 text-neutral-600 hover:text-neutral-900 rounded-md hover:bg-neutral-100">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-4 overflow-y-auto h-[92%] flex justify-between flex-col">
              <pre className="bg-neutral-50 rounded-md p-4 text-sm font-mono text-neutral-800 overflow-y-auto h-full">
                {latexCode}
              </pre>
              <AIInputWithLoading onSubmit={handleChatSubmit} />
              
            </div>
            
          </div>
        </div>

        {isProcessing && (
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-blue-400 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  Processing document
                </h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>
                    Analyzing document structure and applying format rules...
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6">
          <button
            className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!pdfUrl}
            onClick={() => window.open(pdfUrl, "_blank")}
          >
            Download PDF
          </button>
        </div>
      </div>
    </section>
  );
}
