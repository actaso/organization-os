import { UserButton } from '@clerk/nextjs'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Organization OS
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Organization Canvas
          </h2>
          <p className="mt-2 text-gray-600">
            Visualize and manage your organization's roles and responsibilities
          </p>
        </div>

        {/* Canvas Container - This will be replaced with React Flow */}
        <div className="h-[600px] w-full rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg text-gray-500 mb-4">
              Canvas will be implemented in Phase 2
            </p>
            <p className="text-sm text-gray-400">
              This is where your organization roles will be displayed
            </p>
          </div>
        </div>
      </main>
    </div>
  )
} 