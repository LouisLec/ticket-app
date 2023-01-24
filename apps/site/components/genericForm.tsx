import { cn } from "@/utils/classes";
import { CreateTaskInput } from "@ticketApp/codegen";
import { useRouter } from "next/navigation";
import { FC, useState, useTransition } from "react";
import { FieldPath, useForm } from "react-hook-form";

export interface GenericFormProps<InputType> {
  onCanceled: () => void;
  onSuccess: () => void;
  action: "create" | "update";
  fields: Field<InputType>[];
  onSubmit: (data: InputType) => Promise<void>;
  onDelete?: () => void;
  entityName?: string;
}

export interface Field<T> {
  name: FieldPath<T>;
  label: string;
  initialValue?: string | number | boolean | null;
  type: "text" | "textarea" | "select" | "boolean" | "number" | "color";
  options?: { label: string; value: string }[];
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: RegExp;
  placeholder?: string;
  defaultValue?: string;
  hidden?: boolean;
}

export const GenericForm: FC<GenericFormProps<any>> = ({
  onCanceled,
  onSuccess,
  action,
  fields,
  onSubmit,
  onDelete,
}) => {
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({});

  const onSubmitHandler = async (data: any) => {
    setIsLoading(true);
    // replace empty string with null recursively the functional way using a reducer

    const replaceEmptyStringWithNull = (obj: any) => {
      return Object.keys(obj).reduce((acc, key) => {
        if (obj[key] && typeof obj[key] === "object") {
          acc[key] = replaceEmptyStringWithNull(obj[key]);
        } else if (obj[key] === "") {
          acc[key] = null;
        } else {
          acc[key] = obj[key];
        }
        return acc;
      }, {});
    };
    const data2 = replaceEmptyStringWithNull(data);

    await onSubmit(data2);

    setIsLoading(false);

    startTransition(() => {
      onSuccess();
      router.refresh();
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className={cn((isLoading || isPending) && "opacity-40 ")}
    >
      {fields?.map(field => (
        <label
          htmlFor={field.name as string}
          className={cn(
            "flex flex-col px-4 py-2 mt-2 text-xs rounded text-slate-500 bg-slate-900",
            field.hidden && "opacity-50"
          )}
        >
          {field.label}
          {field.hidden && (
            <input
              disabled
              defaultValue={
                (field.initialValue || field.defaultValue || null) as any
              }
              type="hidden"
              id={field.name as string}
              {...register(field.name as string, {
                required: field.required,
                maxLength: field.maxLength,
                minLength: field.minLength,
                pattern: field.pattern,
              })}
            />
          )}

          {field.type === "text" && (
            <input
              defaultValue={
                (field.initialValue || field.defaultValue || null) as any
              }
              type="text"
              className="p-0 mt-1 font-mono text-xs text-white bg-transparent border-none outline-none resize-none ring-0 "
              id={field.name as string}
              {...register(field.name as string, {
                required: field.required,
                maxLength: field.maxLength,
                minLength: field.minLength,
                pattern: field.pattern,
              })}
            />
          )}
          {field.type === "textarea" && (
            <textarea
              rows={3}
              defaultValue={
                (field.initialValue || field.defaultValue || null) as any
              }
              className="p-0 mt-1 font-mono text-xs text-white bg-transparent border-none outline-none resize-none ring-0 "
              id={field.name as string}
              {...register(field.name as string, {
                required: field.required,
                maxLength: field.maxLength,
                minLength: field.minLength,
                pattern: field.pattern,
              })}
            />
          )}
          {field.type === "select" && (
            <select
              defaultValue={
                (field.initialValue || field.defaultValue || null) as any
              }
              className="p-0 mt-1 font-mono text-xs text-white bg-transparent border-none outline-none resize-none ring-0 "
              id={field.name as string}
              {...register(field.name as string, {
                required: field.required,
                maxLength: field.maxLength,
                minLength: field.minLength,
                pattern: field.pattern,
              })}
            >
              {field.options?.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
          {field.type === "boolean" && (
            <div className="flex items-center gap-2">
              <input
                defaultValue={
                  (field.initialValue || field.defaultValue || null) as any
                }
                type="radio"
                id="true"
                name={field.name as string}
                value="true"
                {...register(field.name as string, {
                  required: field.required,
                })}
              />
              <label htmlFor="true">true</label>

              <input
                defaultValue={
                  (field.initialValue || field.defaultValue || null) as any
                }
                type="radio"
                id="false"
                name={field.name as string}
                value="false"
                {...register(field.name as string, {
                  required: field.required,
                })}
              />
              <label htmlFor="false">false</label>
            </div>
          )}
          {field.type === "number" && (
            <input
              defaultValue={
                (field.initialValue || field.defaultValue || null) as any
              }
              type="number"
              className="p-0 mt-1 font-mono text-xs text-white bg-transparent border-none outline-none resize-none ring-0 "
              id={field.name as string}
              {...register(field.name as string, {
                required: field.required,
                maxLength: field.maxLength,
                minLength: field.minLength,
                pattern: field.pattern,
                valueAsNumber: true,
              })}
            />
          )}
          {field.type === "color" && (
            <input
              defaultValue={
                (field.initialValue || field.defaultValue || null) as any
              }
              type="color"
              className="p-0 mt-1 font-mono text-xs text-white bg-transparent border-none outline-none resize-none ring-0 "
              id={field.name as string}
              {...register(field.name as string, {
                required: field.required,
                maxLength: field.maxLength,
                minLength: field.minLength,
                pattern: field.pattern,
              })}
            />
          )}
          {errors[field.name as string] ? (
            <span className="text-xs text-red-500">
              {errors[field.name as string].type === "required" &&
                "This field is required"}
              {errors[field.name as string].type === "maxLength" &&
                `This field must be less than ${field.maxLength} characters`}
              {errors[field.name as string].type === "minLength" &&
                `This field must be more than ${field.minLength} characters`}
              {errors[field.name as string].type === "pattern" &&
                "This field is invalid"}
            </span>
          ) : null}
        </label>
      ))}
      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          className="px-4 py-2 text-xs font-semibold text-white bg-gray-600 rounded hover:bg-gray-700"
          onClick={onCanceled}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-xs font-semibold text-white bg-green-600 rounded hover:bg-green-700"
        >
          {action}
        </button>
        {onDelete && (
          <button
            type="button"
            className="px-4 py-2 text-xs font-semibold text-white bg-red-600 rounded hover:bg-red-700"
            onClick={onDelete}
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
};
