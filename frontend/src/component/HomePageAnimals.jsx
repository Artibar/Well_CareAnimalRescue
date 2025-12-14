import AnimalCard from "./AnimalCard"
import {useState, useEffect} from "react"
import { PawPrint } from "lucide-react";
const HomePageAnimals = () => {
  const [animals, setAnimals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const BASE_URL = import.meta.env.MODE === 'development' ? 'http://localhost:3000' : '';

  useEffect(() => {
    fetchAnimals();
  }, []);

  const fetchAnimals = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/animal/get`);
      if (response.ok) {
        const data = await response.json();
        setAnimals(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Error fetching animals:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredAnimals = filter === 'all' 
    ? animals 
    : animals.filter(a => a.animalType?.toLowerCase() === filter.toLowerCase());

  const animalTypes = ['all', ...new Set(animals.map(a => a.animalType).filter(Boolean))];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">
            Meet Our Animals
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            These loving animals are looking for their forever homes. Give them a chance at a happy life!
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
          {animalTypes.map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-medium transition-all ${
                filter === type
                  ? 'bg-indigo-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
              }`}
            >
              {type === 'all' ? 'All Animals' : type}
            </button>
          ))}
        </div>

        {filteredAnimals.length === 0 ? (
          <div className="text-center py-12">
            <PawPrint className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No animals available at the moment</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredAnimals.map((animal, index) => (
              <AnimalCard key={animal._id || index} animal={animal} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default HomePageAnimals;