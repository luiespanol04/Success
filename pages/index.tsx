import ChangeLanguage from '@/components/ChangeLanguage';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import router from 'next/dist/client/router';
import Image from 'next/image';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccount } from 'wagmi';
import loginStyle from '../styles/loginStyle.module.css';
import logo from '../public/logo_capital.svg';

const folder = '/Assets/images/';

const Home = () => {
  const { address, isConnected, isDisconnected } = useAccount();
  const { t } = useTranslation('global');

  useEffect(() => {
    if (address) {
      router.push('/claim');
    }
  }, [address]);

  return (
    <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
      <div className={loginStyle.contentImg}>
        <video
          id="background-video"
          loop
          autoPlay
          muted
          className={loginStyle.video}>
          <source src="https://capital-city.s3.amazonaws.com/resources/public/videos/background-capital-city.mp4" type="video/mp4" />
        </video>
      </div>
      <div className={loginStyle.degradado}></div>
      <div className={loginStyle.containerBackground}>
        <div className={loginStyle.logo_header}>
          <Image
            src={folder + 'logo.svg'}
            alt="Logo Landian"
            width={230}
            height={50}
          />
        </div>
        <div className={loginStyle.changeLanguageL}>
          <ChangeLanguage />
        </div>
      </div>
      <div className={loginStyle.container}>
        <div className={loginStyle.contentDescription}>
          <div className={loginStyle.title}>
            <Image src={logo} alt="" className={loginStyle.logo_city} />
            <p>{t('login.subTitle')}</p>
            <div className={loginStyle.degraded} />
          </div>
          <div className={loginStyle.conexion}>
            <p>{t('login.description')}</p>
            <div className="text-white" style={{ color: '#ffffff' }}>
              <ConnectButton label={`${t('login.btnConnect')} `} />
            </div>
          </div>
          <div className={loginStyle.logo} style={{ height: '30%' }}>
            <Image
              src={folder + 'logo.svg'}
              alt="logo"
              className={loginStyle.img}
              width={50}
              height={50}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
