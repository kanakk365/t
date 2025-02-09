import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion";
import * as AccordionPrimitive from "@radix-ui/react-accordion";

import { Plus } from "lucide-react";

const items = [
  {
    id: "1",
    title: "What file formats are supported?",
    content:
      "We support a wide range of formats including .csv, .xlsx for data files, .docx, .pdf, .txt for documents, and most popular programming languages for code documentation. Output formats include .docx, .pdf, .jpg, and .png.",
  },
  {
    id: "2",
    title: "How secure is my data?",
    content:
      "We prioritize data security with end-to-end encryption, secure cloud storage, and compliance with industry standards. Our AI models are fine-tuned for privacy, and we never store your sensitive information.",
  },
  {
    id: "3",
    title: "Can i customize the output templates?",
    content:
      "Yes! You can upload your own templates and styling guidelines. Our platform will maintain your brand consistency while automating the document generation process.",
  },
  {
    id: "4",
    title: "What kind of support do you offer?",
    content:
      "Yes! You can upload your own templates and styling guidelines. Our platform will maintain your brand consistency while automating the document generation process.",
  },
];

export default function Faq() {
  return (
    <div className="space-y-4 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
      <h2 className="text-2xl text-center font-semibold text-[#cb4363]">FAQs</h2>
      <p className="text-center mb-5">Get answers to common questions about our AI automation platform</p>
      <Accordion type="single" collapsible className="w-full" defaultValue="3">
        {items.map((item) => (
          <AccordionItem value={item.id} key={item.id} className="py-2">
            <AccordionPrimitive.Header className="flex">
              <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between py-2 text-left text-[15px] font-semibold leading-6 transition-all [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0 [&[data-state=open]>svg]:rotate-180">
                {item.title}
                <Plus
                  size={16}
                  strokeWidth={2}
                  className="shrink-0 opacity-60 transition-transform duration-200"
                  aria-hidden="true"
                />
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>
            <AccordionContent className="pb-2 text-muted-foreground">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
