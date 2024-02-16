"use client";
import { ReactNode, useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { Button } from "../../button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../form";
import { Input } from "../../input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../select";
import { Textarea } from "../../textarea";
import { toast } from "../../use-toast";
import { City, FAQ } from "@/types/type";
import { generateFAQs, saveFAQs } from "@/lib/service";
import { Loader } from "lucide-react";

const faqFormSchema = z.object({
  prompt: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
});

type FaqsFormValues = z.infer<typeof faqFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<FaqsFormValues> = {
  prompt: "",
};

export function FaqForm({ city }: { city: City }) {
  const [faqs, setFaqs] = useState<FAQ[] | undefined>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const form = useForm<FaqsFormValues>({
    resolver: zodResolver(faqFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function handleGenerateNew() {
    setLoading(true);
    const result = await generateFAQs(city.city);
    console.log("RESULT", result);
    if (result.success) {
      setFaqs(result.data);
      setLoading(false);
    } else {
      setLoading(false);
      toast({
        title: "Error",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{result?.error as ReactNode}</code>
          </pre>
        ),
      });
    }
  }

  async function onSubmit() {
    if (faqs) {
      const payload = {
        faqs,
        cityId: city.id,
      };
      setLoading(true);
      const result = await saveFAQs(payload);
      if (result.success) {
        toast({
          title: "FAQs saved",
          description: (
            <p className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">Saved</p>
          ),
          variant: "success",
        });
        setLoading(false);
      } else {
        setLoading(false);
        toast({
          title: "Error",
          description: (
            <p className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              Something went wrong
            </p>
          ),
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Error",
        description: (
          <p className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            No FAQs to save
          </p>
        ),
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex flex-col space-y-4 pt-4 justify-center items-center">
      <h1 className="text-2xl font-bold">Frequently Asked Questions</h1>
      <Accordion type="single" collapsible className="w-full">
        {(!loading &&
          faqs?.map((faq, index) => {
            return (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            );
          })) || (
          <div className="flex h-[400px] items-center justify-center ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-12 h-12 animate-spin"
              viewBox="0 0 16 16"
            >
              <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
              <path d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z" />
            </svg>
          </div>
        )}
      </Accordion>

      <div className="flex space-x-2 justify-center items-center">
        {faqs && faqs?.length > 0 && <Button onClick={onSubmit}>Save</Button>}

        <Button onClick={handleGenerateNew}>Generate new</Button>
      </div>
    </div>
  );
}
