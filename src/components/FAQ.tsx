"use client";

import TextPressure from "./ui/TextPressure";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  const faqs = [
    {
      question: "Are these software courses suitable for freshers?",
      answer:
        "Yes, our courses are planned from basic to advanced levels, making them suitable for freshers as well as industry professionals.",
    },
    {
      question: "Is practical training included in your courses?",
      answer:
        "Yes, we provide practical training with real-time live projects to ensure better understanding and hands-on experience.",
    },
    {
      question: "Is placement support available at CODE IT?",
      answer:
        "Yes, we offer complete placement assistance to help students begin their professional journey with confidence.",
    },
    {
      question: "What is the duration of your software courses?",
      answer:
        "Most of our courses run between 2 to 6 months, depending on the course structure and learning mode.",
    },
    {
      question: "Are online and offline classes available at CODE IT?",
      answer:
        "Yes, we provide both online and offline classes in Pune to ensure flexible learning options for students.",
    },
    {
      question: "What are the fees for Data Science courses in Pune?",
      answer:
        "Data Science course fees depend on the course level, duration, and training mode. Please contact us for detailed fee information.",
    },
  ];

  return (
    <section className="relative py-20 md:py-32 bg-stone-50 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgb(0 0 0) 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Heading */}
        <div className="mb-16 flex flex-col items-center text-center">
          <div className="relative h-[200px] md:h-[260px] flex items-center justify-center w-full">
            <TextPressure
              text="FAQs"
              flex
              alpha={false}
              stroke={false}
              width
              weight
              italic
              textColor="#111827"
              strokeColor="#059669"
              minFontSize={48}
            />
          </div>

          <p className="mt-6 max-w-2xl text-base md:text-lg text-gray-600 leading-relaxed">
            Frequently asked questions to help you understand our courses,
            training approach, and learning options.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index + 1}`}
                className="bg-white border border-stone-200 rounded-xl px-6 data-[state=open]:border-emerald-500/50 transition-all duration-300"
              >
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-emerald-600 transition-colors py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}