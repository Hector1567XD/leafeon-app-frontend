import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store';
import { openMenu } from 'store/customizationSlice';

// material-ui
import { ButtonBase } from '@mui/material';

// project imports
import config from 'config';
import Logo from 'ui-component/Logo';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
  const defaultId = useAppSelector((state) => state.customization.defaultId);
  const dispatch = useAppDispatch();

  const onClick = () => dispatch(openMenu(defaultId));

  return (
    <ButtonBase disableRipple
      onClick={onClick}
      component={Link}
      to={config.defaultPath}
    >
      <Logo />
    </ButtonBase>
  );
};

export default LogoSection;
