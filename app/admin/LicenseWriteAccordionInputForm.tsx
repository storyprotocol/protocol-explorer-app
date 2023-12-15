'use client';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ArrowPathIcon, CheckIcon, ExclamationCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import EtherscanLink from '@/utils/EtherscanLink';
import { useAccount, useNetwork } from 'wagmi';
// import ConnectWalletButton from '@/components/Navbar/ConnectWalletButton2';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { cn } from '@/utils';
import { CreateLicenseRequest } from '@story-protocol/core-sdk';

type InputFormProps = {
  formSchema: z.ZodObject<any, any>;
  hook: any;
  fcnName: string;
  description?: string;
  onSuccessDisplay?: any;
  defaultValues?: Record<string, any>;
  descriptions?: Record<string, any>;
  placeholders?: Record<string, any>;
};

function getDefaultValuesFromSchema(
  schema: z.ZodObject<any, any>,
  defaultValues: Record<string, any>,
): Record<string, any> {
  const shape = schema.shape;
  const values: Record<string, any> = {};

  for (const key in shape) {
    values[key] = defaultValues[key] || ''; // Use the default value if available, or set an empty string as a fallback
  }

  // Set default values for keys that are in defaultValues but not in the form schema
  for (const key in defaultValues) {
    if (!values[key]) {
      values[key] = defaultValues[key];
    }
  }

  return values;
}

function getZodTypeName(type: z.ZodType<any, any>): string {
  if (type instanceof z.ZodString) return 'string';
  if (type instanceof z.ZodNumber) return 'number';
  if (type instanceof z.ZodBoolean) return 'boolean';
  if (type instanceof z.ZodNativeEnum) return 'enum';
  if (type instanceof z.ZodArray) return 'array';
  return '';
}

type EnumDropdownProps = {
  field: any;
  enumType: Record<string, number | string>;
};

function EnumDropdown({ field, enumType }: EnumDropdownProps) {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedValue(selectedValue);
    const isEnumOfNumbers = typeof enumType[selectedValue] === 'number';

    const convertedValue = isEnumOfNumbers ? Number(enumType[selectedValue]) : selectedValue;
    console.log(convertedValue);
    field.onChange(convertedValue);
  };

  const enumKeys = Object.keys(enumType).filter((key) => isNaN(Number(key)));

  return (
    <div className="relative border-2 rounded-xl">
      <select
        {...field}
        value={selectedValue}
        onChange={handleChange}
        className="block appearance-none w-full px-4 py-2 pr-8 rounded-xl bg-transparent focus:outline-none"
      >
        {enumKeys.map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M5.293 9.293a1 1 0 0 1 1.414 0L10 12.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z" />
        </svg>
      </div>
    </div>
  );
}

type BooleanDropdownProps = {
  field: any;
};

const BooleanDropdown: React.FC<BooleanDropdownProps> = ({ field }) => {
  const [hasSelection, setHasSelection] = useState(false);

  useEffect(() => {
    // Ensure the initial field value is undefined
    if (!hasSelection && field.value !== undefined) {
      field.onChange(undefined);
    }
  }, [hasSelection, field]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value === 'true';
    field.onChange(selectedValue);
    setHasSelection(true);
  };

  return (
    <div className="relative border-2 rounded-xl">
      <select
        {...field}
        value={field.value === undefined ? '' : field.value.toString()} // Set initial value as empty string
        onChange={handleSelectChange}
        className="block appearance-none w-full px-4 py-2 pr-8 rounded-xl bg-transparent focus:outline-none"
      >
        {!hasSelection && <option value="">Select...</option>}
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M5.293 9.293a1 1 0 0 1 1.414 0L10 12.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z" />
        </svg>
      </div>
    </div>
  );
};

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
  const typeName = getZodTypeName(schema);
  const optionalText = isZodOptional(schema) ? ' (optional)' : '';

  const isReadOnly = defaultValue && defaultValue[name] !== undefined; // Check if a default value exists for the current field

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
          <FormControl className="">
            {typeName === 'enum' ? (
              <EnumDropdown field={field} enumType={(schema as z.ZodNativeEnum<any>)._def.values} />
            ) : typeName === 'boolean' ? ( // Check if the type is boolean
              <BooleanDropdown field={field} />
            ) : (
              <Input placeholder={placeholder || `Enter ${name}`} {...field} readOnly={isReadOnly} />
            )}
          </FormControl>
          <FormMessage />
          {description && <FormDescription>{description}</FormDescription>}
        </FormItem>
      )}
    />
  );
}

