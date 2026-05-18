"use client";

import { FeedbackFormCard } from "@/components/feedback/feedback-form-card";
import { FeedbackSuccessCard } from "@/components/feedback/feedback-success-card";
import { useFeedbackForm } from "@/hooks/use-feedback-form";

export default function FeedbackPage() {
  const {
    formData,
    isSubmitting,
    isSuccess,
    handleSubmit,
    handleReset,
    updateField,
  } = useFeedbackForm();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
      {isSuccess ? (
        <FeedbackSuccessCard onReset={handleReset} />
      ) : (
        <FeedbackFormCard
          formData={formData}
          isSubmitting={isSubmitting}
          handleSubmit={handleSubmit}
          updateField={updateField}
        />
      )}
    </div>
  );
}
