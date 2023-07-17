import { Agency } from 'core/agencies/types';

export interface Props {
  className?: string;
  agency: Agency;
  onRefresh: () => void;
}
