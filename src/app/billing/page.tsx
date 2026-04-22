import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";

export default function BillingPage() {
  return (
    <main className="min-h-screen text-white">
      <div className="flex min-h-screen">
        <Sidebar />

        <section className="flex-1">
          <Header />

          <div className="p-6 lg:p-8">
            <h1 className="mb-6 text-3xl font-bold">Billing</h1>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl bg-slate-800 p-6 shadow-lg">
                <h2 className="mb-4 text-xl font-semibold">Current Plan</h2>

                <p className="text-2xl font-bold">Pro Plan</p>

                <p className="mt-2 text-sm text-slate-400">
                  Full access to all premium features
                </p>
              </div>

              <div className="rounded-2xl bg-slate-800 p-6 shadow-lg">
                <h2 className="mb-4 text-xl font-semibold">
                  Subscription Status
                </h2>

                <p className="text-2xl font-bold">Active</p>

                <p className="mt-2 text-sm text-slate-400">
                  Your subscription is currently active
                </p>
              </div>

              <div className="rounded-2xl bg-slate-800 p-6 shadow-lg">
                <h2 className="mb-4 text-xl font-semibold">Next Payment</h2>

                <p className="text-2xl font-bold">May 15, 2026</p>

                <p className="mt-2 text-sm text-slate-400">
                  Automatic renewal enabled
                </p>
              </div>

              <div className="rounded-2xl bg-slate-800 p-6 shadow-lg">
                <h2 className="mb-4 text-xl font-semibold">Payment Method</h2>

                <p className="text-2xl font-bold">Visa **** 4242</p>

                <p className="mt-2 text-sm text-slate-400">
                  Default payment method
                </p>
              </div>
            </div>

            <div className="mt-8">
              <button className="rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500">
                Upgrade Plan
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
