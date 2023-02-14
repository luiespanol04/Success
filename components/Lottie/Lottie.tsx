import lottie from 'lottie-web';
import { FC, useEffect, useRef } from 'react';
import style from './LottieStyle.module.css';

interface ILottie {
  className?: string;
  animation: any;
}

const Lottie: FC<ILottie> = ({ animation, className }) => {
  const container: any = useRef(null);
  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: animation,
    });
    return () => {
      lottie.destroy();
    };
  }, [animation]);

  return <div className={className || style.container} ref={container} />;
};

export default Lottie;
