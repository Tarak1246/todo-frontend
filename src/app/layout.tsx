import './globals.css';
import React from 'react';

export const metadata = {
  title: 'Todo App',
  description: 'Manage your tasks efficiently',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-white">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 bg-black text-white py-4 shadow-md z-10">
          <div className="max-w-4xl mx-auto flex items-center justify-center">
            <h1 className="text-xl font-bold">
              <span className="text-blue-400">Todo</span>{' '}
              <span className="text-purple-400">App</span>
            </h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="pt-[80px] max-w-4xl mx-auto px-4">
          {children}
        </main>
      </body>
    </html>
  );
}
