"use client";
import { motion } from 'framer-motion';
import { Card, CardBody, CardHeader, Chip } from "@nextui-org/react";
import { 
  CameraIcon, 
  SparklesIcon, 
  CursorArrowRaysIcon 
} from "@heroicons/react/24/outline";

const steps = [
  {
    step: '01',
    title: 'Upload Your Room',
    description: 'Take a photo of your room and upload it to our platform',
    icon: CameraIcon,
  },
  {
    step: '02',
    title: 'Describe Your Vision',
    description: 'Tell us your design preferences and desired style',
    icon: SparklesIcon,
  },
  {
    step: '03',
    title: 'Get AI Suggestions',
    description: 'Receive personalized design recommendations instantly',
    icon: CursorArrowRaysIcon,
  },
];

export default function HowItWorks() {
  return (
    <div className="py-20" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 mb-4">
            How It Works
          </h2>
          <p className="text-default-500">
            Transform your space in three simple steps
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
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
                    <item.icon className="w-12 h-12 text-primary relative z-10" />
                  </div>
                  <Chip 
                    className="mb-4"
                    color="primary"
                    variant="flat"
                  >
                    Step {item.step}
                  </Chip>
                </CardHeader>
                <CardBody className="text-center pb-6 pt-2 flex-grow">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-default-500">
                    {item.description}
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