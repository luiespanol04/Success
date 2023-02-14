import Scene from '@/canvas/Scene';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';
import carg from '../public/animationsJson/carg.json';
import { useProvider, useSigner, useAccount } from 'wagmi';
import { chainSelected } from '@/constants/chain';
import ModalR from '../components/ModalR';
import Lottie from '@/components/Lottie/Lottie';
import { mint } from '@/utils/web3/Mint';
import sad from '../public/animationsJson/sad.json';
import { GetNfts } from '@/utils/web3/getNft';
import { useTranslation } from 'react-i18next';
import { CreateNFT, IApiResponse } from '@/utils/api/createNFT';
import state from '../canvas/Status';
import logo from '../public/logo_capital.svg';
import CBS from '/styles/CBS.module.css';
import ClaimHeader from '../components/Header';
import router from 'next/router';
import ButtonComponent from '@/components/ButtonComponent';
import AnimationJson from '../public/animationsJson/loading2.json';
import axios from 'axios';
import { IDataInfo } from '@/canvas/dataInfo';
import { useGetMyLandsReserve } from '@/hooks/useGetReserveLands';
import { nftClaimed } from '@/utils/api/nftClaimed';
const folder = '/';

const Claim = () => {
  const chainId: any =
    chainSelected[Number(process.env.NEXT_PUBLIC_MAINNET_TESTNET || 1)].id;

  const sdkURL = process.env.NEXT_PUBLIC_CC_SDK!;
  const { address, isConnected } = useAccount();

  const {
    data: dataInfo,
    isLoading,
    error: errorCapitalCity,
  } = useGetMyLandsReserve();

  const [stateModalLoading, setStateModalLoading] = useState(false);
  const [iWant, setIWant] = useState(false);
  const [stateModalError, setStateModalError] = useState(false);
  const [isLoadingMyNFT, setIsLoadingMyNFT] = useState(false);
  const [stateText, setStateText] = useState(false);
  const [stateWelcome, setStateWelcome] = useState(true);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [hasNfts, setHasNfts] = useState<any>();
  const [imgNft, setImgNft] = useState<string>('');
  const { data: signer } = useSigner(chainId);
  const provider = useProvider(chainId);
  const { t } = useTranslation('global');
  const [url, setUrl] = useState(sdkURL);
  const [landReserved, setLandReserved] = useState<IDataInfo>();
  const [area, setArea] = useState<any>(0);
  const [proyect, setProyect] = useState('');

  useEffect(() => {
    if (!address) {
      router.push('/');
    }
  }, [address]);

  const handleMint = async () => {
    /// @dev Encuentra el nft
    const userProyects: any = dataInfo?.find(
      (land) => land.addressId === String(address)
    );
    if (!userProyects) {
      console.log('No se encontro la wallet en la waitlist');
      setStateModalError(true);
    }
    if (userProyects) {
      const {
        data: dataMint,
        hasData: hasDataMint,
        hasError: hasErrorMint,
      }: any = await mint(provider, signer);

      if (!hasDataMint || hasErrorMint) {
        console.log('Ocurrio un error al mintear el nft');
        setStateModalError(true);
      }

      if (dataMint && !hasErrorMint) {
        state.zoom = true;
        /// @dev crea el nft en el backend
        const {
          data: dataCreateNFT,
          hasError: hasErrorCreateNFT,
          isLoading: isLoadingCreateNFT,
        }: IApiResponse = await CreateNFT({
          // nomenclature: userProyects?.idProyect!,
          nomenclature: 'CCM1B2L5',
          token_id: dataMint,
          area: userProyects?.area!,
        });

        if (hasErrorCreateNFT) {
          console.log('Ocurrio un error al crear el nft');
          setStateModalError(true);
        }

        if (dataCreateNFT && !hasErrorCreateNFT && !isLoadingCreateNFT) {
          // success transaction
          console.log('Nft creado con exito: ', landReserved?.proyectId);
          const { data, hasError } = await nftClaimed(landReserved?.proyectId!);

          if (!data) {
            console.log('Ocurrio un error claimear el nft');
          } else {
            setStateText(true);
            setStateWelcome(false);
            handleGetNft();
          }
        }
      }
    }
  };

  const handleGetNft = async () => {
    const { data, hasData, hasError } = await GetNfts(signer, address);
    if (!hasData) {
      setHasNfts(false);
      setIsLoadingMyNFT(false);
    }

    if (data && hasData) {
      setHasNfts(true);
      setIsLoadingMyNFT(false);
    }
  };

  const handlerImage = () => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API}/nft-image?nomenclature=${proyect}&area=${area}`
      )
      .then((response) => setImgNft(response.data.data.image))
      .catch((error) => console.log('Toy mal', error));
  };

  useEffect(() => {
    setIsLoadingMyNFT(true);
    if (isConnected && signer && !hasNfts) {
      handleGetNft();
    }
    dataInfo?.map((data) => {
      if (data.addressId === address) {
        setArea(data.area);
        setProyect(data.proyectId);
        setUrl(`${sdkURL}/${data.proyectId}.zip`);
        setLandReserved(data);
      }
    });
  }, [isConnected, signer, hasNfts]);

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API}/nft-image?nomenclature=${proyect}&area=${area}`
      )
      .then((response) => setImgNft(response.data.data.image))
      .catch((error) => console.log('No se pudo obtener la imagen', error));
  }, [area, proyect]);

  const handlerNando = () => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API}/nft-image?nomenclature=${proyect}&area=${area}`
      )
      .then((response) => setImgNft(response.data.data.image))
      .catch((error) => console.log('No se pudo obtener la imagen', error));
  };
  useEffect(() => {
    if (address) {
      dataInfo?.find((data) => {
        if (data.addressId === address) {
          setOpen(!open);
          handlerNando();
          return console.log('esta open', open);
        }
      });
    }
  }, [address]);

  const handlerClaim = () => {
    dataInfo?.find((data) => {
      if (data.addressId === address) {
        setIWant(!iWant);
      }
      setError(!error);
    });
  };

  return (
    <div className={CBS.content}>
      <div className={CBS.Background}>
        <Image
          className={CBS.ImageBackground}
          src={folder + 'background.svg'}
          width={50}
          height={50}
          alt=""
        />
      </div>
      <ModalR stati={stateModalLoading}>
        <div className={CBS.contentAnimationLoad}>
          <Lottie animation={carg} className={CBS.carg} />
          <p>{t('claim.modalProcessing')}</p>
        </div>
      </ModalR>
      <ModalR stati={iWant}>
        <div className={CBS.contentModalFNT}>
          <Image
            src={imgNft}
            alt="imgNFT"
            width={300}
            height={300}
            className={CBS.imgNFT}
          />
          <div className={CBS.modalIwant}>
            <ButtonComponent
              onClick={() => {
                setStateModalLoading(true);
                setIWant(false);
                handleMint();
              }}>
              <p className={CBS.btnP}>{t('modal.iWant')}</p>
            </ButtonComponent>
          </div>
        </div>
      </ModalR>
      <ModalR stati={stateModalError}>
        <div className={CBS.contentAnimationSad}>
          <Lottie animation={sad} className={CBS.animationSad} />
          <p>{t('claim.modalError')}</p>
          <ButtonComponent
            onClick={() => {
              setStateWelcome(true);
              setStateModalLoading(false);
              setStateModalError(false);
            }}>
            <p className={CBS.btnP}>{t('claim.btnReturn')}</p>
          </ButtonComponent>
        </div>
      </ModalR>
      <div className={CBS.container}>
        <ClaimHeader />
        <div className={CBS.containerInfoSection}>
          <div className={CBS.InfoSection}>
            <Image src={logo} alt="" className={CBS.logo_city} />
            <p className={CBS.Subtitle}>{t('claim.subTitle')}</p>
            <div className={CBS.SecondSubtitles}>
              {!landReserved && <p>{t('claim.title')}</p>}
              <div
                style={{
                  ...(stateWelcome &&
                  !hasNfts &&
                  !isLoadingMyNFT &&
                  landReserved &&
                  !landReserved?.minted
                    ? { display: 'flex' }
                    : { display: 'none' }),
                }}>
                {/* <h3>{t('claim.titleWelcome')}</h3> */}
                {/* <p className={CBS.Message}>{t('claim.subTitle')}</p> */}
                <Suspense>
                  <div className={CBS.containerBtnClaim}>
                    <ButtonComponent
                      onClick={() => {
                        handlerClaim();
                      }}>
                      <h3 className={CBS.btnP}>{t('claim.btnMint')}</h3>
                    </ButtonComponent>
                  </div>
                </Suspense>
              </div>
              <div
                style={{
                  ...(stateText || hasNfts || landReserved?.minted
                    ? {
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }
                    : { display: 'none' }),
                }}>
                {/* <p className={CBS.Message}>{t('claim.download')}</p> */}
                <div className={CBS.containerButtons}>
                  <div className={CBS.containerBtnClaim}>
                    <Link className={CBS.titleLink} href={url} target="_blank">
                      <ButtonComponent>
                        <p className={CBS.btnP}>{t('claim.btnDownload')}</p>
                      </ButtonComponent>
                    </Link>
                  </div>
                  <Link
                    href="https://capital-city.s3.amazonaws.com/resources/public/docs/map-tech-sheet.pdf"
                    target="_blank"
                    rel="noreferrer noopener">
                    <ButtonComponent className={CBS.btnPDF}>
                      <p className={CBS.btnP}>{t('claim.technicalSheet')}</p>
                    </ButtonComponent>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={CBS.MapImgCanvas}>
        <Suspense
          fallback={
            <div className={CBS.lottie}>
              <Lottie animation={AnimationJson} />
              <h1>{t('claim.loading')}</h1>
            </div>
          }>
          <Scene />
        </Suspense>
      </div>
    </div>
  );
};

export default Claim;
