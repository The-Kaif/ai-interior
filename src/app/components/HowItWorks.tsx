export default function HowItWorks() {
  return (
    <div className="bg-white dark:bg-gray-900 py-20" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Transform your space in three simple steps
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: '01',
              title: 'Upload Your Room',
              description: 'Take a photo of your room and upload it to our platform',
            },
            {
              step: '02',
              title: 'Describe Your Vision',
              description: 'Tell us your design preferences and desired style',
            },
            {
              step: '03',
              title: 'Get AI Suggestions',
              description: 'Receive personalized design recommendations instantly',
            },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="inline-block bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 