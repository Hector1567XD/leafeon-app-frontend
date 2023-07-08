import { Suspense, ReactElement } from 'react';
// Own
import Loader from './Loader';

type LoadableProps = {
  children?: ReactElement;
};

const Loadable = (Component: React.ComponentType<any>) => {
  const LoadableComponent = (props?: LoadableProps) => (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );
  return LoadableComponent;
};

export default Loadable;