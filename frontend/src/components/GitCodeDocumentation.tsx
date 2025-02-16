import { RootState } from "@/store/store"
import { ApiRoutes } from "@/utils/routeApi"
import axios from "axios"
import type React from "react"
import { useState } from "react"
import { useSelector } from "react-redux"

interface Message {
  type: "system" | "user" | "assistant"
  content: string
}

export function GitCodeDocumentation  ()  {
  const [repoUrl, setRepoUrl] = useState<string>("")
  const [pdfUrl, setPdfUrl] = useState<string>("")
  const [messages, setMessages] = useState<Message[]>([
    { type: "system", content: "Repository analysis complete. How can I help you understand the codebase?" },
    { type: "user", content: "Can you explain the main functionality in main.py?" },
    {
      type: "assistant",
      content:
        "The main.py file contains the core application logic. Here's a breakdown:\n• Initializes the FastAPI application\n• Sets up middleware and authentication\n• Defines API endpoints for data processing",
    },
  ])
  const [inputMessage, setInputMessage] = useState<string>("")

  const {token} = useSelector((state: RootState)=>state.auth)

  const handleRepoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepoUrl(e.target.value)
  }

  const handleLoadRepo = async () => {
    console.log("Loading repository:", repoUrl)
    if(!repoUrl){
      console.log("Please enter a valid URL")
      return;
    }
    const formData = new FormData()
    formData.append("github" , repoUrl)
    try {
      const res = await axios.post(ApiRoutes.gitrepo , formData , {
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

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { type: "user", content: inputMessage }])
      setInputMessage("")
      // Implement AI response logic here
    }
  }

  return (
    <section id="git-assistant" className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-neutral-800">Git Repository Assistant</h1>
          <p className="text-neutral-600 mt-2">Analyze and understand your GitHub repositories with AI assistance</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Repository Input and File Tree */}
          <div className="lg:col-span-4 space-y-6">
            {/* Repository URL Input */}
            <div className="border border-neutral-200/40 rounded-lg bg-white p-6">
              <label className="block text-sm font-medium text-neutral-700">GitHub Repository URL</label>
              <div className="mt-2 flex space-x-2">
                <input
                  type="text"
                  placeholder="https://github.com/user/repo"
                  className="flex-1 rounded-md border border-neutral-200/40 px-4 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                  value={repoUrl}
                  onChange={handleRepoUrlChange}
                />
                <button
                  className="bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={handleLoadRepo}
                >
                  Load
                </button>
              </div>
            </div>

            {/* File Tree */}
            <div className="border border-neutral-200/40 rounded-lg bg-white">
              <div className="border-b border-neutral-200/40 px-4 py-3 flex justify-between items-center">
                <h3 className="text-sm font-medium text-neutral-700">Repository Structure</h3>
                <button className="text-neutral-400 hover:text-neutral-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className="p-4 max-h-[600px] overflow-y-auto">
                {/* File Tree Structure */}
                <ul className="space-y-2">
                  <li>
                    <div className="flex items-center text-sm">
                      <svg
                        className="w-4 h-4 mr-2 text-neutral-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                      <span className="text-neutral-700">src/</span>
                    </div>
                    <ul className="ml-6 mt-2 space-y-2">
                      <li className="flex items-center text-sm">
                        <svg
                          className="w-4 h-4 mr-2 text-neutral-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4"></path>
                        </svg>
                        <span className="text-blue-600">main.py</span>
                      </li>
                      <li className="flex items-center text-sm">
                        <svg
                          className="w-4 h-4 mr-2 text-neutral-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4"></path>
                        </svg>
                        <span className="text-neutral-700">utils.py</span>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>

            {/* Download PDF Button */}
            <div className="mt-4">
              <button 
                disabled={!pdfUrl}
                onClick={() => window.open(pdfUrl, "_blank")}
                className={`w-full rounded-lg px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  pdfUrl ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500" : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
              >
                Download PDF
              </button>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-8 border border-neutral-200/40 rounded-lg bg-white flex flex-col">
            <div className="border-b border-neutral-200/40 px-4 py-3">
              <h3 className="text-sm font-medium text-neutral-700">AI Chat Assistant</h3>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto max-h-[600px] space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-3 ${message.type === "user" ? "justify-end" : ""}`}
                >
                  {message.type !== "user" && (
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        ></path>
                      </svg>
                    </div>
                  )}
                  <div className={`flex-1 ${message.type === "user" ? "max-w-2xl" : ""}`}>
                    <div
                      className={`${message.type === "user" ? "bg-blue-50" : message.type === "assistant" ? "bg-neutral-50" : ""} p-3 rounded-lg`}
                    >
                      <p className="text-sm text-neutral-600 whitespace-pre-line">{message.content}</p>
                    </div>
                  </div>
                  {message.type === "user" && <div className="w-8 h-8 rounded-full bg-neutral-200"></div>}
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="border-t border-neutral-200/40 p-4">
              <div className="flex space-x-4">
                <input
                  type="text"
                  placeholder="Ask about the codebase..."
                  className="flex-1 rounded-md border border-neutral-200/40 px-4 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <button
                  className="bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={handleSendMessage}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GitCodeDocumentation

