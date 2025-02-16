import { RootState } from "@/store/store"
import { ApiRoutes } from "@/utils/routeApi"
import axios from "axios"
import type React from "react"
import { useState } from "react"
import { useSelector } from "react-redux"

export function CodeDocumentation()  {
  const [language, setLanguage] = useState<string>("python")
  const [detailLevel, setDetailLevel] = useState<boolean>(false)
  const [code, setCode] = useState<string>("")
  const [pdfUrl , setPdfUrl] = useState<string>("")

  const {token}= useSelector((state: RootState)=>state.auth)

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value)
  }

  const toggleDetailLevel = () => {
    setDetailLevel(!detailLevel)
  }

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value)
  }

  const formatCode = () => {
    console.log("Formatting code...")
  }

  const generateDocumentation = async () => {
    console.log("Generating documentation...")
    if(!code){
      console.log("Please paste your code")
      return;
    }
    const formdata= new FormData()
    formdata.append("code", code)
    try {
      const res = await axios.post(ApiRoutes.code , formdata , {
        headers:{
          Authorization: `Bearer ${token}`,
          "Content-Type" : "multipart/form-data"
        }
      })
      const data = res.data
      checkStatus(data.task_id)
    } catch (error) {
      console.log(error)
    }
  }

  const checkStatus= async(taskId :string)=>{
    const interval = setInterval(async()=>{
      const res = await axios.post(`http://localhost:8000/task-status/${taskId}`,{
        headers:{
          Authorization: `Bearer ${token}`,
        }
      })
      const data = res.data
  
      if(data.status === "COMPLETED"){
        setPdfUrl(data.pdf_url)
        clearInterval(interval)
      }
    }, 2000)
  }

  return (
    <section id="code-documentation" className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-neutral-800">Code Documentation</h1>
          <p className="text-neutral-600 mt-2">Generate comprehensive documentation for your code</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <div className="space-y-6">
            
            <div className="flex space-x-4">
              <select
                className="flex-1 rounded-md border border-neutral-200/40 px-4 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                value={language}
                onChange={handleLanguageChange}
              >
                <option value="python">Python</option>
                <option value="javascript">JavaScript</option>
                <option value="java">Java</option>
              </select>

              <div className="flex items-center space-x-2">
                <label className="text-sm text-neutral-700">Detail Level:</label>
                <div className="relative inline-block w-12 h-6">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    id="detail-toggle"
                    checked={detailLevel}
                    onChange={toggleDetailLevel}
                  />
                  <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  <span className="ml-2 text-sm font-medium text-neutral-700">Brief</span>
                </div>
              </div>
            </div>

       
            <div className="border border-neutral-200/40 rounded-lg bg-neutral-50">
              <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-200/40">
                <div className="flex space-x-2">
                  <button className="p-1 text-neutral-600 hover:text-neutral-900">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      ></path>
                    </svg>
                  </button>
                  <button className="p-1 text-neutral-600 hover:text-neutral-900">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                  </button>
                </div>
                <button className="text-sm text-neutral-600 hover:text-neutral-900" onClick={formatCode}>
                  Format Code
                </button>
              </div>
              <textarea
                className="w-full h-96 p-4 font-mono text-sm bg-neutral-50 focus:outline-none"
                placeholder="Paste your code here..."
                value={code}
                onChange={handleCodeChange}
              ></textarea>
            </div>

            <button
              className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={generateDocumentation}
            >
              Generate Documentation
            </button>
          </div>

     
          <div className="border border-neutral-200/40 rounded-lg bg-white">
            <div className="border-b border-neutral-200/40 p-4 flex justify-between items-center">
              <h3 className="text-sm font-medium text-neutral-700">Generated Documentation</h3>
              <div className="flex space-x-2">
                <button className="p-2 text-neutral-600 hover:text-neutral-900 rounded-md hover:bg-neutral-100">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    ></path>
                  </svg>
                </button>
                <button className="p-2 text-neutral-600 hover:text-neutral-900 rounded-md hover:bg-neutral-100">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

            <div className="p-4 space-y-4">
              <div className="border border-neutral-200/20 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-medium text-neutral-800">main()</h4>
                  <button className="text-neutral-400 hover:text-neutral-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                </div>
                <p className="mt-2 text-sm text-neutral-600">
                  Entry point of the application. Initializes core components and starts the main processing loop.
                </p>
                <div className="mt-3 text-sm">
                  <p className="text-neutral-500">Parameters:</p>
                  <ul className="mt-1 list-disc list-inside text-neutral-600">
                    <li>args (List[str]): Command line arguments</li>
                  </ul>
                </div>
              </div>

              <div className="border border-neutral-200/20 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-medium text-neutral-800">DataProcessor</h4>
                  <button className="text-neutral-400 hover:text-neutral-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                </div>
                <p className="mt-2 text-sm text-neutral-600">Handles data processing operations and transformations.</p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-yellow-800">Documentation Suggestions</h4>
                <ul className="mt-2 space-y-1 text-sm text-yellow-700">
                  <li>• Consider adding return type annotations</li>
                  <li>• Missing error handling documentation</li>
                </ul>
              </div>
            </div>
            <div className="p-4">
              <button
                className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!pdfUrl}
                onClick={() => window.open(pdfUrl, "_blank")}
              >
                Download Documentation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CodeDocumentation

