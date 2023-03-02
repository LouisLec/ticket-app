import { Field, GenericFormProps } from "@/components/index";
import {
  CreateTaskInput,
  GetProjectByIdQuery,
  TaskStatus,
  UpdateTaskInput,
} from "@ticketApp/codegen";
import { sdk } from "@/utils/sdk/sdk";

type ExtractType<T, U extends keyof T> = T[U];
type ExtractArrayType<T, U extends keyof T> = T[U] extends Array<infer V>
  ? V
  : never;

export const createTaskFormProps: (input: {
  domains: ExtractType<
    ExtractType<GetProjectByIdQuery, "project">,
    "domainsList"
  >;
  userStoryId: string;
  existingTasks: ExtractType<
    ExtractArrayType<
      ExtractArrayType<
        ExtractType<GetProjectByIdQuery, "project">,
        "epicsList"
      >,
      "userStoriesList"
    >,
    "tasksList"
  >;
}) => Omit<
  GenericFormProps<CreateTaskInput>,
  "onCanceled" | "onDelete" | "onSuccess"
> = ({ domains, userStoryId, existingTasks }) => {
  return {
    async onSubmit(data) {
      await sdk().CreateTask({ input: data });
    },
    action: "create",
    fields: [
      {
        name: "task.userStoryId",
        type: "text",
        hidden: true,
        label: "User story",
        initialValue: userStoryId,
      },
      {
        name: "task.name",
        label: "Name",
        type: "text",
        required: true,
      },
      {
        name: "task.description",
        label: "Description",
        type: "textarea",
        required: true,
      },
      {
        name: "task.status",
        label: "Status",
        type: "select",
        options: Object.values(TaskStatus)?.map(status => ({
          label: status,
          value: status,
        })),

        required: true,
      },
      {
        name: "task.uncertainty",
        type: "number",
        label: "Uncertainty",
        required: true,
      },
      {
        name: "task.estimate",
        type: "number",
        label: "Estimate",
        required: true,
      },
      {
        name: "task.domainId",
        label: "Domain",
        type: "select",
        required: true,
        options: domains?.map(domain => ({
          label: domain.name,
          value: domain.id,
        })),
      },
      {
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
      },
    ],
  };
};

export const updateTaskFormProps: (input: {
  domains: ExtractType<
    ExtractType<GetProjectByIdQuery, "project">,
    "domainsList"
  >;
  task: ExtractArrayType<
    ExtractArrayType<
      ExtractArrayType<
        ExtractType<GetProjectByIdQuery, "project">,
        "epicsList"
      >,
      "userStoriesList"
    >,
    "tasksList"
  >;
  existingTasks: ExtractType<
    ExtractArrayType<
      ExtractArrayType<
        ExtractType<GetProjectByIdQuery, "project">,
        "epicsList"
      >,
      "userStoriesList"
    >,
    "tasksList"
  >;
}) => Omit<
  GenericFormProps<UpdateTaskInput>,
  "onCanceled" | "onDelete" | "onSuccess"
> = ({
  domains,

  task,
  existingTasks,
}) => {
  const fields: Field<UpdateTaskInput>[] = [
    {
      name: "id",
      type: "text",
      hidden: true,
      label: "Id",
      initialValue: task.id,
    },
    {
      name: "patch.userStoryId",
      type: "text",
      hidden: true,
      label: "User story",
      initialValue: task?.userStoryId,
    },
    {
      name: "patch.name",
      label: "Name",
      type: "text",
      required: true,
      initialValue: task.name,
    },
    {
      name: "patch.description",
      label: "Description",
      type: "textarea",
      required: true,
      initialValue: task.description,
    },
    {
      name: "patch.status",
      label: "Status",
      type: "select",
      options: Object.values(TaskStatus)?.map(status => ({
        label: status,
        value: status,
      })),

      required: true,
      initialValue: task.status,
    },
    {
      name: "patch.uncertainty",
      type: "number",
      label: "Uncertainty",
      required: true,
      initialValue: task.uncertainty,
    },
    {
      name: "patch.estimate",
      type: "number",
      label: "Estimate",
      required: true,
      initialValue: task.estimate,
    },
    {
      name: "patch.domainId",
      label: "Domain",
      type: "select",
      required: true,
      options: domains?.map(domain => ({
        label: domain.name,
        value: domain.id,
      })),
      initialValue: task?.domain?.id,
    },
    {
      name: "patch.parentId",
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
      initialValue: task?.parentId,
    },
  ];
  return {
    async onSubmit(data) {
      await sdk().UpdateTask({ input: data });
    },
    action: "update",
    fields,
  };
};
