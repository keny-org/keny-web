"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is KENY?",
    answer:
      "KENY is an AI-powered platform that transforms your study materials (PDFs, photos, notes) into interactive quizzes to help you validate your knowledge.",
  },
  {
    question: "How does the AI work?",
    answer:
      "Our advanced AI analyzes your uploaded content and automatically generates relevant questions and answers, ensuring they are perfectly tailored to what you're studying.",
  },
  {
    question: "Is it free to use?",
    answer:
      "KENY offers a free tier with essential features. For unlimited access and advanced tools, we offer subscription plans.",
  },
  {
    question: "Which file formats are supported?",
    answer:
      "You can upload PDFs, images of handwritten notes, or simply paste text directly into the app.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-24 bg-background">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest uppercase text-primary mb-4">
            FAQ
          </h2>
          <p className="text-3xl md:text-4xl font-black tracking-tight">
            Frequently Asked Questions
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-semibold">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
