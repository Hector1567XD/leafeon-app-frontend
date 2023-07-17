import { Model } from 'core/models/types';

export interface Props {
  className?: string;
  model: Model;
  onRefresh: () => void;
}
