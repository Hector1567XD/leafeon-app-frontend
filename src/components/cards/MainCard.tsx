import { forwardRef, HTMLAttributes } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';

// constant
const headerSX = {
  '& .MuiCardHeader-action': { mr: 0 }
};

// ==============================|| CUSTOM MAIN CARD ||============================== //

const MainCard = forwardRef<HTMLDivElement, MainCardProps>(
  (
    {
      border = true,
      boxShadow,
      children,
      content = true,
      contentClass = '',
      contentSX = {},
      darkTitle,
      secondary,
      shadow,
      className,
      sx = {},
      headerClass,
      title,
      ...others
    },
    ref
  ) => {
    const theme = useTheme<any>();

    return (
      <Card
        className={className}
        ref={ref}
        {...others}
        sx={{
          border: border ? '1px solid' : 'none',
          borderColor: theme.palette.primary[200] + 25,
          ':hover': {
            boxShadow: boxShadow ? shadow || '0 2px 14px 0 rgb(32 40 45 / 8%)' : 'inherit'
          },
          ...sx
        }}
      >
        {/* card header and action */}
        {title && 
          <CardHeader
            sx={headerSX as any}
            title={(darkTitle ? <Typography variant="h3">{title as any}</Typography> : title) as any}
            action={secondary as any} 
            className={headerClass}
          />
        }

        {/* content & header divider */}
        {title && <Divider />}

        {/* card content */}
        {content && (
          <CardContent sx={contentSX} className={contentClass}>
            {children}
          </CardContent>
        )}
        {!content && children}
      </Card>
    );
  }
);

interface MainCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'content'> {
  border?: boolean;
  className?: string;
  boxShadow?: boolean;
  content?: boolean;
  contentClass?: string;
  headerClass?: string;
  contentSX?: object;
  sx?: Record<string, any>;
  darkTitle?: boolean;
  secondary?: React.ReactNode | string | object;
  shadow?: string;
  title?: React.ReactNode | string | object;
}

export default MainCard;
