import React, { FunctionComponent, useCallback } from 'react';
import {
  Autocomplete,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

const CustomSelect: FunctionComponent<Props> = ({
  options,
  value,
  onChange,
  onBlur,
  helperText,
  error,
  label,
  name,
  disabled,
  className,
  isAutocomplete,
}) => {
  const createSyntheticEvent = useCallback((pointerEvent: any): React.ChangeEvent<{ value: number | string }> => {
    return {
      target: {
        ...pointerEvent.target,
        name,
        id: name,
        value: pointerEvent.target.value,
      },
    } as React.ChangeEvent<{ value: number | string }>;
  }, [name]);

  if (isAutocomplete && (options.length || !value)) return (
    <div className={className}>
      <Autocomplete
        id={name}
        options={options}
        getOptionLabel={(option: SelectOption) => option.label}
        value={options.find((option: SelectOption) => option.value === value)}
        onChange={(event, newValue) => {
          onChange({
            target: {
              name,
              id: name,
              value: newValue?.value || null,
            },
          } as any);
        }}
        renderInput={(params) =>
          <TextField
            {...params}
            label={label}
            onBlur={onBlur}
            helperText={helperText}
            error={error}
          />
        }
      />
    </div>
  );

  return (
    <FormControl className={className} fullWidth error={error} disabled={disabled}>
      <InputLabel>{label}</InputLabel>
      <Select
        id={name}
        value={(value || '') as any}
        onChange={(e) => { onChange(createSyntheticEvent(e)) }}
        onBlur={onBlur}
        label={label}
        name={name}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 300, // Altura máxima del menú de opciones
              overflowY: 'auto', // Desplazamiento vertical del menú
            },
          },
        }}
      >
        <MenuItem value="">
          <em>Selecciona una opcion...</em>
        </MenuItem>
        {options.map((option: SelectOption) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export interface Props {
  options: SelectOption[];
  value: number | string | null;
  onChange: (event: React.ChangeEvent<{ value: number | string }>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  helperText?: string;
  error?: boolean;
  label?: string;
  disabled?: boolean;
  name: string;
  className?: string;
  isAutocomplete?: boolean;
}

export interface SelectOption {
  value: string | number;
  label: string;
}

export default CustomSelect;
