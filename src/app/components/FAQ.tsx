"use client";
import { motion } from "framer-motion";
import { Accordion, AccordionItem } from "@nextui-org/react";

const faqs = [
  {
    question: "How does AI interior design work?",
    answer: "Our AI analyzes your room photo and preferences to generate personalized design suggestions. It considers factors like room dimensions, lighting, and your chosen style to create realistic visualizations."
  },
  {
    question: "How accurate are the design previews?",
    answer: "Our AI generates highly realistic previews that maintain your room's structural elements while applying new design elements. The results are meant to give you a very close representation of how your space could look."
  },
  {
    question: "Can I customize the generated designs?",
    answer: "Yes! You can specify your preferred style, color schemes, and particular elements you'd like to include or exclude. Each generation can be further refined based on your feedback."
  },
  {
    question: "What types of rooms can I design?",
    answer: "You can design any indoor space including living rooms, bedrooms, kitchens, bathrooms, offices, and more. Our AI is trained on a wide variety of interior spaces."
  }
];

export default function FAQ() {
  return (
    <div className="py-20" id="faq">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-default-500">
            Everything you need to know about our AI interior design service
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion 
            variant="bordered"
            className="max-w-3xl mx-auto"
          >
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                aria-label={faq.question}
                title={faq.question}
                className="text-foreground"
              >
                <p className="text-default-500 pb-4">
                  {faq.answer}
                </p>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </div>
  );
} 