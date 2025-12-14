import {PawPrint, Calendar, User, Heart} from "lucide-react"
const AnimalCard = ({ animal }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1">
      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-gray-200">
        {animal.image ? (
          <img 
            src={animal.image} 
            alt={animal.name || 'Animal'} 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-200 to-blue-200">
            <PawPrint className="w-16 h-16 text-indigo-400" />
          </div>
        )}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-xs sm:text-sm font-semibold text-indigo-600">
            {animal.animalType || 'Unknown'}
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
          {animal.name || 'Unnamed Animal'}
        </h3>
        
        {animal.description && (
          <p className="text-sm sm:text-base text-gray-600 mb-3 line-clamp-3">
            {animal.description}
          </p>
        )}

        <div className="space-y-2 mb-4">
          {animal.breed && (
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <PawPrint className="w-4 h-4 text-indigo-600" />
              <span className="font-medium">Breed:</span>
              <span>{animal.breed}</span>
            </div>
          )}
          {animal.age && (
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Calendar className="w-4 h-4 text-indigo-600" />
              <span className="font-medium">Age:</span>
              <span>{animal.age}</span>
            </div>
          )}
          {animal.gender && (
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <User className="w-4 h-4 text-indigo-600" />
              <span className="font-medium">Gender:</span>
              <span>{animal.gender}</span>
            </div>
          )}
        </div>

        <button 
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          onClick={() => window.location.href = '/adoption'}
        >
          <Heart className="w-4 h-4" />
          Adopt Me
        </button>
      </div>
    </div>
  );
};

export default AnimalCard;