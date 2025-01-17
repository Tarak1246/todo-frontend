import './globals.css';

export const metadata = {
  title: "Todo App",
  description: "A simple Todo App built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-gray-100 min-h-screen">
        <header className="bg-gray-800 p-4 text-center">
          <h1 className="text-2xl font-bold text-blue-400">🚀 Todo App</h1>
        </header>
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
