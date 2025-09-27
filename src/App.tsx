import './App.css'
import { NavBar } from './Components/NavBar';


function App() {

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <NavBar />
      <div className="p-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to Wardrobe</h1>
        <p className="text-lg">Your personal clothing management app.</p>
      </div>
    </div>
  )
}

export default App
