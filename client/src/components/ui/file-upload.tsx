import React, { useState, useRef } from "react";
import { ImagePlus, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";

interface FileUploadProps {
  onChange: (files: string[]) => void;
  value: string[];
  maxFiles?: number;
  label?: string;
  description?: string;
  accept?: string;
}

export function FileUpload({
  onChange,
  value = [],
  maxFiles = 5,
  label,
  description,
  accept = "image/*",
}: FileUploadProps) {
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Use the provided string URLs directly as previews
  React.useEffect(() => {
    setPreviews(value);
  }, [value]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (fileList: FileList) => {
    setIsLoading(true);
    
    // Convert FileList to Array
    const filesArray = Array.from(fileList);
    
    // Filter for images only
    const imageFiles = filesArray.filter(file => 
      file.type.startsWith('image/')
    );
    
    // Limit to max files
    const filesToAdd = imageFiles.slice(0, maxFiles - value.length);
    
    if (filesToAdd.length > 0) {
      // Convert Files to URLs
      Promise.all(
        filesToAdd.map((file) => {
          return new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              resolve(reader.result as string);
            };
            reader.readAsDataURL(file);
          });
        })
      ).then((dataUrls) => {
        // Add new data URLs to existing ones
        onChange([...value, ...dataUrls]);
      });
    }
    
    setIsLoading(false);
  };

  const removeFile = (index: number) => {
    const newFiles = [...value];
    newFiles.splice(index, 1);
    onChange(newFiles);
  };

  return (
    <div className="space-y-2 w-full">
      {label && (
        <div className="font-medium text-sm">{label}</div>
      )}
      
      {description && (
        <div className="text-sm text-muted-foreground">{description}</div>
      )}
      
      <div
        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
          isDragging ? "border-primary bg-primary/5" : "border-gray-300 hover:border-primary"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept={accept}
          multiple
          onChange={handleFileInputChange}
        />
        
        <div className="flex flex-col items-center justify-center py-4">
          <ImagePlus className="h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-sm font-medium mb-1">
            {t("response.form.images.dropzone")}
          </p>
          <p className="text-xs text-muted-foreground">
            {t("response.form.images.description")}
          </p>
          {value.length > 0 && (
            <p className="text-xs text-muted-foreground mt-1">
              {value.length} / {maxFiles} {t(`response.form.images.count.${value.length === 1 ? 'one' : 'many'}`)}
            </p>
          )}
        </div>
      </div>
      
      {isLoading && (
        <div className="flex justify-center py-2">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      )}
      
      {previews.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mt-2">
          {previews.map((preview, index) => (
            <div key={index} className="relative group rounded-md overflow-hidden">
              <img
                src={preview}
                alt={`Preview ${index + 1}`}
                className="h-24 w-full object-cover rounded-md"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-1 right-1 h-6 w-6 opacity-80 hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
              >
                <XCircle className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}