export default function CreateLicenseWriteAccordionInputForm({
  formSchema,
  hook,
  fcnName,
  description = '',
  defaultValues = {},
  onSuccessDisplay = <></>,
  descriptions = {},
  placeholders = {},
}: InputFormProps) {
  const { chain } = useNetwork();
  const { isConnected } = useAccount();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultValuesFromSchema(formSchema, defaultValues),
  });

  async function onSubmit(values: z.infer<typeof formSchema>, event: any) {
    event.preventDefault();
    await execute();
  }
  const createLicenseReq: CreateLicenseRequest = {
    ipOrgId: form.getValues().ipOrgId,
    ipaId: form.getValues().ipaId || '0',
    parentLicenseId: '0',
    params: [],
    preHookData: [],
    postHookData: [],
    txOptions: {
      waitForTransaction: true,
    },
  };
  const { execute, isIdle, isLoading, isSuccess, data, reset, errorMsg } = hook(createLicenseReq);

  const IdleComponent = () => (
    <>
      <ArrowPathIcon className="animate-spin w-full mx-auto mb-4 text-yellow-500" width={40} height={40} />
      <p>Please confirm the transaction in your wallet.</p>
    </>
  );
  const LoadingComponent = () => (
    <>
      <ArrowPathIcon className="animate-spin w-full mx-auto mb-4 text-blue-500" width={40} height={40} />
      <p>
        Transaction in progress... <EtherscanLink txHash={data?.txHash} chainId={chain?.id} />
      </p>
    </>
  );

  const SuccessComponent = () => (
    <>
      <CheckIcon className=" w-full mx-auto text-green-500 mb-4" width={40} height={40} />
      <p>Transaction successful!</p>
      {onSuccessDisplay}
    </>
  );

  const FailedComponent = () => (
    <>
      <XCircleIcon className=" w-full mx-auto text-red-500 mb-4" width={40} height={40} />
      <div className="flex flex-col">
        <p>Transaction failed.</p>
        {errorMsg && <span className="max-w-2xl break-all">{errorMsg}</span>}
        <EtherscanLink txHash={data?.txHash} chainId={chain?.id} />
      </div>
    </>
  );

  const DialogComponent = isIdle
    ? IdleComponent
    : isLoading
    ? LoadingComponent
    : isSuccess
    ? SuccessComponent
    : FailedComponent;

  return (
    <>
      <Dialog onOpenChange={() => reset()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="w-full text-center pb-4">Transaction Status</DialogTitle>
            <DialogDescription className="w-full text-center flex flex-col">
              <DialogComponent />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
        <Accordion
          type="single"
          collapsible
          className="rounded-t-xl rounded-l-xl rounded-r-xl  border-t-2 border-l-2 border-r-2 border-b-2 bg-white"
        >
          <AccordionItem value="item-1 border-b-2" className="">
            <AccordionTrigger className="px-4">{fcnName}</AccordionTrigger>
            <AccordionContent className="px-4 pt-4 bg-white rounded-b-xl">
              {description && (
                <section className="flex flex-row gap-2 pb-2">
                  <ExclamationCircleIcon className="w-5 h-5 text-yellow-500" />
                  <p className="pb-4 flex my-auto">{description}</p>
                </section>
              )}
              {isConnected ? (
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
                    <DialogTrigger
                      type="submit"
                      disabled={!form.formState.isValid}
                      className={cn(
                        'px-4 py-2 border-2 rounded-xl ',
                        form.formState.isValid ? 'bg-sp-purple/80 text-white hover:bg-sp-purple' : 'bg-black/10',
                      )}
                    >
                      Submit
                    </DialogTrigger>
                  </form>
                </Form>
              ) : (
                <section className="flex flex-col gap-4">
                  <p>Connect your wallet first to perform a transaction</p>
                  {/* <ConnectWalletButton /> */}
                  <ConnectButton />
                </section>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Dialog>
    </>
  );
}
