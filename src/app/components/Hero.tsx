"use client";
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button, Card } from "@nextui-org/react";
import { useState } from 'react';

const MAX_ROTATION = 10;

export default function Hero() {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    
    // Get mouse position relative to card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation values
    const rotateY = ((x / rect.width) - 0.5) * MAX_ROTATION;
    const rotateX = ((y / rect.height) - 0.5) * -MAX_ROTATION;
    
    setRotateX(rotateX);
    setRotateY(rotateY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10" />
        <Image
          src="/modern-empty-room.jpg"
          alt="Interior Design"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 inline-block pb-2">
                Transform Your Space with AI Magic
              </span>
            </h1>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Experience the future of interior design. Upload your room photo and let our AI create stunning design suggestions tailored just for you.
            </p>
            <div className="flex gap-4">
              <Button
                as={Link}
                href="/design"
                color="primary"
                variant="shadow"
                size="lg"
                className="font-semibold"
                endContent={
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                }
              >
                Start Designing
              </Button>
              <Button
                as={Link}
                href="#how-it-works"
                variant="bordered"
                size="lg"
                className="font-semibold"
              >
                Learn More
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[500px] hidden lg:block"
            style={{
              perspective: "1000px"
            }}
          >
            <motion.div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              animate={{
                rotateX,
                rotateY,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30
              }}
              style={{
                width: "100%",
                height: "100%",
                transformStyle: "preserve-3d"
              }}
            >
              <Card
                className="w-full h-full overflow-hidden"
                isHoverable
              >
                <div className="relative w-full h-full">
                  <Image
                    src="/room.jpg"
                    alt="AI transformed room"
                    fill
                    className="object-cover"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-black/10 to-white/10"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: `translateZ(20px)`
                    }}
                  />
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 