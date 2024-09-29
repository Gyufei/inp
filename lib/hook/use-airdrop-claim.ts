import { useEffect, useState } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { InphuraAbi } from '../abi/Inphura';
import { EthConfig } from '../eth';

export function useAirdropClaim(airdropToken: `0x${string}`, claimableAmount: bigint, merkleProof: string[], callback: any) {
  const [isClaiming, setIsClaiming] = useState(false);
  const abiAddress = EthConfig.contract.inphura;

  const { data: hash, writeContract, error } = useWriteContract();

  const {
    data: txReceipt,
    error: txError,
    status,
  } = useWaitForTransactionReceipt({
    hash,
    query: {
      enabled: !!hash,
    },
  });

  useEffect(() => {
    if (txReceipt) {
      setIsClaiming(false);
    }

    if (txError) {
      setIsClaiming(false);
    }
    if (status === 'success') {
      callback?.(airdropToken);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txReceipt, txError, status]);

  async function claimAction() {
    console.log('🚀 ~ claimAction ~ claimAction:', airdropToken, claimableAmount, merkleProof);
    setIsClaiming(true);
    const callParams = {
      address: abiAddress,
      abi: InphuraAbi,
      functionName: 'claim',
      args: [airdropToken, claimableAmount, merkleProof],
    };

    writeContract(callParams as any);
  }

  useEffect(() => {
    if (error || hash) {
      console.log('🚀 ~ useEffect ~ error || hash:', error, hash);
      setIsClaiming(false);
    }
  }, [error, hash]);

  return {
    isClaiming,
    claimAction,
  };
}
