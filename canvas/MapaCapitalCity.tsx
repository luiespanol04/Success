import * as THREE from 'three';
import { useGLTF, useBounds, MeshReflectorMaterial } from '@react-three/drei';
import React, { useRef, useState, useEffect } from 'react';
import { useSnapshot, subscribe } from 'valtio';
import state from './Status';
import { useAccount } from 'wagmi';
import { useGetMyLandsReserve } from '@/hooks/useGetReserveLands';

export default function Mapa() {
  const { nodes, materials }: any = useGLTF('models/MapaCapitalCity.glb');
  const ref = useRef<any>();
  const ref2 = useRef<any>();
  const ref3 = useRef<any>();
  const snap = useSnapshot(state);
  const [hovered, hover] = useState<any>(false);
  const [haslands, setHasLands] = useState<boolean>(false);
  const api = useBounds();

  const { address, isConnected, isDisconnected } = useAccount();

  const {
    data: dataCapitalCity,
    isLoading,
    error: errorCapitalCity,
  } = useGetMyLandsReserve();

  useEffect(() => {
    if (!haslands && !errorCapitalCity) {
      dataCapitalCity?.find((item: any) => {
        if (item.addressId === address) {
          state.current = item.proyectId;
          state.items[snap.current] = '#ff4200';
          console.log('Encontro');
          ref.current?.children.find((meshes: any) => {
            if (meshes.material.name === item.proyectId) {
              subscribe(state, () => {
                if (state.zoom) {
                  setTimeout(() => {
                    api.refresh(meshes).fit();
                    state.zoom = false;
                  }, 1000);
                  setHasLands(true);
                } else {
                  setHasLands(false);
                }
              });
            }
          });
        }
        console.log('No encontro');
      });
    }
  }, [address, api, snap, haslands]);
  return (
    <>
      //<group position={[0,-480,0]}>
        <group
          ref={ref}
          onPointerOver={(e: any) => {
            e.stopPropagation();
            e.object.material.name === state.current
              ? hover(e.object.material.color.set('#919090'))
              : e.object.material.color.set('#575b5e');
          }}
          onPointerOut={(e: any) => {
            e.object.material.name === state.current
              ? e.object.material.color.set('#ff4200')
              : e.object.material.color.set('#575b5e');
          }}
          onClick={(e: any) => {
            e.stopPropagation();
            e.object.material.name === state.current
              ? hover(
                  e.object.material.color.set('#919090') &&
                    e.delta <= 2 &&
                    api.refresh(e.object).fit()
                )
              : api.refresh().fit();
          }}>
          <mesh
            material-color={snap.items.ccm3b3l9}
            geometry={nodes.ccm3b3l9_83.geometry}
            material={materials.ccm3b3l9}
          />
          <mesh
            material-color={snap.items.ccm3b3l7}
            geometry={nodes.ccm3b3l7_82.geometry}
            material={materials.ccm3b3l7}
          />
          <mesh
            material-color={snap.items.ccm3b3l6}
            geometry={nodes.ccm3b3l6_49.geometry}
            material={materials.ccm3b3l6}
          />
          <mesh
            material-color={snap.items.ccm3b3l5}
            geometry={nodes.ccm3b3l5_66.geometry}
            material={materials.ccm3b3l5}
          />
          <mesh
            material-color={snap.items.ccm3b3l3}
            geometry={nodes.ccm3b3l3_48.geometry}
            material={materials.ccm3b3l3}
          />
          <mesh
            material-color={snap.items.ccm3b3l4}
            geometry={nodes.ccm3b3l4_47.geometry}
            material={materials.ccm3b3l4}
          />
          <mesh
            material-color={snap.items.ccm3b3l2}
            geometry={nodes.ccm3b3l2_46.geometry}
            material={materials.ccm3b3l2}
          />
          <mesh
            material-color={snap.items.ccm3b3l1}
            geometry={nodes.ccm3b3l1_43.geometry}
            material={materials.ccm3b3l1}
          />
          <mesh
            material-color={snap.items.ccm3b4l1}
            geometry={nodes.ccm3b4l1_44.geometry}
            material={materials.ccm3b4l1}
          />
          <mesh
            material-color={snap.items.ccm3b4l2}
            geometry={nodes.ccm3b4l2_65.geometry}
            material={materials.ccm3b4l2}
          />
          <mesh
            material-color={snap.items.ccm3b4l3}
            geometry={nodes.ccm3b4l3_45.geometry}
            material={materials.ccm3b4l3}
          />
          <mesh
            material-color={snap.items.ccm3b3l8}
            geometry={nodes.ccm3b3l8_81.geometry}
            material={materials.ccm3b3l8}
          />
          <mesh
            material-color={snap.items.ccm3b3l12}
            geometry={nodes.ccm3b3l12_80.geometry}
            material={materials.ccm3b3l12}
          />
          <mesh
            material-color={snap.items.ccm3b3l11}
            geometry={nodes.ccm3b3l11_79.geometry}
            material={materials.ccm3b3l11}
          />
          <mesh
            material-color={snap.items.ccm3b3l10}
            geometry={nodes.ccm3b3l10_78.geometry}
            material={materials.ccm3b3l10}
          />
          <mesh
            material-color={snap.items.ccm3b1l12}
            geometry={nodes.ccm3b1l12_60.geometry}
            material={materials.ccm3b1l12}
          />
          <mesh
            material-color={snap.items.ccm3b1l11}
            geometry={nodes.ccm3b1l11_69.geometry}
            material={materials.ccm3b1l11}
          />
          <mesh
            material-color={snap.items.ccm3b1l8}
            geometry={nodes.ccm3b1l8_52.geometry}
            material={materials.ccm3b1l8}
          />
          <mesh
            material-color={snap.items.ccm3b1l9}
            geometry={nodes.ccm3b1l9_53.geometry}
            material={materials.ccm3b1l9}
          />
          <mesh
            material-color={snap.items.ccm3b1l10}
            geometry={nodes.ccm3b1l10_70.geometry}
            material={materials.ccm3b1l10}
          />
          <mesh
            material-color={snap.items.ccm3b1l13}
            geometry={nodes.ccm3b1l13_54.geometry}
            material={materials.ccm3b1l13}
          />
          <mesh
            material-color={snap.items.ccm3b1l14}
            geometry={nodes.ccm3b1l14_76.geometry}
            material={materials.ccm3b1l14}
          />
          <mesh
            material-color={snap.items.ccm2b4l5}
            geometry={nodes.ccm2b4l5_99.geometry}
            material={materials.ccm2b4l5}
          />
          <mesh
            material-color={snap.items.ccm2b4l4}
            geometry={nodes.ccm2b4l4_98.geometry}
            material={materials.ccm2b4l4}
          />
          <mesh
            material-color={snap.items.ccm2b4l3}
            geometry={nodes.ccm2b4l3_85.geometry}
            material={materials.ccm2b4l3}
          />
          <mesh
            material-color={snap.items.ccm3b1l7}
            geometry={nodes.ccm3b1l7_74.geometry}
            material={materials.ccm3b1l7}
          />
          <mesh
            material-color={snap.items.ccm3b1l6}
            geometry={nodes.ccm3b1l6_63.geometry}
            material={materials.ccm3b1l6}
          />
          <mesh
            material-color={snap.items.ccm3b1l5}
            geometry={nodes.ccm3b1l5_75.geometry}
            material={materials.ccm3b1l5}
          />
          <mesh
            material-color={snap.items.ccm3b1l3}
            geometry={nodes.ccm3b1l3_50.geometry}
            material={materials.ccm3b1l3}
          />
          <mesh
            material-color={snap.items.ccm3b1l4}
            geometry={nodes.ccm3b1l4_51.geometry}
            material={materials.ccm3b1l4}
          />
          <mesh
            material-color={snap.items.ccm3b1l2}
            geometry={nodes.ccm3b1l2_68.geometry}
            material={materials.ccm3b1l2}
          />
          <mesh
            material-color={snap.items.ccm3b1l1}
            geometry={nodes.ccm3b1l1_67.geometry}
            material={materials.ccm3b1l1}
          />
          <mesh
            material-color={snap.items.ccm2b3l3}
            geometry={nodes.ccm2b3l3_84.geometry}
            material={materials.ccm2b3l3}
          />
          <mesh
            material-color={snap.items.ccm2b3l2}
            geometry={nodes.ccm2b3l2_87.geometry}
            material={materials.ccm2b3l2}
          />
          <mesh
            material-color={snap.items.ccm2b3l1}
            geometry={nodes.ccm2b3l1_97.geometry}
            material={materials.ccm2b3l1}
          />
          <mesh
            material-color={snap.items.ccm2b4l2}
            geometry={nodes.ccm2b4l2_86.geometry}
            material={materials.ccm2b4l2}
          />
          <mesh
            material-color={snap.items.ccm2b4l1}
            geometry={nodes.ccm2b4l1_106.geometry}
            material={materials.ccm2b4l1}
          />
          <mesh
            material-color={snap.items.ccm2b1l7}
            geometry={nodes.ccm2b1l7_105.geometry}
            material={materials.ccm2b1l7}
          />
          <mesh
            material-color={snap.items.ccm2b1l8}
            geometry={nodes.ccm2b1l8_96.geometry}
            material={materials.ccm2b1l8}
          />
          <mesh
            material-color={snap.items.ccm2b2l7}
            geometry={nodes.ccm2b2l8_95.geometry}
            material={materials.ccm2b2l7}
          />
          <mesh
            material-color={snap.items.ccm2b2l4}
            geometry={nodes.ccm2b2l4_89.geometry}
            material={materials.ccm2b2l4}
          />
          <mesh
            material-color={snap.items.ccm2b2l2}
            geometry={nodes.ccm2b2l2_90.geometry}
            material={materials.ccm2b2l2}
          />
          <mesh
            material-color={snap.items.ccm2b2l6}
            geometry={nodes.ccm2b2l6_93.geometry}
            material={materials.ccm2b2l6}
          />
          <mesh
            material-color={snap.items.ccm2b2l5}
            geometry={nodes.ccm2b2l5_92.geometry}
            material={materials.ccm2b2l5}
          />
          <mesh
            material-color={snap.items.ccm2b2l3}
            geometry={nodes.ccm2b2l3_91.geometry}
            material={materials.ccm2b2l3}
          />
          <mesh
            material-color={snap.items.ccm2b2l1}
            geometry={nodes.ccm2b2l1_88.geometry}
            material={materials.ccm2b2l1}
          />
          <mesh
            material-color={snap.items.ccm2b1l6}
            geometry={nodes.ccm2b1l6_100.geometry}
            material={materials.ccm2b1l6}
          />
          <mesh
            material-color={snap.items.ccm2b1l4}
            geometry={nodes.ccm2b1l4_101.geometry}
            material={materials.ccm2b1l4}
          />
          <mesh
            material-color={snap.items.ccm2b1l2}
            geometry={nodes.ccm2b1l2_94.geometry}
            material={materials.ccm2b1l2}
          />
          <mesh
            material-color={snap.items.ccm2b1l1}
            geometry={nodes.ccm2b1l1_102.geometry}
            material={materials.ccm2b1l1}
          />
          <mesh
            material-color={snap.items.ccm2b1l3}
            geometry={nodes.ccm2b1l3_103.geometry}
            material={materials.ccm2b1l3}
          />
          <mesh
            material-color={snap.items.ccm2b1l5}
            geometry={nodes.ccm2b1l5_104.geometry}
            material={materials.ccm2b1l5}
          />
          <mesh
            material-color={snap.items.ccm4b5l1}
            geometry={nodes.ccm4b5l1_23.geometry}
            material={materials.ccm4b5l1}
          />
          <mesh
            material-color={snap.items.ccm4b5l3}
            geometry={nodes.ccm4b5l3_27.geometry}
            material={materials.ccm4b5l3}
          />
          <mesh
            material-color={snap.items.ccm4b5l5}
            geometry={nodes.ccm4b5l5_26.geometry}
            material={materials.ccm4b5l5}
          />
          <mesh
            material-color={snap.items.ccm4b5l4}
            geometry={nodes.ccm4b5l4_11.geometry}
            material={materials.ccm4b5l4}
          />
          <mesh
            material-color={snap.items.ccm4b5l2}
            geometry={nodes.ccm4b5l2_10.geometry}
            material={materials.ccm4b5l2}
          />
          <mesh
            material-color={snap.items.ccm4b5l6}
            geometry={nodes.ccm4b5l6_12.geometry}
            material={materials.ccm4b5l6}
          />
          <mesh
            material-color={snap.items.ccm4b5l7}
            geometry={nodes.ccm4b5l7_34.geometry}
            material={materials.ccm4b5l7}
          />
          <mesh
            material-color={snap.items.ccm4b5l8}
            geometry={nodes.ccm4b5l8_22.geometry}
            material={materials.ccm4b5l8}
          />
          <mesh
            material-color={snap.items.ccm4b3l1}
            geometry={nodes.ccm4b3l1_35.geometry}
            material={materials.ccm4b3l1}
          />
          <mesh
            material-color={snap.items.ccm4b3l2}
            geometry={nodes.ccm4b3l2_24.geometry}
            material={materials.ccm4b3l2}
          />
          <mesh
            material-color={snap.items.ccm4b4l5}
            geometry={nodes.ccm4b4l5_29.geometry}
            material={materials.ccm4b4l5}
          />
          <mesh
            material-color={snap.items.ccm4b4l7}
            geometry={nodes.ccm4b4l7_28.geometry}
            material={materials.ccm4b4l7}
          />
          <mesh
            material-color={snap.items.ccm4b4l6}
            geometry={nodes.ccm4b4l6_13.geometry}
            material={materials.ccm4b4l6}
          />
          <mesh
            material-color={snap.items.ccm4b4l4}
            geometry={nodes.ccm4b4l4_14.geometry}
            material={materials.ccm4b4l4}
          />
          <mesh
            material-color={snap.items.ccm4b4l3}
            geometry={nodes.ccm4b4l3_31.geometry}
            material={materials.ccm4b4l3}
          />
          <mesh
            material-color={snap.items.ccm4b4l2}
            geometry={nodes.ccm4b4l2_15.geometry}
            material={materials.ccm4b4l2}
          />
          <mesh
            material-color={snap.items.ccm4b4l1}
            geometry={nodes.ccm4b4l1_30.geometry}
            material={materials.ccm4b4l1}
          />
          <mesh
            material-color={snap.items.ccm4b3l4}
            geometry={nodes.ccm4b3l4_37.geometry}
            material={materials.ccm4b3l4}
          />
          <mesh
            material-color={snap.items.ccm4b3l3}
            geometry={nodes.ccm4b3l3_36.geometry}
            material={materials.ccm4b3l3}
          />
          <mesh
            material-color={snap.items.ccm4b4l8}
            geometry={nodes.ccm4b4l8_25.geometry}
            material={materials.ccm4b4l8}
          />
          <mesh
            material-color={snap.items.ccm4b1l1}
            geometry={nodes.ccm4b1l1_42.geometry}
            material={materials.ccm4b1l1}
          />
          <mesh
            material-color={snap.items.ccm4b1l2}
            geometry={nodes.ccm4b1l2_41.geometry}
            material={materials.ccm4b1l2}
          />
          <mesh
            material-color={snap.items.ccm4b1l3}
            geometry={nodes.ccm4b1l3_40.geometry}
            material={materials.ccm4b1l3}
          />
          <mesh
            material-color={snap.items.ccm4b1l4}
            geometry={nodes.ccm4b1l4_38.geometry}
            material={materials.ccm4b1l4}
          />
          <mesh
            material-color={snap.items.ccm4b1l5}
            geometry={nodes.ccm4b1l5_39.geometry}
            material={materials.ccm4b1l5}
          />
          <mesh
            material-color={snap.items.ccm3b2l1}
            geometry={nodes.ccm3b2l1_62.geometry}
            material={materials.ccm3b2l1}
          />
          <mesh
            material-color={snap.items.ccm3b2l3}
            geometry={nodes.ccm3b2l3_56.geometry}
            material={materials.ccm3b2l3}
          />
          <mesh
            material-color={snap.items.ccm3b2l2}
            geometry={nodes.ccm3b2l2_57.geometry}
            material={materials.ccm3b2l2}
          />
          <mesh
            material-color={snap.items.ccm3b2l5}
            geometry={nodes.ccm3b2l5_73.geometry}
            material={materials.ccm3b2l5}
          />
          <mesh
            material-color={snap.items.ccm3b2l6}
            geometry={nodes.ccm3b2l6_72.geometry}
            material={materials.ccm3b2l6}
          />
          <mesh
            material-color={snap.items.ccm3b2l7}
            geometry={nodes.ccm3b2l7_71.geometry}
            material={materials.ccm3b2l7}
          />
          <mesh
            material-color={snap.items.ccm3b2l8}
            geometry={nodes.ccm3b2l8_59.geometry}
            material={materials.ccm3b2l8}
          />
          <mesh
            material-color={snap.items.ccm3b2l9}
            geometry={nodes.ccm3b2l9_58.geometry}
            material={materials.ccm3b2l9}
          />
          <mesh
            material-color={snap.items.ccm3b2l10}
            geometry={nodes.ccm3b2l10_61.geometry}
            material={materials.ccm3b2l10}
          />
          <mesh
            material-color={snap.items.ccm3b2l11}
            geometry={nodes.ccm3b2l11_64.geometry}
            material={materials.ccm3b2l11}
          />
          <mesh
            material-color={snap.items.ccm3b2l12}
            geometry={nodes.ccm3b2l12_77.geometry}
            material={materials.ccm3b2l12}
          />
          <mesh
            material-color={snap.items.ccm3b2l4}
            geometry={nodes.ccm3b2l4_55.geometry}
            material={materials.ccm3b2l4}
          />
          <mesh
            material-color={snap.items.ccm5b1l1}
            geometry={nodes.ccm5b1l1_05.geometry}
            material={materials.ccm5b1l1}
          />
          <mesh
            material-color={snap.items.ccm5b1l2}
            geometry={nodes.ccm5b1l2_04.geometry}
            material={materials.ccm5b1l2}
          />
          <mesh
            material-color={snap.items.ccm5b1l3}
            geometry={nodes.ccm5b1l3_09.geometry}
            material={materials.ccm5b1l3}
          />
          <mesh
            material-color={snap.items.ccm5b2l3}
            geometry={nodes.ccm5b2l3_07.geometry}
            material={materials.ccm5b2l3}
          />
          <mesh
            material-color={snap.items.ccm5b2l2}
            geometry={nodes.ccm5b2l2_06.geometry}
            material={materials.ccm5b2l2}
          />
          <mesh
            material-color={snap.items.ccm5b2l1}
            geometry={nodes.ccm5b2l1_02.geometry}
            material={materials.ccm5b2l1}
          />
          <mesh
            material-color={snap.items.ccm5b3l2}
            geometry={nodes.ccm5b3l2_08.geometry}
            material={materials.ccm5b3l2}
          />
          <mesh
            material-color={snap.items.ccm5b3l1}
            geometry={nodes.ccm5b3l1_03.geometry}
            material={materials.ccm5b3l1}
          />
          <mesh
            material-color={snap.items.ccm1b2l1}
            geometry={nodes.ccm1b2l1_01.geometry}
            material={materials.ccm1b2l1}
          />
          <mesh
            material-color={snap.items.ccm1b2l2}
            geometry={nodes.ccm1b2l2_107.geometry}
            material={materials.ccm1b2l2}
          />
          <mesh
            material-color={snap.items.ccm4b7l2}
            geometry={nodes.ccm4b7l2_19.geometry}
            material={materials.ccm4b7l2}
          />
          <mesh
            material-color={snap.items.ccm4b7l1}
            geometry={nodes.ccm4b7l1_20.geometry}
            material={materials.ccm4b7l1}
          />
          <mesh
            material-color={snap.items.ccm4b6l1}
            geometry={nodes.ccm4b6l1_21.geometry}
            material={materials.ccm4b6l1}
          />
          <mesh
            material-color={snap.items.ccm4b6l2}
            geometry={nodes.ccm4b6l2_18.geometry}
            material={materials.ccm4b6l2}
          />
          <mesh
            material-color={snap.items.ccm4b6l3}
            geometry={nodes.ccm4b6l3_33.geometry}
            material={materials.ccm4b6l3}
          />
          <mesh
            material-color={snap.items.ccm4b6l4}
            geometry={nodes.ccm4b6l4_32.geometry}
            material={materials.ccm4b6l4}
          />
          <mesh
            material-color={snap.items.ccm4b6l6}
            geometry={nodes.ccm4b6l6_16.geometry}
            material={materials.ccm4b6l6}
          />
          <mesh
            material-color={snap.items.ccm4b6l5}
            geometry={nodes.ccm4b6l5_17.geometry}
            material={materials.ccm4b6l5}
          />
        </group>
        <group
          ref={ref2}
          onPointerOver={(e: any) => (
            e.stopPropagation(), hover(e.object.material.color.set('#d1c48c'))
          )}
          onPointerOut={(e: any) => (
            e.intersections.length === 0 && hover(null),
            e.object.material.color.set('#ffffff')
          )}
          onClick={(e) => {
            e.stopPropagation();
            e.delta <= 2 && api.refresh(e.object).fit();
          }}
          onPointerMissed={(e) => e.button === 0 && api.refresh().fit()}>
          <mesh castShadow receiveShadow  geometry={nodes.Adultos.geometry} material={materials.Adultos}>
            <meshBasicMaterial color="rgb(227, 229, 230)" />
          </mesh>
          <mesh castShadow receiveShadow  geometry={nodes.Bahia.geometry} material={materials.Bahia}>
            <meshBasicMaterial color="rgb(227, 229, 230)" />
          </mesh>
          <mesh castShadow receiveShadow  geometry={nodes.Deportes.geometry} material={materials.Deportes}>
            <meshBasicMaterial color="rgb(227, 229, 230)" />
          </mesh>
          <mesh castShadow receiveShadow  geometry={nodes.EjeAmbiental.geometry} material={materials.EjeAmbiental}>
            <meshBasicMaterial color="rgb(227, 229, 230)" />
          </mesh>
          <mesh castShadow receiveShadow  geometry={nodes.Residencial.geometry} material={materials.SM_Residencial}>
            <meshBasicMaterial color="rgb(227, 229, 230)" />
          </mesh>
          <mesh castShadow receiveShadow  geometry={nodes.Comercial.geometry} material={materials.Comercial}>
          <meshBasicMaterial color="rgb(227, 229, 230)" /> 
          </mesh>
          <mesh castShadow receiveShadow  geometry={nodes.Cultura.geometry} material={materials.Cultural}>
            <meshBasicMaterial color="rgb(227, 229, 230)" />
          </mesh>
          <mesh castShadow receiveShadow  geometry={nodes.Educacion.geometry} material={materials.Educacion}>
            <meshBasicMaterial color="rgb(227, 229, 230)" />
          </mesh>
          <mesh castShadow receiveShadow  geometry={nodes.Entretenimiento.geometry} material={materials.Entretenimiento}>
            <meshBasicMaterial color="rgb(227, 229, 230)" />
          </mesh>
          <mesh castShadow receiveShadow  geometry={nodes.Finaciero.geometry} material={materials.Finaciero}>
            <meshBasicMaterial color="rgb(227, 229, 230)" />
          </mesh>
        </group>
        {/* NAVE */}
        <group
          ref={ref3}
          onPointerOver={(e: any) => (
            e.stopPropagation(), hover(e.object.material.color.set('#374e6e'))
          )}
          onPointerOut={(e: any) => (
            e.intersections.length === 0 && hover(null),
            e.object.material.color.set('#4b6180')
          )}
          onClick={(e) => {
            e.stopPropagation();
            e.delta <= 2 && api.refresh(e.object).fit();
          }}
          onPointerMissed={(e) => e.button === 0 && api.refresh().fit()}>
          <mesh
            geometry={nodes.SM_SpaceShip.geometry}
            material={materials.SM_SpaceShip}>
          </mesh>
        </group>
        <group>
          <mesh castShadow 
            geometry={nodes.SM_vegetacion_exterior.geometry}
            material={materials.SM_vegetacion_exterior}>
            <meshBasicMaterial color="rgb(62, 99, 62)" />
          </mesh>
          <mesh
            geometry={nodes.SM_Water.geometry}
            material={materials.Water}
          />
          <mesh
            material-color={'black'}
            geometry={nodes.SM_barandas.geometry}
            material={materials.SM_barandas}
          />

          <mesh
            geometry={nodes.SM_senderos.geometry}
            material={materials.SM_senderos}>
            <meshBasicMaterial color="rgb(255, 255, 255)" />
          </mesh>
          <mesh
            geometry={nodes.SM_zonas_verdes.geometry}
            material={materials.SM_zonas_verdes}>
            <meshBasicMaterial color="rgb(90, 128, 84)" />
          </mesh>
          <mesh
            receiveShadow
            geometry={nodes.SM_hitos.geometry}
            material={materials.Hitos}>
            <meshBasicMaterial color="rgb(81, 87, 92)" />
          </mesh>
          <mesh
            receiveShadow
            geometry={nodes.SM_placas_vias.geometry}
            material={materials.SM_placas_vias}>
            <meshBasicMaterial color="rgb(81, 87, 92)" />
          </mesh>
          {/* TERRENOS*/}
          <mesh
            material-color={'#758475'}
            geometry={nodes.Terreno01.geometry}
            material={materials.Terreno01}
          />
          <mesh
            material-color={'#738473'}
            geometry={nodes.Terreno02.geometry}
            material={materials.Terreno02}
          />
          <mesh
            material-color={'#688868'}
            geometry={nodes.Terreno03.geometry}
            material={materials.Terreno03}
          />
          <mesh
            material-color={'#688768'}
            geometry={nodes.Terreno04.geometry}
            material={materials.Terreno04}
          />
          <mesh
            material-color={'#618561'}
            geometry={nodes.Terreno05.geometry}
            material={materials.Terreno05}
          />
          <mesh
            material-color={'#598059'}
            geometry={nodes.Terreno06.geometry}
            material={materials.Terreno06}
          />
          <mesh
            material-color={'#5c7d5c'}
            geometry={nodes.Terreno07.geometry}
            material={materials.Terreno07}
          />
          <mesh
            material-color={'#597d59'}
            geometry={nodes.Terreno08.geometry}
            material={materials.Terreno08}
          />
          <mesh
            material-color={'#5b785b'}
            geometry={nodes.Terreno09.geometry}
            material={materials.Terreno09}
          />
          <mesh
            material-color={'#CCCCCC'}
            geometry={nodes.Terreno10.geometry}
            material={materials.Terreno10}
          />
          <mesh
            material-color={'#ebe6e6'}
            geometry={nodes.Terreno11.geometry}
            material={materials.Terreno11}
          />
          <mesh
            material-color={'#e6e6e6'}
            geometry={nodes.Terreno12.geometry}
            material={materials.Terreno12}
          />
          <mesh
            material-color={'#F8F8F8'}
            geometry={nodes.Terreno13.geometry}
            material={materials.Terreno13}
          />
          <mesh
            material-color={'FFFFFFFF'}
            geometry={nodes.Terreno14.geometry}
            material={materials.Terreno14}
          />
        </group>
      </group>
    </>
  );
}

useGLTF.preload('models/MapaCapitalCity.glb');

