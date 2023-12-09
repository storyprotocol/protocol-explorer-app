'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FileDropzone } from '@/components/upload/FileDropzone';
import { CreateIpAssetRequest } from '@story-protocol/core-sdk';
import useUploadFile from '@/hooks/useUploadFile';
import useCreateIpAsset from '@/hooks/useCreateIpAsset';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useToast } from '@/components/ui/use-toast';

type CreateIpaFormProps = {
  ipOrgId: string;
};

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Required',
  }),
  description: z.string().optional(),
  // mediaUrl: z.string().optional(),
  contentFile: z.any(),
});

export function CreateIpaForm({ ipOrgId }: CreateIpaFormProps) {
  const { isConnected, address } = useAccount();
  const { toast } = useToast();
  const { execute: uploadFile, isLoading: isUploadingFile, data: uri, isSuccess: isUploadSuccess } = useUploadFile();
  const {
    execute: createIpa,
    isLoading: isCreatingIpa,
    data: ipAssetId,
    isSuccess: isCreateSuccess,
  } = useCreateIpAsset();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  async function onSubmit() {
    const contentFile = form.watch('contentFile');
    await uploadFile(contentFile);
  }

  useEffect(() => {
    async function asyncCreateIpa() {
      if (isUploadSuccess && uri) {
        const createIpaReq: CreateIpAssetRequest = {
          name: form.watch('name'),
          typeIndex: 0,
          ipOrgId: ipOrgId,
          licenseId: '0',
          mediaUrl: uri,
          txOptions: {
            waitForTransaction: true,
          },
        };

        try {
          await createIpa(createIpaReq);
        } catch (e) {
          console.log('Error creating IPA', e);
        }
      }
    }
    asyncCreateIpa();
  }, [isUploadSuccess, uri]);

  useEffect(() => {
    if (isCreateSuccess && ipAssetId) {
      toast({
        title: 'IP Asset created',
        description: <a href={`/ipa/${ipOrgId}/${ipAssetId}`}>{`IP Asset created successfully: ${ipAssetId}`}</a>,
        duration: 10000,
      });
    }
  }, [isCreateSuccess, ipAssetId]);

  if (!isConnected && !address)
    return <p className="w-full mx-auto flex text-center flex-grow h-full">Please connect wallet</p>;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="gap-4 flex flex-col lg:flex-row w-full lg:w-2/3 mx-auto ">
        <FormField
          control={form.control}
          name="contentFile"
          render={({ field, fieldState }) => (
            <FormItem className="w-full lg:w-1/2 flex mx-auto lg:flex-none flex-col">
              <FormLabel>Content File</FormLabel>

              <FormControl>
                <FileDropzone formField={field} className="lg:min-h-full aspect-square" />
              </FormControl>
              {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
            </FormItem>
          )}
        />
        <div className="flex flex-col lg:w-1/2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>IP Asset Name</FormLabel>
                <FormControl>
                  <Input placeholder="IP Asset Name (required)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="bg-sp-purple hover:bg-sp-purple-dark py-2 px-4 md:px-6 rounded-3xl text-white text-xs md:text-base shadow-sm"
          >
            {isUploadingFile ? 'Uploading file...' : isCreatingIpa ? 'Creating IP Asset' : 'Submit'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
