import axios from 'axios';

export interface IApiResponse {
  data: [] | {};
  hasError: boolean;
  isLoading: boolean;
}

const uri = process.env.NEXT_PUBLIC_API! + '/minted';

export async function nftClaimed(proyectId: string): Promise<IApiResponse> {
  let isLoading = true;
  console.log('Claim este nft, ', proyectId);
  axios
    .request({
      method: 'POST',
      url: uri,
      data: {
        proyectId,
      },
    })
    .then(function (response) {
      console.log(response.data);
      isLoading = false;
      return {
        data: response.data,
        hasError: false,
        isLoading,
      };
    })
    .catch(function (error) {
      console.error(error);
      isLoading = false;
      return {
        data: error,
        hasError: false,
        isLoading,
      };
    });

  isLoading = false;

  return {
    data: [],
    hasError: false,
    isLoading,
  };
}
