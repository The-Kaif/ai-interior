"use client";
import { motion } from 'framer-motion';
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { HomeIcon, SparklesIcon, ClockIcon, PaintBrushIcon } from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Instant Visualization',
    description: 'See how your space could look with different styles and layouts in seconds.',
    icon: SparklesIcon,
  },
  {
    name: 'Multiple Styles',
    description: 'Choose from various interior design styles from modern to traditional.',
    icon: PaintBrushIcon,
  },
  {
    name: 'Real-Time Updates',
    description: 'Make changes and see updates instantly with our AI technology.',
    icon: ClockIcon,
  },
  {
    name: 'Room-Specific Design',
    description: 'Get tailored suggestions for any room in your home.',
    icon: HomeIcon,
  },
];

export default function Features() {
  return (
    <div className="py-20" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 mb-4">
            Features that Make Design Easy
          </h2>
          <p className="text-default-500">
            Everything you need to transform your space with confidence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="h-full"
            >
              <Card 
                className="border-none bg-background/60 backdrop-blur-md h-full"
                isHoverable
                shadow="sm"
              >
                <CardHeader className="pb-0 pt-6 px-6 flex-col items-center">
                  <div className="relative w-12 h-12 mb-4">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl" />
                    <feature.icon className="w-12 h-12 text-primary relative z-10" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {feature.name}
                  </h3>
                </CardHeader>
                <CardBody className="text-center pb-6 pt-2 flex-grow">
                  <p className="text-default-500">
                    {feature.description}
                  </p>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 