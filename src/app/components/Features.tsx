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
    <div className="bg-gray-50 dark:bg-gray-800 py-20" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Features that Make Design Easy
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Everything you need to transform your space with confidence
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div 
              key={feature.name}
              className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm"
            >
              <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 