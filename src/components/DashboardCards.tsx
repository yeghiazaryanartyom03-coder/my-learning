export function DashboardCards(){
    return (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-2xl bg-slate-900 p-6">
                <p className="text-sm text-slate-400">Revenue</p>
                <h3 className="mt-2 text-3xl font-bold">$12,450</h3>
              </div>

              <div className="rounded-2xl bg-slate-900 p-6">
                <p className="text-sm text-slate-400">Users</p>
                <h3 className="mt-2 text-3xl font-bold">1,240</h3>
              </div>

              <div className="rounded-2xl bg-slate-900 p-6">
                <p className="text-sm text-slate-400">Sales</p>
                <h3 className="mt-2 text-3xl font-bold">320</h3>
              </div>
            </div>
        )
}