"use client";

import { LoginInput } from "@/../../@ticketApp/codegen/dist";
import { GenericForm, GenericFormProps } from "@/components";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const router = useRouter();

  const formProps: GenericFormProps<LoginInput> = {
    action: "create",
    onCanceled: () => {},
    onSubmit: async data => {
      fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      router.push("/app/the-organisation/canto/tasks");
    },
    fields: [
      {
        name: "email",
        label: "Email",
        type: "email",
        required: true,
      },
      {
        name: "password",
        label: "Mot de passe",
        type: "password",
        required: true,
      },
    ],
  };

  return <GenericForm {...formProps} />;
};
