const TimerWheel = ({ timeEstimate, startTime }) => {
    const [percent, setPercent] = useState(0);
    const radius = 10;
    const circumference = 2 * Math.PI * radius;
  
    useEffect(() => {
      const interval = setInterval(() => {
        const elapsedTime = moment().diff(moment(startTime), 'seconds');
        const totalSeconds = timeEstimate * 60;
        const newPercent = (elapsedTime / totalSeconds) * 100;
        setPercent(newPercent >= 100 ? 100 : newPercent);
      }, 1000);
  
      return () => clearInterval(interval);
    }, [timeEstimate, startTime]);
  
    const strokeDashoffset = circumference - (percent / 100) * circumference;
    const color = percent < 50 ? 'green' : percent < 75 ? 'amber' : 'red';
  
    return (
      <svg className="timerWheel" height={radius * 2} width={radius * 2}>
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={2}
          strokeDasharray={circumference}
          style={{ strokeDashoffset }}
          r={radius}
          cx={radius}
          cy={radius}
        />
      </svg>
    );
  };
  