import { useEffect, useMemo, useState, useContext } from 'react';
import { erc20Abi } from 'viem';
import { useTranslations } from 'next-intl';
import { readContract } from '@wagmi/core';
import { useAccount, useConfig, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { EthConfig } from '../eth';
import { GlobalMsgContext } from '@/app/global-msg-context';

export function useApproveMak(allowAmount: number = 0) {
  const config = useConfig();
  const tokenAddr = EthConfig.contract.makToken;
  const spender = EthConfig.contract.inphura;

  const T = useTranslations('Common');
  const { setGlobalMessage } = useContext(GlobalMsgContext);

  const { address } = useAccount();

  const [allowance, setAllowance] = useState<number | null>(null);
  const [isAllowanceLoading, setIsAllowanceLoading] = useState(false);
  const [isApproving, setIsApproving] = useState(false);

  const { data: hash, writeContract, error } = useWriteContract();

  const { data: txReceipt, error: txError } = useWaitForTransactionReceipt({
    hash,
    query: {
      enabled: !!hash,
    },
  });

  useEffect(() => {
    if (!address) return;

    readAllowance();
  }, [address]);

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
    try {
      const res = await readContract(config, {
        abi: erc20Abi,
        address: tokenAddr as any,
        functionName: 'allowance',
        args: [address, spender as any],
      });
      setIsAllowanceLoading(false);
      setAllowance(Number(res) / 10 ** 18);
    } catch (error) {
      console.log('readAllowance ~ error:', error);
      setIsAllowanceLoading(false);
      setGlobalMessage({
        type: 'error',
        message: T('WalletNetworkFail'),
      });
    }
  }

  const isShouldApprove = useMemo(() => {
    if (allowance == null || isAllowanceLoading) return false;
    if (allowance === 0) return true;
    if (allowance < allowAmount) return true;

    return false;
  }, [allowance, allowAmount, isAllowanceLoading]);

  const approveBtnText = useMemo(() => {
    if (isApproving) {
      return `${T('Approving')} MAK...`;
    }

    if (isShouldApprove) {
      return `${T('Approve')} MAK`;
    }

    return '';
  }, [isShouldApprove, T, isApproving]);

  async function approveAction() {
    setIsApproving(true);
    const amountMax = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

    const callParams = {
      abi: erc20Abi,
      address: tokenAddr as any,
      functionName: 'approve',
      args: [spender, amountMax],
    };

    writeContract(callParams as any);
  }

  useEffect(() => {
    if (error || hash) {
      setIsApproving(false);
    }
  }, [error, hash]);

  return {
    isShouldApprove,
    isApproving,
    approveAction,
    approveBtnText,
  };
}
