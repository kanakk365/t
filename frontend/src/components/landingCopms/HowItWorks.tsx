import type React from "react"; // Import React
import { PulsatingButton } from "../ui/pulsating-button";

export default function HowItWorks() {
  return (
    <section id="howItWorks" className="py-20 bg-[#f5f5f5] text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate__animated animate__fadeIn">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1d293d]">How It Works</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Transform your files into structured outputs in three simple steps
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-[#cb4363] transform -translate-y-1/2"></div>

          <div className="grid lg:grid-cols-3 gap-12 relative z-10">
            <StepCard
              number={1}
              title="Upload Your Files"
              description="Simply drag and drop your files - data, documents, or code. We support multiple formats."
              color="blue"
              delay="animate__delay-1s"
            >
              <div className="bg-neutral-100/50 rounded-lg p-4 mt-4">
                <div className="flex items-center justify-center border-2 border-dashed border-neutral-300 rounded-lg p-4">
                  <svg className="w-8 h-8 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>
              </div>
            </StepCard>

            <StepCard
              number={2}
              title="Choose Format"
              description="Select your desired output format and customize templates to match your needs."
              color="purple"
              delay="animate__delay-2s"
            >
              <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="bg-neutral-100/50 rounded-lg p-2 text-center text-sm">.docx</div>
                <div className="bg-neutral-100/50 rounded-lg p-2 text-center text-sm">.pdf</div>
                <div className="bg-neutral-100/50 rounded-lg p-2 text-center text-sm">.jpg</div>
                <div className="bg-neutral-100/50 rounded-lg p-2 text-center text-sm">.png</div>
              </div>
            </StepCard>

            <StepCard
              number={3}
              title="Generate Output"
              description="Click generate and let our AI process your files into perfectly formatted outputs."
              color="#cb4363"
              delay="animate__delay-3s"
            >
              <div className="mt-4">
                <PulsatingButton className="w-full font-semibold text-lg">Get Started Now</PulsatingButton>
              </div>
            </StepCard>
          </div>
        </div>

        {/* Bottom Call to Action */}
      </div>
    </section>
  );
}

interface StepCardProps {
  number: number;
  title: string;
  description: string;
  color: "blue" | "purple" | "#cb4363";
  delay: string;
  children: React.ReactNode;
}

function StepCard({ number, title, description, color, delay, children }: StepCardProps) {
  const bgColor = `bg-${color}-600/10`;
  const textColor = `text-[${color}]`;

  return (
    <div
      className={`bg-white shadow-lg rounded-xl p-8 transition-transform hover:-translate-y-2 animate__animated animate__fadeInLeft ${delay}`}
    >
      <div className={`${bgColor} w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto`}>
        <span className={`text-2xl font-bold ${textColor}`}>{number}</span>
      </div>
      <h3 className="text-xl font-semibold text-center mb-4">{title}</h3>
      <p className="text-neutral-600 text-center mb-4">{description}</p>
      {children}
    </div>
  );
}
