import Image from 'next/image';
import style from './style.module.css';
import ChangeLanguage from '../ChangeLanguage';
import { useDisconnect } from 'wagmi';

const folder = '/';

const Header = () => {
  const { disconnect } = useDisconnect();

  return (
    <div className={style.HeaderContainer}>
      <div className={style.Logo}>
        <Image
          src={folder + 'Logo.svg'}
          alt="Logo Landian"
          width={230}
          height={50}
          className={style.imgLogo}
        />
      </div>
      <div className={style.btnsHeader}>
        <div className={style.btnsTranslate}>
          <ChangeLanguage />
        </div>
        <button className={style.btnsDisconnect}>
          <Image
            src={folder + 'Login.svg'}
            alt="Login Icon"
            width={42}
            height={42}
            onClick={() => disconnect()}
            className={style.img}
          />
        </button>
      </div>
    </div>
  );
};

export default Header;
