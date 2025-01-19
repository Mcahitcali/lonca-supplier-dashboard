import VendorDropdown from './components/VendorDropdown'
import VendorSalesChart from './components/VendorSalesChart'
import { VendorProvider } from './context/VendorContext'

function App() {
  return (
    <VendorProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="py-6">
            <div className="flex items-center justify-center">
              <h1 className="text-3xl text-center font-bold text-gray-900">Supplier Dashboard</h1>
            </div>
          </header>

          {/* Main Content */}
          <main className="py-6">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="max-w-3xl mx-auto">
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <h2 className="text-xl font-semibold text-gray-800">Vendor</h2>
                    <VendorDropdown />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Choose a supplier to view their details and manage orders
                  </p>
                </div>
              </div>
            </div>

            {/* Sales Chart Section */}
            <div className="mt-6">
              <VendorSalesChart />
            </div>
          </main>
        </div>
      </div>
    </VendorProvider>
  )
}

export default App
