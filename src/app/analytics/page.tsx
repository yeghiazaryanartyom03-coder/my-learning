import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";

export default function AnalyticsPage() {
  return (
    <main className="min-h-screen text-white">
      <div className="flex min-h-screen">
        <Sidebar />

        <section className="flex-1">
          <Header />

          <div className="p-6 lg:p-8">
            <h1 className="mb-6 text-3xl font-bold">Analytics</h1>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-2xl bg-slate-800 p-6 shadow-lg">
                <h2 className="text-lg font-semibold">Monthly Usage</h2>

                <p className="mt-4 text-3xl font-bold">82%</p>

                <p className="mt-2 text-sm text-slate-400">
                  Usage of your monthly plan
                </p>
              </div>

              <div className="rounded-2xl bg-slate-800 p-6 shadow-lg">
                <h2 className="text-lg font-semibold">Active Sessions</h2>

                <p className="mt-4 text-3xl font-bold">14</p>

                <p className="mt-2 text-sm text-slate-400">
                  Across all devices
                </p>
              </div>

              <div className="rounded-2xl bg-slate-800 p-6 shadow-lg">
                <h2 className="text-lg font-semibold">Total Projects</h2>

                <p className="mt-4 text-3xl font-bold">27</p>

                <p className="mt-2 text-sm text-slate-400">Currently active</p>
              </div>

              <div className="rounded-2xl bg-slate-800 p-6 shadow-lg">
                <h2 className="text-lg font-semibold">Response Time</h2>

                <p className="mt-4 text-3xl font-bold">1.4s</p>

                <p className="mt-2 text-sm text-slate-400">
                  Average system response
                </p>
              </div>

              <div className="rounded-2xl bg-slate-800 p-6 shadow-lg">
                <h2 className="text-lg font-semibold">Success Rate</h2>

                <p className="mt-4 text-3xl font-bold">98.7%</p>

                <p className="mt-2 text-sm text-slate-400">
                  Completed operations
                </p>
              </div>

              <div className="rounded-2xl bg-slate-800 p-6 shadow-lg">
                <h2 className="text-lg font-semibold">Recent Activity</h2>

                <p className="mt-4 text-lg font-medium">126 actions</p>

                <p className="mt-2 text-sm text-slate-400">Last 7 days</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
