'use client';
import { cn } from '@/utils';
import React, { useCallback, useState } from 'react';
import { DropzoneInputProps, DropzoneRootProps, useDropzone } from 'react-dropzone';

type DropzoneOptions = {
  maxFileSize?: number;
};

export function FileDropzone({
  formField,
  options,
  className,
}: {
  formField?: any;
  options?: DropzoneOptions;
  className?: string;
}) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isFileRejected, setIsFileRejected] = useState<boolean>(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const reader = new FileReader();
    formField.onChange(acceptedFiles[0]); // assuming single file
    if (acceptedFiles[0] && reader) {
      reader.readAsDataURL(acceptedFiles[0]);
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      setIsFileRejected(false);
    }
  }, []);

  const onDropRejected = useCallback(() => {
    console.log('Rejected file');
    setIsFileRejected(true);
  }, []);

  const removeImage = () => {
    setImagePreview(null);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDropRejected,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'video/mp4': ['.mp4', '.MP4'],
      'video/mpeg': ['.mpeg'],
      'image/gif': ['.gif'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/epub+zip': ['.epub'],
      'text/html': ['.html', '.htm'],
      'audio/mpeg': ['.mp3'],
      'text/plain': ['.txt'],
      'text/markdown': ['.md'],
    },
    multiple: false,
    maxSize: options?.maxFileSize || 50000000, // 5MB
  });

  const rootProps: DropzoneRootProps = getRootProps();
  const inputProps: DropzoneInputProps = getInputProps();

  return (
    <div
      {...rootProps}
      className={cn(
        'relative flex h-64 w-full flex-col items-center justify-center rounded-md border-2 border-dashed p-6',
        className,
      )}
    >
      <input {...inputProps} />
      {imagePreview ? (
        <div className="relative h-full w-full">
          <img src={imagePreview as string} alt="Preview" className="h-full w-full rounded-md object-cover" />
          <button
            onClick={removeImage}
            className="absolute -right-3 -top-3 flex h-6 w-6 items-center justify-center rounded-full bg-background-base/50 text-black/50 hover:bg-background-base hover:text-black"
          >
            X
          </button>
        </div>
      ) : (
        <>
          <p className={isFileRejected ? 'text-secondary' : ''}>
            {isFileRejected ? 'Please upload a supported file under the file size limit.' : 'Drag & drop your file'}
          </p>
          <button
            type="button"
            className="bg-sp-purple hover:bg-sp-purple-dark py-2 px-4 md:px-6 rounded-3xl text-white text-xs md:text-base shadow-sm"
          >
            Upload File
          </button>
        </>
      )}
    </div>
  );
}
