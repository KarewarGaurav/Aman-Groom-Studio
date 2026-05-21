"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionWrapper } from "@/components/common/SectionWrapper";

const faqs = [
  {
    q: "How long does bespoke tailoring take?",
    a: "Our bespoke process typically requires 6–8 weeks from first consultation to final delivery. Rush services may be available for select dates.",
  },
  {
    q: "Do you offer styling for the entire wedding party?",
    a: "Yes. We provide coordinated styling for groomsmen, family, and reception ensembles with dedicated group consultations.",
  },
  {
    q: "Can I visit without an appointment?",
    a: "Walk-ins are welcome during boutique hours, though we recommend booking for personalized attention during peak wedding season.",
  },
  {
    q: "What is your alteration policy?",
    a: "Bespoke clients receive lifetime alterations on their primary ensemble. Ready-to-wear pieces include one complimentary fitting adjustment.",
  },
];

export function FAQSection() {
  return (
    <SectionWrapper id="faq" label="Questions" title="Frequently Asked" align="center">
      <Accordion type="single" collapsible className="mx-auto max-w-2xl w-full">
        {faqs.map((faq, i) => (
          <AccordionItem key={faq.q} value={`item-${i}`}>
            <AccordionTrigger>{faq.q}</AccordionTrigger>
            <AccordionContent>{faq.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </SectionWrapper>
  );
}
