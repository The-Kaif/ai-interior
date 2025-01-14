"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { ArrowUpTrayIcon, SparklesIcon, PhotoIcon, ArrowPathIcon, XMarkIcon, ArrowsPointingOutIcon } from '@heroicons/react/24/outline';

export default function DesignTool() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string>('modern minimalist');
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [usedPrompt, setUsedPrompt] = useState<string>('');
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setFullscreenImage(null);
      }
    };

    if (fullscreenImage) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent scrolling when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [fullscreenImage]);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }

      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size should be less than 10MB');
        return;
      }

      setUploadedImage(file);
      const previewUrl = URL.createObjectURL(file);
      setUploadedImagePreview(previewUrl);
    }
  }, []);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }

      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size should be less than 10MB');
        return;
      }

      setUploadedImage(file);
      const previewUrl = URL.createObjectURL(file);
      setUploadedImagePreview(previewUrl);
    }
  }, []);

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
      const base64Image = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(uploadedImage);
      });

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
      
      if (data.usedPrompt) {
        setUsedPrompt(data.usedPrompt);
      }
      setResult(data.result);

      // After successful generation, scroll to results
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            AI Interior Designer
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Transform your space with AI-powered interior design suggestions
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Input Section */}
          <div className="space-y-8">
            {/* Upload Section with Drag & Drop */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8">
              <h2 className="text-2xl font-semibold mb-6 flex items-center text-gray-900 dark:text-white">
                <PhotoIcon className="h-7 w-7 mr-3 text-blue-600" />
                Upload Your Room Photo
              </h2>
              <div
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative border-3 border-dashed rounded-xl p-10 transition-all
                  ${isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''}
                  ${uploadedImagePreview 
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                    : 'border-gray-300 dark:border-gray-600 hover:border-blue-500'}`}
              >
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="room-image"
                  onChange={handleFileUpload}
                />
                <label
                  htmlFor="room-image"
                  className="cursor-pointer flex flex-col items-center gap-6"
                >
                  {uploadedImagePreview ? (
                    <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
                      <Image
                        src={uploadedImagePreview}
                        alt="Uploaded room"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <p className="text-white font-medium text-lg">Change Photo</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <ArrowUpTrayIcon className="h-16 w-16 text-gray-400" />
                      <div className="text-center">
                        <p className="text-lg font-medium text-gray-700 dark:text-gray-200">
                          {isDragging ? 'Drop your photo here' : 'Drag and drop your photo here'}
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                          or click to browse from your computer
                        </p>
                      </div>
                      <p className="text-xs text-gray-400 mt-2">
                        Supports JPG, PNG files up to 10MB
                      </p>
                    </>
                  )}
                </label>
                {isDragging && (
                  <div className="absolute inset-0 bg-blue-500/10 rounded-xl pointer-events-none" />
                )}
              </div>
            </div>

            {/* Style Selection */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8">
              <h2 className="text-2xl font-semibold mb-6 flex items-center text-gray-900 dark:text-white">
                <SparklesIcon className="h-7 w-7 mr-3 text-blue-600" />
                Choose Your Style
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  'Modern Minimalist',
                  'Scandinavian',
                  'Industrial',
                  'Bohemian',
                  'Contemporary',
                  'Mid-Century Modern'
                ].map((style) => (
                  <button
                    key={style}
                    onClick={() => setSelectedStyle(style.toLowerCase())}
                    className={`p-6 rounded-xl border-2 transition-all
                      ${selectedStyle === style.toLowerCase()
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-blue-400'
                      }`}
                  >
                    <p className="text-base font-medium text-gray-900 dark:text-white">
                      {style}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt Input */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
                Describe Your Vision
              </h2>
              <textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Example: I want a cozy reading corner with warm lighting and built-in bookshelves. Add some plants and natural elements..."
                className="w-full p-4 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 
                  text-gray-900 dark:text-white min-h-[160px] focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  text-lg placeholder:text-gray-400"
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isLoading || !uploadedImage || !customPrompt}
              className={`w-full py-5 px-8 rounded-xl font-semibold text-lg transition-all
                ${isLoading || !uploadedImage || !customPrompt
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <ArrowPathIcon className="h-6 w-6 mr-3 animate-spin" />
                  Generating Your Design...
                </span>
              ) : (
                'Generate Design'
              )}
            </button>
          </div>

          {/* Right Column - Results Section */}
          <div className="lg:sticky lg:top-8">
            {(uploadedImagePreview || result) && (
              <div ref={resultsRef} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8">
                <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
                  Your Design Results
                </h2>
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {uploadedImagePreview && (
                      <div>
                        <h3 className="font-medium mb-3 text-gray-700 dark:text-gray-200">
                          Original Room
                        </h3>
                        <div className="group relative aspect-[4/3] rounded-lg overflow-hidden">
                          <Image
                            src={uploadedImagePreview}
                            alt="Original room"
                            fill
                            className="object-cover"
                          />
                          <button
                            onClick={() => setFullscreenImage(uploadedImagePreview)}
                            className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 
                              transition-opacity flex items-center justify-center"
                          >
                            <ArrowsPointingOutIcon className="h-8 w-8 text-white" />
                            <span className="sr-only">View full size</span>
                          </button>
                        </div>
                      </div>
                    )}
                    {result && (
                      <div>
                        <h3 className="font-medium mb-3 text-gray-700 dark:text-gray-200">
                          AI Generated Design
                        </h3>
                        <div className="group relative aspect-[4/3] rounded-lg overflow-hidden">
                          <Image
                            src={result}
                            alt="Generated design"
                            fill
                            className="object-cover"
                          />
                          <button
                            onClick={() => setFullscreenImage(result)}
                            className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 
                              transition-opacity flex items-center justify-center"
                          >
                            <ArrowsPointingOutIcon className="h-8 w-8 text-white" />
                            <span className="sr-only">View full size</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  {result && (
                    <>
                      {usedPrompt && (
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {usedPrompt}
                          </p>
                        </div>
                      )}
                      <div className="flex gap-4">
                        <a
                          href={result}
                          download="interior-design.jpg"
                          className="flex-1 flex items-center justify-center px-6 py-3 rounded-xl bg-blue-600 
                            text-white hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 
                            disabled:cursor-not-allowed"
                        >
                          Download Design
                        </a>
                        <button
                          onClick={handleGenerate}
                          disabled={isLoading}
                          className="flex-1 flex items-center justify-center px-6 py-3 rounded-xl border-2
                            border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 
                            transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed
                            disabled:hover:bg-transparent"
                        >
                          {isLoading ? (
                            <span className="flex items-center justify-center">
                              <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
                              Generating...
                            </span>
                          ) : (
                            'Generate Another'
                          )}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Fullscreen Image Modal */}
      {fullscreenImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <button
              onClick={() => setFullscreenImage(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 
                transition-colors text-white z-10"
            >
              <XMarkIcon className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </button>
            <div className="relative w-full h-full">
              <Image
                src={fullscreenImage}
                alt="Full size image"
                fill
                className="object-contain"
                quality={100}
                priority
              />
            </div>
          </div>
        </div>
      )}

      {/* Add a loading overlay when generating */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md mx-4 text-center">
            <div className="flex flex-col items-center gap-4">
              <ArrowPathIcon className="h-12 w-12 text-blue-600 animate-spin" />
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Generating Your Design
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  This may take a few moments...
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 