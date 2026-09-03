export default function Home() {
  const PREFIX = process.env.NODE_ENV === 'production' ? '/ALFSTORE' : '';

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-red-600 mb-4">ALFSTORE</h1>
      <p className="text-xl text-gray-300">Del caos nace el carácter.</p>
    </main>
  );
}