import { useParams } from 'next/navigation';
import { Tokens } from '../const';

export default function useCurrentToken() {
  const params = useParams();
  const tokenName = params.token as string;

  if (!tokenName) return null;

  const token = Tokens.find((t: any) => t.symbol === tokenName.toUpperCase());

  if (!token) {
    return null;
  }

  return token;
}
