import { useState, useEffect, useRef } from "react";
import { useSpring, animated } from "react-spring";
import "./cuentaRegresiva.css";

function CuentaRegresiva() {
  const [timeLeft, setTimeLeft] = useState(() => {
    const savedTime = sessionStorage.getItem("timeLeft");
    return savedTime ? Number(savedTime) : 1500;
  });

  const timerRef = useRef(null);

  useEffect(() => {
    if (timeLeft <= 0) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current);
          sessionStorage.setItem("timeLeft", 0);
          return 0;
        }
        const newTime = prevTime - 1;
        sessionStorage.setItem("timeLeft", newTime);
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  const fadeIn = useSpring({
    opacity: timeLeft > 0 ? 1 : 0,
    transform: timeLeft > 0 ? "translateY(0)" : "translateY(-20px)",
    from: { opacity: 0, transform: "translateY(-20px)" },
    config: { tension: 170, friction: 26 },
  });

  return (
    <animated.div style={fadeIn} className="cuenta-regresiva">
      <span className="fs-6 fw-bold">{formattedTime}</span>
    </animated.div>
  );
}

export default CuentaRegresiva;
