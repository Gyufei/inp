import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function useOwnerName() {
  const T = useTranslations('Common');
  const [ownerName, setOwnerName] = useState('');
  const [invalidMsg, setInvalidMsg] = useState('');

  function handleChange(v: string) {
    const regex = /^[\u4e00-\u9fa5a-zA-Z0-9-_]*$/;

    if (regex.test(v) || v === '') {
      setOwnerName(v);
    }

    validateInput(v);
  }

  function validateInput(v: string) {
    if (v.startsWith('-') || v.endsWith('-')) {
      setInvalidMsg(T('NameErrorStartWith', { letter: '-' }));
      return;
    }

    if (v.startsWith('_') || v.endsWith('_')) {
      setInvalidMsg(T('NameErrorStartWith', { letter: '_' }));
      return;
    }

    setInvalidMsg('');
  }

  async function handleValidate(v: string) {
    if (invalidMsg) {
      return false;
    }

    if (!v) {
      setInvalidMsg(T('NameErrorRequired', { name: T('Owner') }));
      return false;
    }

    if (v.length < 2) {
      setInvalidMsg(T('NameErrorTooShort'));
      return false;
    }

    return true;
  }

  return {
    ownerName,
    invalidMsg,
    handleChange,
    handleValidate,
  };
}
