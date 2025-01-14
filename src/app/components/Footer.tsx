export default function Footer() {
  return (
    <footer className="w-full py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <hr className="border-gray-200 dark:border-gray-800 mb-6" />
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* Creator Attribution */}
          <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">
            Made with <span className="text-red-500 animate-pulse">❤️</span> by Kaif
          </p>
          
          {/* Copyright */}
          <p className="text-gray-500 dark:text-gray-400 text-xs">
            © 2025 AI Interior Design. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 