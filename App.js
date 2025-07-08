import React, { useState, useEffect } from 'react';
// molecularMysteryData import is removed as Module 5 is being skipped

// Main App Component for the Taxonomy Game
function App() {
  const [currentModule, setCurrentModule] = useState('intro'); // 'intro', 'historical', 'nomenclature', 'phylumFinder', 'keyConnoisseur', 'gameComplete' etc.
  const [score, setScore] = useState(0);
  const [completedModules, setCompletedModules] = useState({});

  // Data for the historical figures and their contributions (from Module 1)
  const historicalFiguresData = [
    {
      id: 'aristotle',
      name: 'Aristotle',
      era: 'Ancient Greece',
      contribution: 'Early classification based on observable characteristics (e.g., "blood" vs. "bloodless").',
      matchTerm: 'Observable Characteristics'
    },
    {
      id: 'linnaeus',
      name: 'Carolus Linnaeus',
      era: '18th Century',
      contribution: 'Developed binomial nomenclature and hierarchical classification (Kingdom to Species).',
      matchTerm: 'Binomial Nomenclature'
    },
    {
      id: 'darwin',
      name: 'Charles Darwin',
      era: '19th Century',
      contribution: 'Proposed the theory of evolution by natural selection, influencing phylogenetic classification.',
      matchTerm: 'Evolution by Natural Selection'
    },
    {
      id: 'haeckel',
      name: 'Ernst Haeckel',
      era: '19th Century',
      contribution: 'Introduced the concept of "Protista" and drew early phylogenetic trees.',
      matchTerm: 'Phylogenetic Trees'
    },
    {
      id: 'whittaker',
      name: 'Robert Whittaker',
      era: '20th Century',
      contribution: 'Proposed the Five-Kingdom classification system (Monera, Protista, Fungi, Plantae, Animalia).',
      matchTerm: 'Five-Kingdom System'
    }
  ];

  // Data for Nomenclature Module (Module 2)
  const nomenclatureData = {
    speciesNaming: [
      {
        id: 'human',
        commonName: 'Human',
        correctName: 'Homo sapiens',
        hint: 'Genus starts with H, species with s. Remember capitalization and italics!'
      },
      {
        id: 'lion',
        commonName: 'Lion',
        correctName: 'Panthera leo',
        hint: 'Genus P, species l.'
      },
      {
        id: 'domesticCat',
        commonName: 'Domestic Cat',
        correctName: 'Felis catus',
        hint: 'Genus F, species c.'
      },
      {
        id: 'maize',
        commonName: 'Maize (Corn)',
        correctName: 'Zea mays',
        hint: 'Genus Z, species m.'
      },
      {
        id: 'sunflower',
        commonName: 'Sunflower',
        correctName: 'Helianthus annuus',
        hint: 'Genus H, species a.'
      },
    ],
    taxonomicRanks: [
      { id: 'kingdom', name: 'Kingdom', order: 1 },
      { id: 'phylum', name: 'Phylum/Division', order: 2 },
      { id: 'class', name: 'Class', order: 3 },
      { id: 'order', name: 'Order', order: 4 },
      { id: 'family', name: 'Family', order: 5 },
      { id: 'genus', name: 'Genus', order: 6 },
      { id: 'species', name: 'Species', order: 7 },
    ]
  };

  // Data for Phylum Finder Module (Module 3)
  const phylumFinderData = {
    organisms: [
      {
        id: 'jellyfish',
        name: 'Jellyfish',
        group: 'Cnidaria',
        characteristics: ['Radial symmetry', 'Stinging cells (cnidocytes)', 'Two tissue layers'],
        imageUrl: 'https://placehold.co/150x150/87CEEB/FFFFFF?text=Jellyfish'
      },
      {
        id: 'earthworm',
        name: 'Earthworm',
        group: 'Annelida',
        characteristics: ['Segmented body', 'Closed circulatory system', 'Setae for movement'],
        imageUrl: 'https://placehold.co/150x150/8B4513/FFFFFF?text=Earthworm'
      },
      {
        id: 'fern',
        name: 'Fern',
        group: 'Pteridophyta',
        characteristics: ['Vascular tissue', 'Reproduces by spores', 'No seeds or flowers'],
        imageUrl: 'https://placehold.co/150x150/556B2F/FFFFFF?text=Fern'
      },
      {
        id: 'moss',
        name: 'Moss',
        group: 'Bryophyta',
        characteristics: ['Non-vascular plant', 'Reproduces by spores', 'No true roots, stems, or leaves'],
        imageUrl: 'https://placehold.co/150x150/6B8E23/FFFFFF?text=Moss'
      },
      {
        id: 'spider',
        name: 'Spider',
        group: 'Arthropoda',
        characteristics: ['Exoskeleton', 'Jointed appendages', 'Eight legs', 'Chelicerae'],
        imageUrl: 'https://placehold.co/150x150/4B0082/FFFFFF?text=Spider'
      },
      {
        id: 'mammal',
        name: 'Mammal',
        group: 'Mammalia (Class within Chordata)', // Simplified for this level
        characteristics: ['Hair/fur', 'Mammary glands', 'Warm-blooded', 'Vertebrate'],
        imageUrl: 'https://placehold.co/150x150/A0522D/FFFFFF?text=Mammal'
      },
    ],
    evolutionaryRelationships: [
      { id: 'plant_moss', name: 'Mosses', type: 'plant', ancestors: [] },
      { id: 'plant_fern', name: 'Ferns', type: 'plant', ancestors: ['plant_moss'] }, // Simplified: evolved from earlier land plants
      { id: 'plant_conifer', name: 'Conifers', type: 'plant', ancestors: ['plant_fern'] }, // Simplified: evolved from seed plants
      { id: 'plant_flowering', name: 'Flowering Plants', type: 'plant', ancestors: ['plant_conifer'] },

      { id: 'animal_cnidaria', name: 'Cnidaria (Jellyfish)', type: 'animal', ancestors: [] },
      { id: 'animal_annelida', name: 'Annelida (Worms)', type: 'animal', ancestors: ['animal_cnidaria'] }, // Simplified: bilateral symmetry
      { id: 'animal_arthropoda', name: 'Arthropoda (Insects, Spiders)', type: 'animal', ancestors: ['animal_annelida'] },
      { id: 'animal_chordata', name: 'Chordata (Vertebrates)', type: 'animal', ancestors: ['animal_arthropoda'] }, // Simplified
    ]
  };

  // Data for Key Connoisseur Module (Module 4)
  const keyConnoisseurData = {
    organismsToIdentify: [
      {
        id: 'oak_leaf',
        name: 'Oak Leaf',
        imageUrl: 'https://placehold.co/150x150/8B4513/FFFFFF?text=Oak+Leaf',
        correctId: 'Oak Tree'
      },
      {
        id: 'butterfly',
        name: 'Butterfly',
        imageUrl: 'https://placehold.co/150x150/FFD700/000000?text=Butterfly',
        correctId: 'Insect'
      },
      {
        id: 'mushroom',
        name: 'Mushroom',
        imageUrl: 'https://placehold.co/150x150/D2B48C/000000?text=Mushroom',
        correctId: 'Fungus'
      }
    ],
    dichotomousKeys: {
      'plant_key': [
        { id: '1a', text: 'Leaves simple (not divided into leaflets)', next: '2a' },
        { id: '1b', text: 'Leaves compound (divided into leaflets)', next: 'Maple Tree' },
        { id: '2a', text: 'Leaf margin smooth or wavy', next: '3a' },
        { id: '2b', text: 'Leaf margin toothed or lobed', next: 'Oak Tree' },
        { id: '3a', text: 'Leaf shape oval', next: 'Willow Tree' },
        { id: '3b', text: 'Leaf shape heart-shaped', next: 'Linden Tree' },
      ],
      'animal_key': [
        { id: '1a', text: 'Has wings', next: '2a' },
        { id: '1b', text: 'Does not have wings', next: '3a' },
        { id: '2a', text: 'Has antennae and six legs', next: 'Insect' },
        { id: '2b', text: 'Has feathers and two legs', next: 'Bird' },
        { id: '3a', text: 'Has an exoskeleton and eight legs', next: 'Spider' },
        { id: '3b', text: 'Has soft body and moves by muscular foot', next: 'Snail' },
      ],
      'general_organism_key': [
        { id: '1a', text: 'Photosynthetic (makes its own food)', next: '2a' },
        { id: '1b', text: 'Heterotrophic (gets food from others)', next: '3a' },
        { id: '2a', text: 'Has true roots, stems, and leaves', next: 'Flowering Plant' },
        { id: '2b', text: 'No true roots, stems, or leaves; small and lives in damp places', next: 'Moss' },
        { id: '3a', text: 'Has cell walls, reproduces by spores, no chlorophyll', next: 'Fungus' },
        { id: '3b', text: 'No cell walls, moves actively, ingests food', next: 'Animal' },
      ]
    }
  };


  // Component for the Introduction Screen
  const IntroScreen = ({ onStartGame }) => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-200 to-blue-200 p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-2xl w-full text-center border-4 border-purple-500 animate-fade-in">
        <h1 className="text-5xl font-extrabold text-purple-700 mb-6 font-inter tracking-tight">
          Taxonomy Trailblazers: The Classification Quest
        </h1>
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          Embark on an exciting journey through the history and principles of plant and animal taxonomy!
          Become a master classifier by exploring historical eras, identifying organisms, and understanding
          the intricate web of life.
        </p>
        <button
          onClick={() => onStartGame('historical')}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300 text-xl"
        >
          Start Your Quest!
        </button>
      </div>
    </div>
  );

  // Component for the Historical Timeline (from Module 1)
  const HistoricalTimeline = ({ figures, onModuleComplete }) => {
    const [selectedFigure, setSelectedFigure] = useState(null);

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-6 font-inter">
        <div className="bg-white p-8 rounded-xl shadow-2xl max-w-4xl w-full border-4 border-indigo-500">
          <h2 className="text-4xl font-extrabold text-indigo-700 mb-8 text-center">
            Module 1: The Foundations of Classification
          </h2>
          <p className="text-lg text-gray-700 mb-8 text-center leading-relaxed">
            Explore the brilliant minds who laid the groundwork for modern taxonomy. Click on each figure to learn about their monumental contributions.
          </p>

          {/* Timeline Display */}
          <div className="relative flex justify-between items-start my-10">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-indigo-300 -translate-y-1/2"></div>
            {figures.map((figure, index) => (
              <div
                key={figure.id}
                className="relative flex flex-col items-center cursor-pointer group"
                onClick={() => setSelectedFigure(figure)}
              >
                <div className="w-6 h-6 bg-indigo-500 rounded-full border-4 border-white z-10 transition-all group-hover:scale-125 group-hover:bg-indigo-700"></div>
                <div className="mt-4 text-center text-indigo-800 font-semibold group-hover:text-indigo-900 transition-colors">
                  {figure.name}
                </div>
                <div className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                  {figure.era}
                </div>
              </div>
            ))}
          </div>

          {/* Figure Details Pop-up */}
          {selectedFigure && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white p-8 rounded-xl shadow-2xl max-w-xl w-full text-center relative border-4 border-indigo-600 animate-scale-in">
                <button
                  onClick={() => setSelectedFigure(null)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold"
                >
                  &times;
                </button>
                <h3 className="text-3xl font-bold text-indigo-700 mb-4">{selectedFigure.name}</h3>
                <p className="text-lg text-gray-800 mb-4 italic">{selectedFigure.era}</p>
                <p className="text-md text-gray-700 leading-relaxed">{selectedFigure.contribution}</p>
              </div>
            </div>
          )}

          <div className="text-center mt-10">
            <button
              onClick={() => onModuleComplete(true)} // Indicate module completion
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300 text-xl"
            >
              Proceed to Challenge
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Component for the Match the Pioneer Challenge (Drag and Drop) (from Module 1)
  const MatchThePioneer = ({ figures, onCompleteChallenge, updateScore }) => {
    // Shuffle the figures for the drag items
    const [dragItems, setDragItems] = useState(
      [...figures].sort(() => Math.random() - 0.5)
    );
    // Shuffle the figures for the drop targets
    const [dropTargets, setDropTargets] = useState(
      [...figures].sort(() => Math.random() - 0.5)
    );
    const [matches, setMatches] = useState({}); // { dropTargetId: dragItemId }
    const [feedback, setFeedback] = useState({}); // { dropTargetId: 'correct' | 'incorrect' }
    const [draggedItem, setDraggedItem] = useState(null);
    const [isChallengeComplete, setIsChallengeComplete] = useState(false);

    // Handle drag start
    const handleDragStart = (e, item) => {
      setDraggedItem(item);
      e.dataTransfer.setData('text/plain', item.id); // Set data for drag operation
    };

    // Handle drag over (prevent default to allow drop)
    const handleDragOver = (e) => {
      e.preventDefault();
    };

    // Handle drop
    const handleDrop = (e, target) => {
      e.preventDefault();
      const itemId = e.dataTransfer.getData('text/plain');
      const item = dragItems.find(d => d.id === itemId);

      if (item && !matches[target.id]) { // Only allow dropping if target is empty
        const newMatches = { ...matches, [target.id]: item.id };
        setMatches(newMatches);

        // Check if the match is correct
        if (item.id === target.id) {
          setFeedback(prev => ({ ...prev, [target.id]: 'correct' }));
          updateScore(10); // Add points for correct match
        } else {
          setFeedback(prev => ({ ...prev, [target.id]: 'incorrect' }));
        }

        // Check if all targets have a match
        if (Object.keys(newMatches).length === figures.length) {
          // Give a brief moment for feedback to show before completing
          setTimeout(() => {
            setIsChallengeComplete(true);
          }, 1000);
        }
      }
    };

    // Reset the challenge (not used in current flow but good for retry)
    const resetChallenge = () => {
      setDragItems([...figures].sort(() => Math.random() - 0.5));
      setDropTargets([...figures].sort(() => Math.random() - 0.5));
      setMatches({});
      setFeedback({});
      setDraggedItem(null);
      setIsChallengeComplete(false);
    };

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-pink-200 p-6 font-inter">
        <div className="bg-white p-8 rounded-xl shadow-2xl max-w-4xl w-full border-4 border-pink-500 text-center">
          <h2 className="text-4xl font-extrabold text-pink-700 mb-8">
            Challenge: Match the Pioneer!
          </h2>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            Drag each historical figure's name to their correct contribution.
          </p>

          <div className="grid grid-cols-2 gap-8 mb-10">
            {/* Drag Items (Figure Names) */}
            <div className="flex flex-col items-center gap-4 p-4 bg-pink-50 rounded-lg border border-pink-200">
              <h3 className="text-2xl font-bold text-pink-600 mb-4">Figures</h3>
              {dragItems.map((item) => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item)}
                  className={`cursor-grab bg-pink-300 text-pink-900 font-semibold py-3 px-6 rounded-lg shadow-md w-full max-w-xs text-center transition-all duration-200
                    ${Object.values(matches).includes(item.id) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-pink-400 transform hover:scale-105'}`}
                >
                  {item.name}
                </div>
              ))}
            </div>

            {/* Drop Targets (Contributions) */}
            <div className="flex flex-col items-center gap-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h3 className="text-2xl font-bold text-purple-600 mb-4">Contributions</h3>
              {dropTargets.map((target) => (
                <div
                  key={target.id}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, target)}
                  className={`relative border-2 border-dashed p-4 rounded-lg w-full max-w-xs h-24 flex items-center justify-center text-center transition-all duration-200
                    ${feedback[target.id] === 'correct' ? 'border-green-500 bg-green-100' :
                      feedback[target.id] === 'incorrect' ? 'border-red-500 bg-red-100' :
                      'border-gray-300 bg-white hover:bg-gray-50'}`}
                >
                  {matches[target.id] ? (
                    <span className={`font-semibold ${feedback[target.id] === 'correct' ? 'text-green-700' : 'text-red-700'}`}>
                      {dragItems.find(d => d.id === matches[target.id])?.name}
                    </span>
                  ) : (
                    <span className="text-gray-500">{target.matchTerm}</span>
                  )}
                  {feedback[target.id] && (
                    <div className={`absolute -top-3 right-2 text-sm font-bold px-2 py-1 rounded-full
                      ${feedback[target.id] === 'correct' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                      {feedback[target.id] === 'correct' ? '✓' : '✗'}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {isChallengeComplete && (
            <div className="mt-8">
              <h3 className="text-3xl font-bold text-green-700 mb-4">Challenge Complete!</h3>
              <p className="text-xl text-gray-800 mb-6">
                You've successfully matched the pioneers to their contributions.
              </p>
              <button
                onClick={() => onCompleteChallenge(true)}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300 text-xl"
              >
                Continue to Next Module
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Component for Nomenclature Module Introduction
  const NomenclatureIntro = ({ onStartChallenge }) => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 to-orange-200 p-6 font-inter">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-3xl w-full text-center border-4 border-orange-500 animate-fade-in">
        <h2 className="text-4xl font-extrabold text-orange-700 mb-6">
          Module 2: Nomenclature Naming Ceremony
        </h2>
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          Welcome to the world of scientific naming! In this module, you'll master the art of binomial nomenclature and understand the hierarchical structure of life. Get ready to name species like a pro!
        </p>
        <button
          onClick={() => onStartChallenge('nameThatSpecies')}
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 text-xl"
        >
          Start "Name That Species!"
        </button>
      </div>
    </div>
  );

  // Component for "Name That Species!" Challenge
  const NameThatSpecies = ({ speciesData, onCompleteChallenge, updateScore }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answer, setAnswer] = useState('');
    const [feedback, setFeedback] = useState('');
    const [isCorrect, setIsCorrect] = useState(null);
    const [showHint, setShowHint] = useState(false);

    const currentSpecies = speciesData[currentQuestionIndex];

    const handleSubmit = () => {
      // Normalize input for comparison: remove spaces, convert to lowercase, remove italics tags
      const cleanAnswer = answer.replace(/<\/?i>/g, '').toLowerCase().trim().replace(/\s+/g, ' ');
      const cleanCorrect = currentSpecies.correctName.replace(/<\/?i>/g, '').toLowerCase().trim().replace(/\s+/g, ' ');

      if (cleanAnswer === cleanCorrect) {
        setFeedback('Correct! Excellent work.');
        setIsCorrect(true);
        updateScore(20); // Award points for correct answer
      } else {
        setFeedback(`Incorrect. The correct name is: ${currentSpecies.correctName}`);
        setIsCorrect(false);
      }

      setTimeout(() => {
        if (currentQuestionIndex < speciesData.length - 1) {
          setCurrentQuestionIndex(prev => prev + 1);
          setAnswer('');
          setFeedback('');
          setIsCorrect(null);
          setShowHint(false);
        } else {
          onCompleteChallenge(true); // All questions answered
        }
      }, 2000); // Show feedback for 2 seconds
    };

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-100 to-pink-200 p-6 font-inter">
        <div className="bg-white p-8 rounded-xl shadow-2xl max-w-3xl w-full text-center border-4 border-pink-500">
          <h2 className="text-4xl font-extrabold text-pink-700 mb-8">
            Challenge: Name That Species!
          </h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Type the correct scientific (binomial) name for the following organism. Remember the rules of nomenclature!
          </p>

          <div className="bg-pink-50 p-6 rounded-lg border border-pink-200 mb-8">
            <p className="text-2xl font-semibold text-pink-800 mb-4">
              Common Name: {currentSpecies.commonName}
            </p>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="e.g., Homo sapiens"
              className="w-full p-3 border-2 border-pink-300 rounded-lg text-lg focus:outline-none focus:border-pink-500 mb-4"
              onKeyPress={(e) => { if (e.key === 'Enter') handleSubmit(); }}
            />
            <button
              onClick={handleSubmit}
              className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-pink-300 text-lg mr-4"
            >
              Submit Answer
            </button>
            <button
              onClick={() => setShowHint(prev => !prev)}
              className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-300 text-lg"
            >
              {showHint ? 'Hide Hint' : 'Show Hint'}
            </button>
            {showHint && (
              <p className="text-md text-gray-600 mt-4 italic">{currentSpecies.hint}</p>
            )}
          </div>

          {feedback && (
            <div className={`p-4 rounded-lg text-white font-bold text-xl ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`}>
              {feedback}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Component for "Rank Runner" Challenge
  const RankRunner = ({ ranksData, onCompleteChallenge, updateScore }) => {
    const [shuffledRanks, setShuffledRanks] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState([]);
    const [message, setMessage] = useState('');
    const [isChallengeComplete, setIsChallengeComplete] = useState(false);

    useEffect(() => {
      // Shuffle ranks for the initial display
      setShuffledRanks([...ranksData].sort(() => Math.random() - 0.5));
    }, [ranksData]);

    const handleRankClick = (rank) => {
      if (!selectedOrder.includes(rank)) {
        setSelectedOrder([...selectedOrder, rank]);
      }
    };

    const handleReset = () => {
      setSelectedOrder([]);
      setShuffledRanks([...ranksData].sort(() => Math.random() - 0.5));
      setMessage('');
    };

    const handleSubmit = () => {
      if (selectedOrder.length !== ranksData.length) {
        setMessage('Please select all ranks.');
        return;
      }

      // Check if the selected order matches the correct order
      const correctOrderIds = ranksData.sort((a, b) => a.order - b.order).map(r => r.id);
      const selectedOrderIds = selectedOrder.map(r => r.id);

      const isCorrectOrder = JSON.stringify(correctOrderIds) === JSON.stringify(selectedOrderIds);

      if (isCorrectOrder) {
        setMessage('Excellent! You got the correct hierarchical order!');
        updateScore(30); // Award points for correct order
        setIsChallengeComplete(true);
      } else {
        setMessage('Not quite right. Try again! Remember, Kingdom is the broadest, Species is the most specific.');
      }
    };

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-6 font-inter">
        <div className="bg-white p-8 rounded-xl shadow-2xl max-w-4xl w-full text-center border-4 border-purple-500">
          <h2 className="text-4xl font-extrabold text-purple-700 mb-8">
            Challenge: Rank Runner!
          </h2>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            Arrange the taxonomic ranks from the broadest (most inclusive) to the most specific. Click on the ranks in the correct order.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* Available Ranks to Select */}
            <div className="flex flex-col items-center gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="text-2xl font-bold text-blue-600 mb-4">Available Ranks</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {shuffledRanks.map((rank) => (
                  <button
                    key={rank.id}
                    onClick={() => handleRankClick(rank)}
                    disabled={selectedOrder.includes(rank) || isChallengeComplete}
                    className={`px-6 py-3 rounded-full font-semibold shadow-md transition-all duration-200
                      ${selectedOrder.includes(rank) ? 'bg-gray-300 text-gray-700 cursor-not-allowed' : 'bg-blue-300 text-blue-900 hover:bg-blue-400 transform hover:scale-105'}`}
                  >
                    {rank.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Order */}
            <div className="flex flex-col items-center gap-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h3 className="text-2xl font-bold text-purple-600 mb-4">Your Order</h3>
              <div className="flex flex-col items-center gap-2 w-full">
                {selectedOrder.length > 0 ? (
                  selectedOrder.map((rank, index) => (
                    <div key={rank.id} className="bg-purple-300 text-purple-900 font-semibold py-2 px-4 rounded-lg w-full max-w-xs text-center">
                      {index + 1}. {rank.name}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 italic">Click ranks to add them here...</p>
                )}
              </div>
            </div>
          </div>

          {message && (
            <div className={`p-4 rounded-lg text-white font-bold text-xl mb-6 ${isChallengeComplete ? 'bg-green-500' : 'bg-red-500'}`}>
              {message}
            </div>
          )}

          {!isChallengeComplete && (
            <div className="mt-8">
              <button
                onClick={handleSubmit}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300 text-xl mr-4"
              >
                Check Order
              </button>
              <button
                onClick={handleReset}
                className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-300 text-xl"
              >
                Reset
              </button>
            </div>
          )}

          {isChallengeComplete && (
            <div className="mt-8">
              <button
                onClick={() => onCompleteChallenge(true)}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300 text-xl"
              >
                Continue to Next Module
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Component for Phylum Finder Module Introduction
  const PhylumFinderIntro = ({ onStartChallenge }) => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-teal-100 to-cyan-200 p-6 font-inter">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-3xl w-full text-center border-4 border-cyan-500 animate-fade-in">
        <h2 className="text-4xl font-extrabold text-cyan-700 mb-6">
          Module 3: Phylum Finder Expedition
        </h2>
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          It's time to explore the incredible diversity of life! In this module, you'll learn to identify major plant and animal groups by their unique characteristics and understand their evolutionary journey.
        </p>
        <button
          onClick={() => onStartChallenge('characteristicCatcher')}
          className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-300 text-xl"
        >
          Start "Characteristic Catcher!"
        </button>
      </div>
    </div>
  );

  // Component for "Characteristic Catcher" Challenge
  const CharacteristicCatcher = ({ organismsData, onCompleteChallenge, updateScore }) => {
    const [currentOrganismIndex, setCurrentOrganismIndex] = useState(0);
    const [selectedCharacteristics, setSelectedCharacteristics] = useState([]);
    const [feedback, setFeedback] = useState('');
    const [isCorrect, setIsCorrect] = useState(null);

    const currentOrganism = organismsData[currentOrganismIndex];
    const allCharacteristics = Array.from(new Set(organismsData.flatMap(o => o.characteristics))).sort(); // Get all unique characteristics

    const handleCharacteristicToggle = (char) => {
      setSelectedCharacteristics(prev =>
        prev.includes(char)
          ? prev.filter(c => c !== char)
          : [...prev, char]
      );
    };

    const handleSubmit = () => {
      const correctCharacteristics = currentOrganism.characteristics;
      const allSelectedAreCorrect = selectedCharacteristics.every(char => correctCharacteristics.includes(char));
      const allCorrectAreSelected = correctCharacteristics.every(char => selectedCharacteristics.includes(char));

      if (allSelectedAreCorrect && allCorrectAreSelected && selectedCharacteristics.length === correctCharacteristics.length) {
        setFeedback(`Correct! This is a ${currentOrganism.group}.`);
        setIsCorrect(true);
        updateScore(25); // Award points
      } else {
        setFeedback(`Incorrect. The correct characteristics for ${currentOrganism.name} are: ${correctCharacteristics.join(', ')}.`);
        setIsCorrect(false);
      }

      setTimeout(() => {
        if (currentOrganismIndex < organismsData.length - 1) {
          setCurrentOrganismIndex(prev => prev + 1);
          setSelectedCharacteristics([]);
          setFeedback('');
          setIsCorrect(null);
        } else {
          onCompleteChallenge(true); // All organisms identified
        }
      }, 3000); // Show feedback for 3 seconds
    };

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-lime-200 p-6 font-inter">
        <div className="bg-white p-8 rounded-xl shadow-2xl max-w-4xl w-full border-4 border-lime-500 text-center">
          <h2 className="text-4xl font-extrabold text-lime-700 mb-8">
            Challenge: Characteristic Catcher!
          </h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Identify the correct characteristics for the organism shown below.
          </p>

          <div className="bg-lime-50 p-6 rounded-lg border border-lime-200 mb-8 flex flex-col md:flex-row items-center justify-center gap-6">
            <img
              src={currentOrganism.imageUrl}
              alt={currentOrganism.name}
              className="w-40 h-40 object-cover rounded-lg shadow-md border-2 border-lime-300"
              onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/150x150/CCCCCC/000000?text=${currentOrganism.name}`; }}
            />
            <div className="text-left md:text-center">
              <p className="text-3xl font-bold text-lime-800 mb-4">{currentOrganism.name}</p>
              <p className="text-lg text-gray-700">Select all distinguishing characteristics:</p>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {allCharacteristics.map(char => (
                  <button
                    key={char}
                    onClick={() => handleCharacteristicToggle(char)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200
                      ${selectedCharacteristics.includes(char) ? 'bg-lime-600 text-white shadow-lg' : 'bg-lime-200 text-lime-800 hover:bg-lime-300'}`}
                  >
                    {char}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-lime-300 text-xl"
          >
            Submit Characteristics
          </button>

          {feedback && (
            <div className={`mt-6 p-4 rounded-lg text-white font-bold text-xl ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`}>
              {feedback}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Component for "Evolutionary Web" Challenge
  const EvolutionaryWeb = ({ relationshipsData, onCompleteChallenge, updateScore }) => {
    const [nodes, setNodes] = useState([]); // Nodes for the web
    const [connections, setConnections] = useState([]); // User-drawn connections
    const [selectedNode, setSelectedNode] = useState(null); // Node currently selected for connection
    const [feedback, setFeedback] = useState('');
    const [isChallengeComplete, setIsChallengeComplete] = useState(false);

    useEffect(() => {
      // Initialize nodes with random positions for a "web" feel
      const initialNodes = relationshipsData.map(item => ({
        ...item,
        x: Math.random() * 600 + 100, // Random X position
        y: Math.random() * 400 + 100, // Random Y position
      }));
      setNodes(initialNodes);
    }, [relationshipsData]);

    const handleNodeClick = (node) => {
      if (isChallengeComplete) return;

      if (!selectedNode) {
        setSelectedNode(node);
        setMessage(`Selected: ${node.name}. Now click on the organism it evolved FROM or is closely related to.`);
      } else if (selectedNode.id === node.id) {
        setSelectedNode(null); // Deselect if clicked again
        setMessage('');
      } else {
        // Attempt to create a connection
        const newConnection = { from: selectedNode.id, to: node.id };
        // Check for duplicate connection (order doesn't matter for duplicates)
        const isDuplicate = connections.some(conn =>
          (conn.from === newConnection.from && conn.to === newConnection.to) ||
          (conn.from === newConnection.to && conn.to === newConnection.from)
        );

        if (!isDuplicate) {
          setConnections(prev => [...prev, newConnection]);
          setMessage(`Connected ${selectedNode.name} to ${node.name}.`);
        } else {
          setMessage('Connection already exists!');
        }
        setSelectedNode(null); // Reset selection
      }
    };

    const handleSubmit = () => {
      let correctConnectionsCount = 0;
      let totalPossibleConnections = 0;

      relationshipsData.forEach(item => {
        item.ancestors.forEach(ancestorId => {
          totalPossibleConnections++;
          const foundConnection = connections.some(conn =>
            (conn.from === item.id && conn.to === ancestorId) ||
            (conn.from === ancestorId && conn.to === item.id)
          );
          if (foundConnection) {
            correctConnectionsCount++;
          }
        });
      });

      if (correctConnectionsCount === totalPossibleConnections && connections.length === totalPossibleConnections) {
        setFeedback('Fantastic! You\'ve correctly mapped the evolutionary web!');
        updateScore(50);
        setIsChallengeComplete(true);
      } else {
        setFeedback(`Not quite right. You made ${correctConnectionsCount} out of ${totalPossibleConnections} correct connections. Keep trying!`);
      }
    };

    const resetChallenge = () => {
      setConnections([]);
      setSelectedNode(null);
      setFeedback('');
      setIsChallengeComplete(false);
      setMessage('');
      // Re-shuffle nodes for a new layout
      setNodes(relationshipsData.map(item => ({
        ...item,
        x: Math.random() * 600 + 100,
        y: Math.random() * 400 + 100,
      })));
    };

    const [message, setMessage] = useState('');

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 p-6 font-inter">
        <div className="bg-white p-8 rounded-xl shadow-2xl max-w-5xl w-full border-4 border-purple-500 text-center">
          <h2 className="text-4xl font-extrabold text-purple-700 mb-8">
            Challenge: Evolutionary Web!
          </h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Click on two organisms to draw a line between them, indicating an evolutionary relationship (e.g., one evolved from the other, or they share a recent common ancestor). Try to connect all related groups!
          </p>

          <div className="relative w-full h-[500px] bg-gray-50 border-2 border-gray-300 rounded-lg mb-8 overflow-hidden">
            {/* Render connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {connections.map((conn, index) => {
                const fromNode = nodes.find(n => n.id === conn.from);
                const toNode = nodes.find(n => n.id === conn.to);
                if (fromNode && toNode) {
                  return (
                    <line
                      key={index}
                      x1={fromNode.x}
                      y1={fromNode.y}
                      x2={toNode.x}
                      y2={toNode.y}
                      stroke="purple"
                      strokeWidth="3"
                      className="animate-draw-line"
                    />
                  );
                }
                return null;
              })}
            </svg>

            {/* Render nodes */}
            {nodes.map(node => (
              <div
                key={node.id}
                className={`absolute p-3 rounded-full shadow-lg cursor-pointer transition-all duration-200 border-2
                  ${selectedNode && selectedNode.id === node.id ? 'bg-purple-600 text-white border-purple-800 scale-110' : 'bg-purple-300 text-purple-900 border-purple-400 hover:bg-purple-400'}
                  ${node.type === 'plant' ? 'bg-green-300 text-green-900 border-green-400' : 'bg-blue-300 text-blue-900 border-blue-400'}
                  ${selectedNode && selectedNode.id === node.id && node.type === 'plant' ? 'bg-green-600 text-white border-green-800 scale-110' : ''}
                  ${selectedNode && selectedNode.id === node.id && node.type === 'animal' ? 'bg-blue-600 text-white border-blue-800 scale-110' : ''}
                `}
                style={{ left: node.x, top: node.y }}
                onClick={() => handleNodeClick(node)}
              >
                {node.name}
              </div>
            ))}
          </div>

          {message && (
            <p className="text-lg text-gray-700 mb-4">{message}</p>
          )}

          {feedback && (
            <div className={`mt-6 p-4 rounded-lg text-white font-bold text-xl mb-6 ${isChallengeComplete ? 'bg-green-500' : 'bg-red-500'}`}>
              {feedback}
            </div>
          )}

          {!isChallengeComplete && (
            <div className="mt-8">
              <button
                onClick={handleSubmit}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300 text-xl mr-4"
              >
                Check Connections
              </button>
              <button
                onClick={resetChallenge}
                className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-300 text-xl"
              >
                Reset
              </button>
            </div>
          )}

          {isChallengeComplete && (
            <div className="mt-8">
              <button
                onClick={() => onCompleteChallenge(true)}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300 text-xl"
              >
                Continue to Next Module
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Component for Key Connoisseur Module Introduction
  const KeyConnoisseurIntro = ({ onStartChallenge }) => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 p-6 font-inter">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-3xl w-full text-center border-4 border-purple-500 animate-fade-in">
        <h2 className="text-4xl font-extrabold text-purple-700 mb-6">
          Module 4: Key Connoisseur Challenge
        </h2>
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          Unlock the secrets of identification! In this module, you'll master the use of taxonomic keys to accurately classify unknown organisms. Your keen observation skills will be put to the test!
        </p>
        <button
          onClick={() => onStartChallenge('dichotomousDetective')}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300 text-xl"
        >
          Start "Dichotomous Detective!"
        </button>
      </div>
    </div>
  );

  // Component for "Dichotomous Detective" Challenge
  const DichotomousDetective = ({ organismsToIdentify, dichotomousKeys, onCompleteChallenge, updateScore }) => {
    const [currentOrganismIndex, setCurrentOrganismIndex] = useState(0);
    const [currentKeyStep, setCurrentKeyStep] = useState('1a'); // Starting point of the key
    const [feedback, setFeedback] = useState('');
    const [isCorrect, setIsCorrect] = useState(null);
    const [currentKeyType, setCurrentKeyType] = useState('general_organism_key'); // Default key

    const currentOrganism = organismsToIdentify[currentOrganismIndex];
    const currentKey = dichotomousKeys[currentKeyType];

    // Find the current pair of key choices (e.g., 1a and 1b)
    const currentChoices = currentKey.filter(step => step.id.startsWith(currentKeyStep.charAt(0)));

    const handleChoice = (choiceId) => {
      const chosenStep = currentKey.find(step => step.id === choiceId);
      if (!chosenStep) return;

      if (chosenStep.next.includes(' ')) { // It's an identification (e.g., "Oak Tree")
        if (chosenStep.next === currentOrganism.correctId) {
          setFeedback(`Correct! You identified the ${currentOrganism.name} as a ${currentOrganism.correctId}.`);
          setIsCorrect(true);
          updateScore(40); // Award points
        } else {
          setFeedback(`Incorrect. That's not a ${currentOrganism.correctId}. The key led you to ${chosenStep.next}.`);
          setIsCorrect(false);
        }

        setTimeout(() => {
          if (currentOrganismIndex < organismsToIdentify.length - 1) {
            setCurrentOrganismIndex(prev => prev + 1);
            setCurrentKeyStep('1a'); // Reset key for next organism
            setFeedback('');
            setIsCorrect(null);
            // Potentially change key type for next organism if data allows
            if (organismsToIdentify[currentOrganismIndex + 1].id.includes('leaf')) {
              setCurrentKeyType('plant_key');
            } else if (organismsToIdentify[currentOrganismIndex + 1].id.includes('butterfly')) {
              setCurrentKeyType('animal_key');
            } else {
              setCurrentKeyType('general_organism_key');
            }
          } else {
            onCompleteChallenge(true); // All organisms identified
          }
        }, 3000);
      } else { // It's a pointer to the next step (e.g., "2a")
        setCurrentKeyStep(chosenStep.next);
        setFeedback('');
        setIsCorrect(null);
      }
    };

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 to-orange-200 p-6 font-inter">
        <div className="bg-white p-8 rounded-xl shadow-2xl max-w-4xl w-full text-center border-4 border-orange-500">
          <h2 className="text-4xl font-extrabold text-orange-700 mb-8">
            Challenge: Dichotomous Detective!
          </h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Use the dichotomous key to identify the organism shown below. Click on the statement that best describes the organism.
          </p>

          <div className="bg-orange-50 p-6 rounded-lg border border-orange-200 mb-8 flex flex-col md:flex-row items-center justify-center gap-6">
            <img
              src={currentOrganism.imageUrl}
              alt={currentOrganism.name}
              className="w-48 h-48 object-cover rounded-lg shadow-md border-2 border-orange-300"
              onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/200x200/CCCCCC/000000?text=${currentOrganism.name}`; }}
            />
            <div className="text-left md:text-center flex-grow">
              <p className="text-3xl font-bold text-orange-800 mb-4">Identify: {currentOrganism.name}</p>
              <div className="flex flex-col gap-3">
                {currentChoices.map(choice => (
                  <button
                    key={choice.id}
                    onClick={() => handleChoice(choice.id)}
                    className="bg-orange-300 text-orange-900 font-semibold py-3 px-6 rounded-lg shadow-md w-full text-left transition-all duration-200 hover:bg-orange-400 transform hover:scale-[1.02]"
                  >
                    <span className="font-bold mr-2">{choice.id}.</span> {choice.text}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {feedback && (
            <div className={`mt-6 p-4 rounded-lg text-white font-bold text-xl ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`}>
              {feedback}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Component for Game Completion Screen
  const GameCompleteScreen = ({ finalScore, onRestartGame }) => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-200 to-green-200 p-6 font-inter">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-2xl w-full text-center border-4 border-green-500 animate-fade-in">
        <h2 className="text-5xl font-extrabold text-green-700 mb-6">
          Congratulations, Taxonomy Trailblazer!
        </h2>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          You have successfully completed all modules of the Classification Quest!
          You've explored the history of taxonomy, mastered scientific naming,
          identified diverse organisms, and navigated taxonomic keys.
        </p>
        <p className="text-4xl font-bold text-green-800 mb-8">
          Your Final Score: {finalScore} points!
        </p>
        <button
          onClick={onRestartGame}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300 text-xl"
        >
          Play Again!
        </button>
      </div>
    </div>
  );


  // Main rendering logic based on currentModule state
  return (
    <div className="font-inter">
      {currentModule === 'intro' && (
        <IntroScreen onStartGame={setCurrentModule} />
      )}

      {/* Module 1: Historical Foundations */}
      {currentModule === 'historical' && !completedModules.historicalTimeline && (
        <HistoricalTimeline
          figures={historicalFiguresData}
          onModuleComplete={() => setCompletedModules(prev => ({ ...prev, historicalTimeline: true }))}
        />
      )}
      {currentModule === 'historical' && completedModules.historicalTimeline && !completedModules.matchPioneerChallenge && (
        <MatchThePioneer
          figures={historicalFiguresData}
          onCompleteChallenge={() => setCompletedModules(prev => ({ ...prev, matchPioneerChallenge: true, currentModule: 'nomenclature' }))} // Transition to nomenclature
          updateScore={(points) => setScore(prev => prev + points)}
        />
      )}
      {currentModule === 'historical' && completedModules.historicalTimeline && completedModules.matchPioneerChallenge && (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-teal-100 to-cyan-200 p-6 font-inter text-center">
          <div className="bg-white p-8 rounded-xl shadow-2xl max-w-2xl w-full border-4 border-teal-500">
            <h2 className="text-4xl font-extrabold text-teal-700 mb-6">
              Module 1 Complete!
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              You've successfully navigated the foundations of taxonomy.
            </p>
            <p className="text-2xl font-bold text-teal-800 mb-8">
              Your current score: {score} points
            </p>
            <button
              onClick={() => setCurrentModule('nomenclature')} // Transition to Nomenclature Module
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-teal-300 text-xl"
            >
              Proceed to Module 2: Nomenclature
            </button>
          </div>
        </div>
      )}

      {/* Module 2: Nomenclature Naming Ceremony */}
      {currentModule === 'nomenclature' && !completedModules.nomenclatureIntro && (
        <NomenclatureIntro onStartChallenge={(challenge) => setCompletedModules(prev => ({ ...prev, nomenclatureIntro: true, currentChallenge: challenge }))} />
      )}
      {currentModule === 'nomenclature' && completedModules.nomenclatureIntro && completedModules.currentChallenge === 'nameThatSpecies' && !completedModules.nameThatSpeciesChallenge && (
        <NameThatSpecies
          speciesData={nomenclatureData.speciesNaming}
          onCompleteChallenge={() => setCompletedModules(prev => ({ ...prev, nameThatSpeciesChallenge: true, currentChallenge: 'rankRunner' }))}
          updateScore={(points) => setScore(prev => prev + points)}
        />
      )}
      {currentModule === 'nomenclature' && completedModules.nomenclatureIntro && completedModules.nameThatSpeciesChallenge && completedModules.currentChallenge === 'rankRunner' && !completedModules.rankRunnerChallenge && (
        <RankRunner
          ranksData={nomenclatureData.taxonomicRanks}
          onCompleteChallenge={() => setCompletedModules(prev => ({ ...prev, rankRunnerChallenge: true }))}
          updateScore={(points) => setScore(prev => prev + points)}
        />
      )}
      {currentModule === 'nomenclature' && completedModules.nomenclatureIntro && completedModules.nameThatSpeciesChallenge && completedModules.rankRunnerChallenge && (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-lime-100 to-emerald-200 p-6 font-inter text-center">
          <div className="bg-white p-8 rounded-xl shadow-2xl max-w-2xl w-full border-4 border-emerald-500">
            <h2 className="text-4xl font-extrabold text-emerald-700 mb-6">
              Module 2 Complete!
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              You've mastered the art of scientific naming and hierarchical classification.
            </p>
            <p className="text-2xl font-bold text-emerald-800 mb-8">
              Your current score: {score} points
            </p>
            <button
              onClick={() => setCurrentModule('phylumFinder')} // Transition to Phylum Finder Module
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-300 text-xl"
            >
              Proceed to Module 3: Phylum Finder
            </button>
          </div>
        </div>
      )}

      {/* Module 3: Phylum Finder Expedition */}
      {currentModule === 'phylumFinder' && !completedModules.phylumFinderIntro && (
        <PhylumFinderIntro onStartChallenge={(challenge) => setCompletedModules(prev => ({ ...prev, phylumFinderIntro: true, currentChallenge: challenge }))} />
      )}
      {currentModule === 'phylumFinder' && completedModules.phylumFinderIntro && completedModules.currentChallenge === 'characteristicCatcher' && !completedModules.characteristicCatcherChallenge && (
        <CharacteristicCatcher
          organismsData={phylumFinderData.organisms}
          onCompleteChallenge={() => setCompletedModules(prev => ({ ...prev, characteristicCatcherChallenge: true, currentChallenge: 'evolutionaryWeb' }))}
          updateScore={(points) => setScore(prev => prev + points)}
        />
      )}
      {currentModule === 'phylumFinder' && completedModules.phylumFinderIntro && completedModules.characteristicCatcherChallenge && completedModules.currentChallenge === 'evolutionaryWeb' && !completedModules.evolutionaryWebChallenge && (
        <EvolutionaryWeb
          relationshipsData={phylumFinderData.evolutionaryRelationships}
          onCompleteChallenge={() => setCompletedModules(prev => ({ ...prev, evolutionaryWebChallenge: true }))}
          updateScore={(points) => setScore(prev => prev + points)}
        />
      )}
      {currentModule === 'phylumFinder' && completedModules.phylumFinderIntro && completedModules.characteristicCatcherChallenge && completedModules.evolutionaryWebChallenge && (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 p-6 font-inter text-center">
          <div className="bg-white p-8 rounded-xl shadow-2xl max-w-2xl w-full border-4 border-indigo-500">
            <h2 className="text-4xl font-extrabold text-indigo-700 mb-6">
              Module 3 Complete!
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              You've successfully explored major groups and their evolutionary connections.
            </p>
            <p className="text-2xl font-bold text-indigo-800 mb-8">
              Your current score: {score} points
            </p>
            <button
              onClick={() => setCurrentModule('keyConnoisseur')} // Transition to Key Connoisseur Module
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300 text-xl"
            >
              Proceed to Module 4: Key Connoisseur
            </button>
          </div>
        </div>
      )}

      {/* Module 4: Key Connoisseur Challenge */}
      {currentModule === 'keyConnoisseur' && !completedModules.keyConnoisseurIntro && (
        <KeyConnoisseurIntro onStartChallenge={(challenge) => setCompletedModules(prev => ({ ...prev, keyConnoisseurIntro: true, currentChallenge: challenge }))} />
      )}
      {currentModule === 'keyConnoisseur' && completedModules.keyConnoisseurIntro && completedModules.currentChallenge === 'dichotomousDetective' && !completedModules.dichotomousDetectiveChallenge && (
        <DichotomousDetective
          organismsToIdentify={keyConnoisseurData.organismsToIdentify}
          dichotomousKeys={keyConnoisseurData.dichotomousKeys}
          onCompleteChallenge={() => setCompletedModules(prev => ({ ...prev, dichotomousDetectiveChallenge: true }))}
          updateScore={(points) => setScore(prev => prev + points)}
        />
      )}
      {currentModule === 'keyConnoisseur' && completedModules.keyConnoisseurIntro && completedModules.dichotomousDetectiveChallenge && (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-orange-100 to-yellow-200 p-6 font-inter text-center">
          <div className="bg-white p-8 rounded-xl shadow-2xl max-w-2xl w-full border-4 border-yellow-500">
            <h2 className="text-4xl font-extrabold text-yellow-700 mb-6">
              Module 4 Complete!
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              You've mastered the art of using taxonomic keys for identification.
            </p>
            <p className="text-2xl font-bold text-yellow-800 mb-8">
              Your current score: {score} points
            </p>
            <button
              onClick={() => setCurrentModule('gameComplete')} // Directly transition to Game Complete Screen
              className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300 text-xl"
            >
              View Final Score!
            </button>
          </div>
        </div>
      )}

      {/* Game Complete Screen */}
      {currentModule === 'gameComplete' && (
        <GameCompleteScreen
          finalScore={score}
          onRestartGame={() => {
            setCurrentModule('intro');
            setScore(0);
            setCompletedModules({});
          }}
        />
      )}
    </div>
  );
}

export default App;
