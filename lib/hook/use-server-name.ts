import { useTranslations } from 'next-intl';
import fetcher from '../fetcher';
import { Paths } from '../PathMap';
import { useState } from 'react';

export default function useServerName() {
  const T = useTranslations('Common');
  const [serverName, setServerName] = useState('');
  const [invalidMsg, setInvalidMsg] = useState('');

  function handleChange(v: string) {
    const regex = /^[\u4e00-\u9fa5a-zA-Z0-9-_]*$/;

    if (regex.test(v) || v === '') {
      setServerName(v);
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
      setInvalidMsg(T('NameErrorRequired', { name: T('Server') }));
      return false;
    }

    if (v.length < 2) {
      setInvalidMsg(T('NameErrorTooShort'));
      return false;
    }

    const res: {
      code: number;
      msg: 'Allowed' | 'Forbidden';
    } = await fetcher(Paths.userNameCheck + `?name=${v}`);

    if (res.msg === 'Forbidden') {
      setInvalidMsg(T('NameErrorForbidden'));
      return false;
    }

    if (res.msg === 'Allowed') {
      setInvalidMsg('');
      return true;
    }

    return true;
  }

  return {
    serverName,
    invalidMsg,
    handleChange,
    handleValidate,
  };
}
