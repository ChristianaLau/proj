import styles from './waterlog.module.css';

interface WaterCupProps {
  intake: number;
  goal: number;
}

const WaterAnimate: React.FC<WaterCupProps> = ({ intake, goal }) => {
  const waterLevel = (intake / goal) * 100;

  return (
    <div className="w-full h-8 bg-gray-200 rounded-md overflow-hidden mt-4">
      <div className={styles.cup}>
        <div
          className={styles.water}
          style={{ height: `${waterLevel}%` }}
        >
          <div className={styles.water}></div>
          <div className={styles.water}></div>
        </div>
      </div>
    </div>
  );
};

export default WaterAnimate;
