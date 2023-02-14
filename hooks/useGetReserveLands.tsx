import { IDataInfo } from '@/canvas/dataInfo';
import useSWR from 'swr';

// @dev obtengo la url del api
const url = process.env.NEXT_PUBLIC_API! + '/reserved-lands';

// @dev Hook para obtener historial de ventas
export function useGetMyLandsReserve() {

  // @dev fetch de datos al backend
  const { data, error, isLoading } = useSWR(`${url}`);
  let dataInfo: IDataInfo[] = data?.data;

  // @dev retorno la informacion obtenida
  return {
    data: dataInfo,
    isLoading,
    error,
  };
}
