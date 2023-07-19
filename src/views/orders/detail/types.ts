import { Order } from 'core/orders/types';

export interface Props {
  className?: string;
  order: Order;
  onRefresh: () => void;
}
