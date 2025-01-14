export default function Pricing() {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 py-20" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Simple Pricing
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Choose the plan that works best for you
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
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
          ].map((plan) => (
            <div
              key={plan.name}
              className={`bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm ${
                plan.highlighted ? 'ring-2 ring-blue-600' : ''
              }`}
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {plan.name}
              </h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                {plan.price}
              </p>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center text-gray-600 dark:text-gray-300">
                    <svg
                      className="h-5 w-5 text-blue-600 mr-2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-2 px-4 rounded ${
                plan.highlighted
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
              } transition-colors`}>
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 