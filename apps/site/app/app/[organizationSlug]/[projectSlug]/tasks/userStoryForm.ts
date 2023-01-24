import { Field, GenericFormProps } from "@/components/index";
import {
  CreateUserStoryInput,
  GetProjectByIdQuery,
  UpdateUserStoryInput,
} from "@ticketApp/codegen";
import { sdk } from "utils/sdk";

type ExtractType<T, U extends keyof T> = T[U];
type ExtractArrayType<T, U extends keyof T> = T[U] extends Array<infer V>
  ? V
  : never;

export const createUserStoryFormProps: (input: {
  personas: ExtractType<
    ExtractType<GetProjectByIdQuery, "project">,
    "personasList"
  >;
  epicId: string;
  existingUserStorys: ExtractType<
    ExtractArrayType<ExtractType<GetProjectByIdQuery, "project">, "epicsList">,
    "userStoriesList"
  >;
}) => Omit<
  GenericFormProps<CreateUserStoryInput>,
  "onCanceled" | "onDelete" | "onSuccess"
> = ({ personas, epicId, existingUserStorys }) => {
  const fields: Field<CreateUserStoryInput>[] = [
    {
      name: "userStory.epicId",
      type: "text",
      hidden: true,
      label: "User story",
      initialValue: epicId,
    },
    {
      name: "userStory.name",
      label: "Name",
      type: "text",
      required: true,
    },
    /*   {
        name: "task.parentId",
        label: "Parent  task",
        type: "select",
        required: false,
        options: [
          { label: "None", value: "" },
          ...existingTasks?.map(task => ({
            label: task.name,
            value: task.id,
          })),
        ],
      }, */
    {
      name: "userStory.asA",
      label: "En tant que",
      type: "select",
      required: true,
      options: personas?.map(x => ({ label: x.name, value: x.id })),
    },
    {
      name: "userStory.iWant",
      label: "Je veux",
      type: "textarea",
      required: true,
    },
    {
      name: "userStory.soThat",
      label: "Pour",
      type: "textarea",
      required: true,
    },
    {
      name: "userStory.comments",
      label: "Commentaires",
      type: "text",
    },
    {
      name: "userStory.parentId",
      label: "Parent  userStory",
      type: "select",
      required: false,
      options: [
        { label: "None", value: "" },
        ...existingUserStorys?.map(userStory => ({
          label: userStory.name,
          value: userStory.id,
        })),
      ],
    },
  ];
  return {
    async onSubmit(data) {
      await sdk.CreateUserStory({ input: data });
    },
    action: "create",
    fields,
  };
};

export const updateUserStoryFormProps: (input: {
  personas: ExtractType<
    ExtractType<GetProjectByIdQuery, "project">,
    "personasList"
  >;
  userStory: ExtractArrayType<
    ExtractArrayType<ExtractType<GetProjectByIdQuery, "project">, "epicsList">,
    "userStoriesList"
  >;
  existingUserStorys: ExtractType<
    ExtractArrayType<ExtractType<GetProjectByIdQuery, "project">, "epicsList">,
    "userStoriesList"
  >;
}) => Omit<
  GenericFormProps<UpdateUserStoryInput>,
  "onCanceled" | "onDelete" | "onSuccess"
> = ({
  personas,

  userStory,
  existingUserStorys,
}) => {
  const fields: Field<UpdateUserStoryInput>[] = [
    {
      name: "id",
      type: "text",
      hidden: true,
      label: "Id",
      initialValue: userStory.id,
    },

    {
      name: "patch.epicId",
      type: "text",
      hidden: true,
      label: "User story",
      initialValue: userStory.epicId,
    },
    {
      name: "patch.name",
      label: "Name",
      type: "text",
      required: true,
      initialValue: userStory.name,
    },
    {
      name: "patch.asA",
      label: "En tant que",
      type: "text",
      required: true,
      initialValue: userStory.asA,
    },
    {
      name: "patch.iWant",
      label: "Je veux",
      type: "textarea",
      required: true,
      initialValue: userStory.iWant,
    },
    {
      name: "patch.soThat",
      label: "Pour",
      type: "textarea",
      required: true,
      initialValue: userStory.soThat,
    },
    {
      name: "patch.comments",
      label: "Commentaires",
      type: "text",
      initialValue: userStory.comments,
    },
    {
      name: "patch.parentId",
      label: "Parent  userStory",
      type: "select",
      required: false,
      initialValue: userStory.parentId,
      options: [
        { label: "None", value: "" },
        ...existingUserStorys?.map(us => ({
          label: us.name,
          value: us.id,
        })),
      ],
    },
  ];
  return {
    async onSubmit(data) {
      await sdk.UpdateUserStory({ input: data });
    },
    action: "update",
    fields,
  };
};
