export function Header(){
    return (
        <header className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-6 py-4">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <button className="rounded-lg bg-blue-600 px-4 py-2 hover:bg-blue-500">
              Upgrade
            </button>
          </header>
    )
}