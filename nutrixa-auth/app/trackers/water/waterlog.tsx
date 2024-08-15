interface WaterCupProps {
  intake: number;
  goal: number;
}

const WaterAnimate: React.FC<WaterCupProps> = ({ intake, goal }) => {
  const waterLevel = (intake / goal) * 100;

  return (
    <div className="w-full h-8 bg-gray-200 rounded-md overflow-hidden mt-4">
        <div
            className="h-full bg-blue-300 transition-all duration-500 ease-in-out"
            style={{ width: `${waterLevel}%` }}
        />
    </div>
  );
};

export default WaterAnimate;