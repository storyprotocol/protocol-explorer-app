'use client';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { removeEmptyStringFields } from '@/utils';
import JsonView from '@uiw/react-json-view';
import { githubLightTheme } from '@uiw/react-json-view/githubLight';

type InputFormProps = {
  formSchema: z.ZodObject<any, any>;
  onSubmitFcn: any;
  fcnName: string;
  defaultValues?: Record<string, any>;
  descriptions?: Record<string, any>;
  placeholders?: Record<string, any>;
};

function getDefaultValuesFromSchema(
  schema: z.ZodObject<any, any>,
  defaultValues: Record<string, string>,
): Record<string, string> {
  const shape = schema.shape;
  const values: Record<string, any> = {};

  for (const key in shape) {
    values[key] = defaultValues[key] || ''; // Use the default value if available, or set an empty string as a fallback
  }

  return values;
}

type NestedFieldProps = {
  control: any;
  name: string;
  schema: z.ZodType<any, any>;
  defaultValue?: Record<string, any>;
  description?: string;
  placeholder?: string;
};

function isZodOptional(type: z.ZodType<any, any>): boolean {
  return type.isOptional();
}

function NestedField({ control, name, schema, defaultValue, description, placeholder }: NestedFieldProps) {
  const optionalText = isZodOptional(schema) ? ' (optional)' : '';

  if (schema instanceof z.ZodObject) {
    return (
      <div style={{ border: '1px solid #e2e8f0', margin: '10px 0', padding: '10px' }} className="rounded-xl">
        <h3 className="pb-4">{name.split('.').pop()}</h3> {/* Displaying the name of the nested object */}
        {Object.keys(schema.shape).map((key) => (
          <NestedField
            key={key}
            control={control}
            name={`${name}.${key}`}
            schema={schema.shape[key]}
            defaultValue={defaultValue && defaultValue[key]} // Pass the default value for nested fields
            placeholder={placeholder}
          />
        ))}
      </div>
    );
  }

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="pb-4">
          <FormLabel className="pb-4">
            {name.split('.').pop()} {Boolean(optionalText.length) && optionalText}
            {!(schema instanceof z.ZodOptional) && <span className="text-red-500">*</span>}
          </FormLabel>
          <FormControl>
            <Input placeholder={placeholder || `Enter ${name}`} {...field} />
          </FormControl>
          <FormMessage />
          {description && <FormDescription>{description}</FormDescription>}
        </FormItem>
      )}
    />
  );
}

export default function AccordionInputForm({
  formSchema,
  onSubmitFcn,
  fcnName,
  defaultValues = {},
  descriptions = {},
  placeholders = {},
}: InputFormProps) {
  const [result, setResult] = useState({ data: '' });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultValuesFromSchema(formSchema, defaultValues),
  });

  async function onSubmit(values: z.infer<typeof formSchema>, event: any) {
    event.preventDefault();

    // const fcnResult = !hasEmptyString(form.getValues()) ? await onSubmitFcn(form.getValues()) : await onSubmitFcn({});

    const fcnResult = await onSubmitFcn(removeEmptyStringFields(form.getValues()));

    setResult(fcnResult);
  }

  return (
    <Accordion
      type="single"
      collapsible
      className="rounded-t-xl rounded-l-xl rounded-r-xl  border-t-2 border-l-2 border-r-2 border-b-2 bg-white"
    >
      <AccordionItem value="item-1 border-b-2" className="">
        <AccordionTrigger className="px-4">{fcnName}</AccordionTrigger>

        <AccordionContent className="px-4 pt-4 bg-white rounded-b-xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {Object.keys(formSchema.shape).map((key) => (
                <NestedField
                  key={key}
                  control={form.control}
                  name={key}
                  schema={formSchema.shape[key]}
                  description={descriptions[key]}
                  placeholder={placeholders[key]}
                />
              ))}
              <Button type="submit">Submit</Button>
              <JsonView value={result} style={githubLightTheme} />
            </form>
          </Form>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
