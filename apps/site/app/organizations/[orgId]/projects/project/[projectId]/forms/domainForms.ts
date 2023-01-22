/* import { Field, GenericFormProps } from "@/components/index";
import {
  CreateTaskInput,
  GetProjectByIdQuery,
  TaskStatus,
  UpdateTaskInput,
} from "@ticketApp/codegen";
import { sdk } from "utils/sdk";

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
}) => Partial<GenericFormProps<CreateTaskInput>> = ({
  domains,
  userStoryId,
  existingTasks,
}) => {
  return {
    async onSubmit(data) {
      await sdk.CreateTask({ input: data });
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
        type: "text",
        required: true,
      },
      {
        name: "task.status",
        label: "Status",
        type: "select",
        options: Object.values(TaskStatus).map(status => ({
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
        options: existingTasks?.map(task => ({
          label: task.name,
          value: task.id,
        })),
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
}) => Partial<GenericFormProps<UpdateTaskInput>> = ({
  domains,

  task,
  existingTasks,
}) => {
  const fields: Field<UpdateTaskInput> = [
    {
      name: "id",
      type: "text",
      hidden: true,
      label: "Id",
      disabled: true,
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
      type: "text",
      required: true,
      initialValue: task.description,
    },
    {
      name: "patch.status",
      label: "Status",
      type: "select",
      options: Object.values(TaskStatus).map(status => ({
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
      options: existingTasks?.map(task => ({
        label: task.name,
        value: task.id,
      })),
      initialValue: task?.parentId,
    },
  ];
  return {
    async onSubmit(data) {
      await sdk.UpdateTask({ input: data });
    },
    action: "update",
    fields,
  };
};
 */

import { GenericFormProps } from "@/components/index";
import {
  CreateDomainInput,
  GetProjectByIdQuery,
  UpdateDomainInput,
} from "@ticketApp/codegen";
import { sdk } from "utils/sdk";

export const createDomainFormProps: (input: {
  projectId: string;
}) => Partial<GenericFormProps<CreateDomainInput>> = ({ projectId }) => {
  return {
    async onSubmit(data) {
      await sdk.CreateDomain({ input: data });
    },
    action: "create",
    fields: [
      {
        name: "domain.projectId",
        type: "text",
        hidden: true,
        label: "Project",
        initialValue: projectId,
      },
      {
        name: "domain.name",
        label: "Name",
        type: "text",
        required: true,
      },
      {
        name: "domain.color",
        label: "Color",
        type: "color",
        required: true,
      },
      {
        name: "domain.description",
        label: "Description",
        type: "text",
        required: true,
      },
    ],
  };
};

export const updateDomainFormProps: (input: {
  domain: ExtractArrayType<
    ExtractType<GetProjectByIdQuery, "project">,
    "domainsList"
  >;
}) => Partial<GenericFormProps<UpdateDomainInput>> = ({ domain }) => {
  return {
    async onSubmit(data) {
      await sdk.UpdateDomain({ input: data });
    },
    action: "update",
    fields: [
      {
        name: "id",
        type: "text",
        hidden: true,
        label: "Id",
        disabled: true,
        initialValue: domain.id,
      },
      {
        name: "patch.projectId",
        type: "text",
        hidden: true,
        label: "Project",
        initialValue: domain.projectId,
      },
      {
        name: "patch.name",
        label: "Name",
        type: "text",
        required: true,
        initialValue: domain.name,
      },
      {
        name: "patch.description",
        label: "Description",
        type: "text",
        required: true,
        initialValue: domain.description,
      },
    ],
  };
};
