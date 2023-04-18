import type { GutenBookType } from '@/common/types';

 type ResultsType = {
  count: number,
  next: string | null,
  previous: string | null,
  results: Array<GutenBookType>
};

export default ResultsType;