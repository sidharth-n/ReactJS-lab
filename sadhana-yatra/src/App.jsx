import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, useParams } from 'react-router-dom';
import { Moon, Sun, SearchIcon, FilterIcon } from 'lucide-react';
import destinationsData from './destinations.json';

// Theme context
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

const Header = () => {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">SadhanaYatra</h1>
        <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
          {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-800" />}
        </button>
      </div>
    </header>
  );
};

const SearchBar = ({ searchTerm, setSearchTerm }) => (
  <div className="relative flex-grow max-w-xl">
    <input
      type="text"
      placeholder="Search spiritual destinations"
      className="w-full p-2 pl-10 pr-4 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
  </div>
);

const FilterButton = ({ setShowFilters }) => (
  <button
    onClick={() => setShowFilters(true)}
    className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-blue-600 transition duration-300"
  >
    <FilterIcon size={20} />
    <span className="hidden sm:inline">Filters</span>
  </button>
);

const DestinationCard = ({ destination }) => (
  <Link to={`/destination/${destination.id}`} className="block">
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      <img src={destination.mainImage} alt={destination.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 dark:text-white">{destination.name}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-2">{destination.state}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{destination.significance}</p>
        <p className="mt-2 text-blue-600 dark:text-blue-400 font-semibold">{destination.cost}</p>
      </div>
    </div>
  </Link>
);

const Gallery = ({ images }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-6">
    {images.map((image, index) => (
      <img key={index} src={image} alt={`Gallery image ${index + 1}`} className="w-full h-40 object-cover rounded-lg" />
    ))}
  </div>
);

const DestinationDetail = () => {
  const { id } = useParams();
  const destination = destinationsData.destinations.find(d => d.id === parseInt(id));

  if (!destination) return <div className="text-center py-8 dark:text-white">Destination not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 dark:text-white">{destination.name}</h1>
      <img src={destination.mainImage} alt={destination.name} className="w-full h-64 md:h-96 object-cover rounded-lg mb-6" />
      <p className="text-xl mb-4 dark:text-gray-300">{destination.significance}</p>
      <p className="mb-4 dark:text-gray-300">{destination.description}</p>
      
      <h2 className="text-2xl font-semibold mb-2 dark:text-white">Spiritual Significance</h2>
      <p className="mb-4 dark:text-gray-300">{destination.spiritualSignificance}</p>

      <h2 className="text-2xl font-semibold mb-2 dark:text-white">Main Attraction</h2>
      <p className="mb-4 dark:text-gray-300">{destination.mainAttraction}</p>

      <h2 className="text-2xl font-semibold mb-2 dark:text-white">Activities</h2>
      <ul className="list-disc list-inside mb-4 dark:text-gray-300">
        {destination.activities.map((activity, index) => (
          <li key={index}>{activity}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mb-2 dark:text-white">Best Time to Visit</h2>
      <p className="mb-4 dark:text-gray-300">{destination.bestTimeToVisit}</p>

      <h2 className="text-2xl font-semibold mb-2 dark:text-white">Nearby Accommodations</h2>
      <ul className="list-disc list-inside mb-4 dark:text-gray-300">
        {destination.nearbyAccommodations.map((accommodation, index) => (
          <li key={index}>{accommodation}</li>
        ))}
      </ul>

      <p className="text-blue-600 dark:text-blue-400 font-semibold text-xl">Cost: {destination.cost}</p>

      <h2 className="text-2xl font-semibold my-4 dark:text-white">Gallery</h2>
      <Gallery images={destination.gallery} />
    </div>
  );
};

const App = () => {
  const [destinations, setDestinations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setDestinations(destinationsData.destinations);
  }, []);

  const filteredDestinations = destinations.filter(destination =>
    destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    destination.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
          <Header />
          <Routes>
            <Route path="/" element={
              <main className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
                  <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                  <FilterButton setShowFilters={setShowFilters} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredDestinations.map(destination => (
                    <DestinationCard key={destination.id} destination={destination} />
                  ))}
                </div>
              </main>
            } />
            <Route path="/destination/:id" element={<DestinationDetail />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;