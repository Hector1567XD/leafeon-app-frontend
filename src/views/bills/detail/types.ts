import { Bill } from 'core/bills/types';

export interface Props {
  className?: string;
  bill: Bill;
  onRefresh: () => void;
}
