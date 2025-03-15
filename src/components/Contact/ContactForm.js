"use client";
import React from "react";
import { useForm } from "react-hook-form";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (result.success) {
        alert("Request submitted successfully!");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit the form.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-12 text-base xs:text-lg sm:text-xl font-medium leading-relaxed"
    >
      👋 Hello! My name is{" "}
      <input
        type="text"
        placeholder="Your name"
        {...register("name", { required: "Name is required", maxLength: 80 })}
        className="outline-none border-0 p-0 mx-2 focus:ring-0 placeholder:text-center placeholder:text-lg border-b border-gray 
        focus:border-gray bg-transparent"
      />
      and I have some questions about stock market trends. You can email me at{" "}
      <input
        type="email"
        placeholder="your@email.com"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^\S+@\S+$/i,
            message: "Invalid email format",
          },
        })}
        className="outline-none border-0 p-0 mx-2 focus:ring-0 placeholder:text-center placeholder:text-lg border-b border-gray 
        focus:border-gray bg-transparent"
      />
      or reach out to me on{" "}
      <input
        type="tel"
        placeholder="+1 123-456-7890"
        {...register("phone", {
          pattern: {
            value: /^[0-9+\-()\s]*$/,
            message: "Invalid phone number",
          },
        })}
        className="outline-none border-0 p-0 mx-2 focus:ring-0 placeholder:text-center placeholder:text-lg border-b border-gray 
        focus:border-gray bg-transparent"
      />
      Here are some details about my stock market query: <br />
      <textarea
        {...register("details", { required: "Details are required" })}
        placeholder="I'm interested in learning more about..."
        rows={4}
        className="w-full outline-none border-0 p-0 mx-0 focus:ring-0 placeholder:text-lg border-b border-gray 
        focus:border-gray bg-transparent"
      />
      <div className="mt-4 text-red-500">
        {errors.name && <p>{errors.name.message}</p>}
        {errors.email && <p>{errors.email.message}</p>}
        {errors.phone && <p>{errors.phone.message}</p>}
        {errors.details && <p>{errors.details.message}</p>}
      </div>
      <input
        type="submit"
        value="Submit Request"
        className="mt-8 font-medium inline-block capitalize text-lg sm:text-xl py-2 sm:py-3 px-6 sm:px-8 border-2 border-solid border-dark dark:border-light rounded cursor-pointer hover:bg-gray-100 transition"
      />
    </form>
  );
}
