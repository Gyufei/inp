import { useEffect, useMemo, useState } from 'react';
import { erc20Abi } from 'viem';
import { useTranslations } from 'next-intl';
import { readContract } from '@wagmi/core';
import { useAccount, useConfig, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { EthConfig } from '../eth';

export function useApproveMak(allowAmount: number = 0) {
  const config = useConfig();
  const tokenAddr = EthConfig.contract.makToken;
  const spender = EthConfig.contract.inphura;

  const CT = useTranslations('Common');

  const { address } = useAccount();

  const [allowance, setAllowance] = useState<number | null>(null);
  const [isAllowanceLoading, setIsAllowanceLoading] = useState(false);
  const [isApproving, setIsApproving] = useState(false);

  const { data: hash, writeContract } = useWriteContract();

  const { data: txReceipt, error: txError } = useWaitForTransactionReceipt({
    hash,
    query: {
      enabled: !!hash,
    },
  });

  useEffect(() => {
    readAllowance();
  }, []);

  useEffect(() => {
    if (txReceipt) {
      setIsApproving(false);
      readAllowance();
    }

    if (txError) {
      setIsApproving(false);
    }
  }, [txReceipt, txError]);

  async function readAllowance() {
    if (!address) return;

    setIsAllowanceLoading(true);

    const res = await readContract(config, {
      abi: erc20Abi,
      address: tokenAddr as any,
      functionName: 'allowance',
      args: [address, spender as any],
    });

    setIsAllowanceLoading(false);
    setAllowance(Number(res) / 10 ** 18);
  }

  const isShouldApprove = useMemo(() => {
    if (allowance == null || isAllowanceLoading) return false;
    if (allowance === 0) return true;
    if (allowance < allowAmount) return true;

    return false;
  }, [allowance, allowAmount, isAllowanceLoading]);

  const approveBtnText = useMemo(() => {
    if (isApproving) {
      return `${CT('btn-Approving')} Mak...`;
    }

    if (isShouldApprove) {
      return `${CT('btn-Approve')} Mak`;
    }

    return '';
  }, [isShouldApprove, CT, isApproving]);

  async function approveAction() {
    setIsApproving(true);
    const amountMax = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
    const amount = allowAmount == 0 ? amountMax : '0';

    const callParams = {
      abi: erc20Abi,
      address: tokenAddr as any,
      functionName: 'approve',
      args: [spender, amount],
    };

    writeContract(callParams as any);
  }

  return {
    isShouldApprove,
    isApproving,
    approveAction,
    approveBtnText,
  };
}
