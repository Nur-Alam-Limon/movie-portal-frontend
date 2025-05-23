"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="w-full text-white">
      <main className="container mx-auto py-16 px-4">
        {/* Header */}
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold text-blue-400 mb-4">Contact Us</h1>
          <p className="text-lg max-w-3xl mx-auto text-gray-500">
            Have questions, feedback, or just want to say hello? We’d love to
            hear from you! Reach out through the form below, and we’ll get back
            to you as soon as possible.
          </p>
        </section>

        {/* Form + Illustration */}
        <section className="grid md:grid-cols-2 gap-12 items-stretch mb-20">
          {/* Illustration */}
          <div className="flex items-center justify-center">
            <Image
              src="https://img.freepik.com/free-vector/contact-us-concept-illustration_114360-2299.jpg?uid=R8647428&ga=GA1.1.805615852.1737822151&semt=ais_hybrid&w=740"
              alt="Contact Us Illustration"
              width={700}
              height={500}
              className="rounded-xl shadow-md object-cover"
            />
          </div>

          {/* Form */}
          <div className="flex items-center">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="w-full bg-white dark:bg-[#2A2A2A] p-8 rounded-xl shadow-md space-y-6 border border-gray-200 dark:border-gray-700"
            >
              {/* Form Caption */}
              <div className="text-center mb-4">
                <h2 className="text-3xl font-semibold text-blue-500 mb-3">
                  Get In Touch
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm pb-4">
                  Fill out the form and we’ll get back to you shortly.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name" className="text-black dark:text-white mb-3 text-md">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  className="bg-white dark:bg-[#1F1F1F] text-black dark:text-white border-gray-300 dark:border-gray-600"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-black dark:text-white mb-3 text-md">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="bg-white dark:bg-[#1F1F1F] text-black dark:text-white border-gray-300 dark:border-gray-600"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="message"
                  className="text-black dark:text-white mb-3 text-md"
                >
                  Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Your message"
                  rows={4}
                  className="bg-white dark:bg-[#1F1F1F] text-black dark:text-white border-gray-300 dark:border-gray-600"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600"
              >
                Send Message
              </Button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
