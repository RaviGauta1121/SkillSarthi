"use client";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/UI2/form";
import { Input } from "@/components/UI2/input";
import { Textarea } from "@/components/UI2/textarea";
import { LocateIcon, Mail, MailCheck, Phone } from "lucide-react";
import { Button } from "@/components/UI2/button";

const FormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  subject: z.string(),
  message: z.string().min(8, {
    message: "Username must be at least 8 characters.",
  }),
});
export default function ContactPage() {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(data) {
    console.log(data);
    try {
      const response = await fetch("/api/mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        console.log(result.message); // Handle success
        alert("Your message has been sent successfully!");
      } else {
        console.error(result.error); // Handle error
        alert("Failed to send the message.");
      }
    } catch (error) {
      console.error("Error:", error); // Handle network error
      alert("An error occurred while sending your message.");
    }
  }

  return (
    <main className="h-full flex flex-col gap-12 p-4 w-full mt-4 md:mt-0 relative">
      <section className="h-full w-full min-h-[60vh] relative flex  flex-col items-center justify-center  bg-black rounded-[40px]">
        <span className="h-[360px] w-[360px] bg-transparent pointer-events-none border-[12px] rounded-[40px] top-40 right-20 border-yellow-300 absolute rotate-45" />
        <div className="max-w-3xl flex flex-col items-center z-10">
          <h2 className="text-white text-center text-4xl ld:text-6xl font-extrabold">
            About secret weapon
          </h2>
          <p className="text-neutral-300 text-center mt-4 text-xs md:text-base px-4 max-w-lg">
            Begin your journey with us – reach out and let’s create something
            extraordinary together!.
          </p>
        </div>
      </section>
      <section>
        <h2 className="text-center py-16 font-extrabold text-4xl">
          Get in touch
        </h2>
        <div className="flex flex-col lg:flex-row gap-4 w-full max-w-7xl mx-auto ">
          <div className="flex-[2] flex py-12 items-center justify-center bg-gradient-to-tr from-slate-100 to-white px-4 rounded-[40px]">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full max-w-lg space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="space-y-0.5">
                      {/* <FormLabel>Name</FormLabel> */}
                      <FormControl>
                        <Input
                          placeholder="name"
                          className="rounded-3xl"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-0.5">
                      {/* <FormLabel>Email</FormLabel> */}
                      <FormControl>
                        <Input
                          placeholder="email"
                          className="rounded-3xl"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem className="space-y-0.5">
                      {/* <FormLabel>Subject</FormLabel> */}
                      <FormControl>
                        <Input
                          placeholder="subject"
                          className="rounded-3xl"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="space-y-0.5">
                      {/* <FormLabel>Message</FormLabel> */}
                      <FormControl>
                        <Textarea
                          rows={8}
                          placeholder="message"
                          className="rounded-3xl"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="rounded-3xl">
                  Submit
                </Button>
              </form>
            </Form>
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex-1 flex bg-slate-100 rounded-[40px] items-center justify-center">
              {/* <Image
                src="/contact-box-img.jpg" // Update this to the path of your image
                alt="Description of image"
                width={500} // Adjust width as needed
                height={300} // Adjust height as needed
                className="rounded-[40px]"
              /> */}
            </div>

            <div className="flex-1 flex flex-col gap-2 rounded-[40px] items-start justify-center">
              <div className="p-4 flex gap-3 bg-blue-100 w-full rounded-3xl">
                <LocateIcon size={20} className="" />
                <h3>Kolhapur, Maharashtra, India</h3>
              </div>

              <div className="p-4 flex gap-3 bg-blue-100 w-full rounded-3xl ">
                <Phone size={20} className="" />
                <h3>+91 9370112985</h3>
              </div>
              <div className="p-4 flex gap-3 bg-blue-100 w-full rounded-3xl">
                <Phone size={20} className="" />
                <h3>+91 9023797391 </h3>
              </div>
              <div className="p-4 flex gap-3 bg-blue-100 w-full rounded-3xl">
                <MailCheck size={20} className="" />
                <h3>support@secretweapon.in</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
