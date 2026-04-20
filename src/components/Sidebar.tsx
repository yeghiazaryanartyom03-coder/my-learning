export function Sidebar() {
    return (
    <aside className="w-64 border-r border-slate-800 bg-slate-900 p-6">
        <h2 className="mb-8 text-2xl font-bold">SaaS</h2>

        <nav className="space-y-3">
            <div className="cursor-pointer rounded-lg bg-slate-800 px-4 py-3">
                Dashboard
            </div>
            <div className="cursor-pointer rounded-lg px-4 py-3 hover:bg-slate-800">
                Analytics
            </div>
            <div className="cursor-pointer rounded-lg px-4 py-3 hover:bg-slate-800">
                Billing
            </div>
            <div className="cursor-pointer rounded-lg px-4 py-3 hover:bg-slate-800">
                Settings
            </div>
        </nav>
    </aside>)

}