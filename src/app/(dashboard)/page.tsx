import Dashboard from "@/src/shared/ui/dashboardd/Dashboard";

export default function Home() {

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
  <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
    <main className="p-4 dark:bg-zinc-900 sm:p-6 lg:p-8">
      <Dashboard />
    </main>
  </div>
</div>
  );
}
