"use client";

import { useState, useRef } from 'react';
import Image from 'next/image';
import { 
  Card, 
  CardBody, 
  Button, 
  Textarea, 
  RadioGroup, 
  Radio,
  Spinner,
  Modal, 
  ModalContent, 
  ModalBody,
  useDisclosure
} from "@nextui-org/react";
import { 
  ArrowUpTrayIcon, 
  SparklesIcon, 
  PhotoIcon, 
  // ArrowPathIcon, 
  XMarkIcon, 
  ArrowsPointingOutIcon 
} from '@heroicons/react/24/outline';

export default function DesignTool() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string>('modern minimalist');
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [usedPrompt, setUsedPrompt] = useState<string>('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImage(file);
      const previewUrl = URL.createObjectURL(file);
      setUploadedImagePreview(previewUrl);
    }
  };

  const handleGenerate = async () => {
    if (!uploadedImage) {
      alert('Please upload a room photo first');
      return;
    }

    if (!customPrompt) {
      alert('Please describe your desired room design');
      return;
    }

    setIsLoading(true);
    
    try {
      // Convert image to base64
      const base64Image = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(uploadedImage);
      });

      // Make API call
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          image: base64Image,
          prompt: customPrompt,
          style: selectedStyle || 'modern minimalist'
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }
      
      // Update state with results
      if (data.usedPrompt) {
        setUsedPrompt(data.usedPrompt);
      }
      setResult(data.result);

      // Scroll to results
      if (resultsRef.current) {
        resultsRef.current.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }

    } catch (error: unknown) {
      console.error('Detailed error:', error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('Error generating image');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const openFullscreen = (imageUrl: string) => {
    setFullscreenImage(imageUrl);
    onOpen();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background/60 backdrop-blur-md border-b border-divider mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-foreground">
            AI Interior Designer
          </h1>
          <p className="mt-2 text-default-500">
            Transform your space with AI-powered interior design suggestions
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Input Section */}
          <div className="space-y-8">
            {/* Upload Section */}
            <Card className="bg-background/60 backdrop-blur-md">
              <CardBody className="p-8">
                <h2 className="text-2xl font-semibold mb-6 flex items-center text-foreground">
                  <PhotoIcon className="h-7 w-7 mr-3 text-primary" />
                  Upload Your Room Photo
                </h2>
                <div
                  onClick={() => document.getElementById('room-image')?.click()}
                  className={`relative border-2 border-dashed rounded-xl p-10 transition-all cursor-pointer
                    ${uploadedImagePreview 
                      ? 'border-primary bg-primary/5' 
                      : 'border-default-200 hover:border-primary'}`}
                >
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="room-image"
                    onChange={handleFileUpload}
                  />
                  {uploadedImagePreview ? (
                    <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
                      <Image
                        src={uploadedImagePreview}
                        alt="Uploaded room"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <p className="text-white font-medium">Change Photo</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <ArrowUpTrayIcon className="h-16 w-16 mx-auto text-default-400 mb-4" />
                      <p className="text-lg font-medium text-foreground">
                        Drop your photo here or click to browse
                      </p>
                      <p className="text-sm text-default-500 mt-2">
                        Supports JPG, PNG files up to 10MB
                      </p>
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>

            {/* Style Selection */}
            <Card className="bg-background/60 backdrop-blur-md">
              <CardBody className="p-8">
                <h2 className="text-2xl font-semibold mb-6 flex items-center text-foreground">
                  <SparklesIcon className="h-7 w-7 mr-3 text-primary" />
                  Choose Your Style
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    'Modern Minimalist',
                    'Scandinavian',
                    'Industrial',
                    'Bohemian',
                    'Contemporary',
                    'Mid-Century Modern'
                  ].map((style) => (
                    <Button
                      key={style}
                      color={selectedStyle === style.toLowerCase() ? "bordered" : "default"}
                      variant={selectedStyle === style.toLowerCase() ? "bordered" : "flat"}
                      className={`w-full h-14 text-base font-medium transition-all ${
                        selectedStyle === style.toLowerCase() 
                          ? 'bg-primary/20' 
                          : 'hover:bg-default-100'
                      }`}
                      onClick={() => setSelectedStyle(style.toLowerCase())}
                    >
                      {style}
                    </Button>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Prompt Input */}
            <Card className="bg-background/60 backdrop-blur-md">
              <CardBody className="p-8">
                <h2 className="text-2xl font-semibold mb-6 text-foreground">
                  Describe Your Vision
                </h2>
                <Textarea
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="Example: I want a cozy reading corner with warm lighting and built-in bookshelves..."
                  minRows={4}
                  size="lg"
                  className="w-full"
                />
              </CardBody>
            </Card>

            {/* Generate Button */}
            <Button
              color="primary"
              size="lg"
              className="w-full"
              onClick={handleGenerate}
              isDisabled={isLoading || !uploadedImage || !customPrompt}
              startContent={isLoading && <Spinner size="sm" />}
            >
              {isLoading ? 'Generating...' : 'Generate Design'}
            </Button>
          </div>

          {/* Right Column - Results Section */}
          <div className="lg:sticky lg:top-8" ref={resultsRef}>
            {(uploadedImagePreview || result) && (
              <Card className="bg-background/60 backdrop-blur-md">
                <CardBody className="p-8">
                  <h2 className="text-2xl font-semibold mb-6 text-foreground">
                    Your Design Results
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {uploadedImagePreview && (
                      <div>
                        <h3 className="font-medium mb-3 text-default-700">
                          Original Room
                        </h3>
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                          <Image
                            src={uploadedImagePreview}
                            alt="Original room"
                            fill
                            className="object-cover"
                          />
                          <Button
                            isIconOnly
                            variant="light"
                            className="absolute top-2 right-2"
                            onClick={() => openFullscreen(uploadedImagePreview)}
                          >
                            <ArrowsPointingOutIcon className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    )}
                    {result && (
                      <div>
                        <h3 className="font-medium mb-3 text-default-700">
                          AI Generated Design
                        </h3>
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                          <Image
                            src={result}
                            alt="Generated design"
                            fill
                            className="object-cover"
                          />
                          <Button
                            isIconOnly
                            variant="light"
                            className="absolute top-2 right-2"
                            onClick={() => openFullscreen(result)}
                          >
                            <ArrowsPointingOutIcon className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                  {usedPrompt && (
                    <div className="mt-6 p-4 rounded-lg bg-default-100">
                      <p className="text-sm text-default-600">{usedPrompt}</p>
                    </div>
                  )}
                  {result && (
                    <div className="flex gap-4 mt-6">
                      <Button
                        as="a"
                        href={result}
                        download
                        color="primary"
                        className="flex-1"
                      >
                        Download Design
                      </Button>
                      <Button
                        onClick={handleGenerate}
                        isDisabled={isLoading}
                        variant="bordered"
                        className="flex-1"
                      >
                        Generate Another
                      </Button>
                    </div>
                  )}
                </CardBody>
              </Card>
            )}
          </div>
        </div>
      </main>

      {/* Fullscreen Image Modal */}
      <Modal 
        isOpen={!!fullscreenImage} 
        onClose={() => setFullscreenImage(null)}
        size="full"
        hideCloseButton
        classNames={{
          backdrop: "bg-black/90",
        }}
      >
        <ModalContent>
          <ModalBody className="p-0">
            {fullscreenImage && (
              <div className="relative w-full h-screen">
                <Button
                  isIconOnly
                  variant="light"
                  className="absolute top-4 right-4 z-50"
                  onClick={() => setFullscreenImage(null)}
                >
                  <XMarkIcon className="h-6 w-6" />
                </Button>
                <Image
                  src={fullscreenImage}
                  alt="Full size image"
                  fill
                  className="object-contain"
                  quality={100}
                  priority
                />
              </div>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Loading Overlay */}
      <Modal
        isOpen={isLoading}
        hideCloseButton
        isDismissable={false}
        classNames={{
          backdrop: "bg-black/50",
        }}
      >
        <ModalContent>
          <ModalBody className="py-8">
            <div className="flex flex-col items-center gap-4">
              <Spinner size="lg" color="primary" />
              <div className="text-center">
                <h3 className="text-xl font-semibold text-foreground">
                  Generating Your Design
                </h3>
                <p className="text-default-500 mt-2">
                  This may take a few moments...
                </p>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
} 