"use client";

import React, { useState, useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { createPitch } from "../lib/actions";

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");
  const router = useRouter();

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch,
      };

      await formSchema.parseAsync(formValues);

      const result = await createPitch(prevState, formData, pitch);

      if (result.status === "SUCCESS") {
        router.push(`/startup/${result._id}`);
      }

      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as Record<string, string>);

        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }

      return {
        ...prevState,
        error: "An unexpected error has occurred",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f4ff] to-[#e4ecff] flex items-center justify-center px-4 py-10 text-black">
      <form
        action={formAction}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl px-10 py-12 space-y-8"
      >
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-indigo-600">
            🚀 Share Your Startup Idea
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Submit your project to inspire and collaborate
          </p>
        </div>

        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title
          </label>
          <Input
            id="title"
            name="title"
            className="w-full"
            required
            placeholder="Ex: Smart Health Tracker"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <Textarea
            id="description"
            name="description"
            rows={3}
            className="w-full"
            required
            placeholder="Short description of your startup"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category
            </label>
            <Input
              id="category"
              name="category"
              className="w-full"
              required
              placeholder="e.g. Tech, Health, Education"
            />
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category}</p>
            )}
          </div>

          <div className="flex-1">
            <label
              htmlFor="link"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Image URL
            </label>
            <Input
              id="link"
              name="link"
              className="w-full"
              required
              placeholder="Paste image link here"
            />
            {errors.link && (
              <p className="text-red-500 text-sm">{errors.link}</p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="pitch"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Detailed Pitch (Markdown Supported)
          </label>
          <div className="rounded-xl border border-gray-300 overflow-hidden shadow-sm">
            <MDEditor
              value={pitch}
              onChange={(value) => setPitch(value || "")}
              preview="edit"
              height={300}
              textareaProps={{
                placeholder: "Elaborate on your project idea...",
              }}
              previewOptions={{
                disallowedElements: ["style"],
              }}
            />
          </div>
          {errors.pitch && (
            <p className="text-red-500 text-sm">{errors.pitch}</p>
          )}
        </div>

        <div className="text-right">
          <Button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full shadow-md font-medium flex items-center gap-2"
            disabled={isPending}
          >
            {isPending ? "Submitting..." : "Submit"}
            <Send size={16} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default StartupForm;
