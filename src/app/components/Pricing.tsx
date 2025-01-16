"use client";
import { motion } from 'framer-motion';
import { Card, CardBody, CardHeader, Button, Chip } from "@nextui-org/react";
import { CheckIcon } from "@heroicons/react/24/outline";

const plans = [
  {
    name: 'Basic',
    price: 'Free',
    features: ['3 room designs/month', 'Basic styles', 'Standard resolution'],
  },
  {
    name: 'Pro',
    price: '$19/month',
    features: ['Unlimited designs', 'All styles', 'HD resolution', 'Priority support'],
    highlighted: true,
  },
  {
    name: 'Business',
    price: '$49/month',
    features: ['Everything in Pro', 'API access', 'Custom branding', '24/7 support'],
  },
];

export default function Pricing() {
  return (
    <div className="py-20" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 mb-4">
            Simple Pricing
          </h2>
          <p className="text-default-500">
            Choose the plan that works best for you
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="h-full"
            >
              <Card 
                className={`border-none h-full ${
                  plan.highlighted 
                    ? 'bg-primary/10 shadow-lg shadow-primary/30' 
                    : 'bg-background/60'
                } backdrop-blur-md`}
                isHoverable
              >
                <CardHeader className="flex-col items-center pt-8 px-6 pb-0">
                  {plan.highlighted && (
                    <Chip 
                      color="primary" 
                      variant="shadow"
                      className="absolute -top-1 p-2 mt-3 mb-3"
                    >
                      Most Popular
                    </Chip>
                  )}
                  <h3 className="text-xl font-semibold text-foreground mb-2 mt-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline mb-6">
                    <span className="text-4xl font-bold text-foreground">
                      {plan.price.split('/')[0]}
                    </span>
                    {plan.price !== 'Free' && (
                      <span className="text-default-500 ml-1">/month</span>
                    )}
                  </div>
                </CardHeader>
                <CardBody className="px-6 py-0 flex flex-col h-full">
                  <div className="flex-grow">
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center text-default-500">
                          <CheckIcon className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pb-8">
                    <Button
                      color={plan.highlighted ? "primary" : "default"}
                      variant={plan.highlighted ? "shadow" : "bordered"}
                      size="lg"
                      className="w-full font-semibold"
                    >
                      Get Started
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 