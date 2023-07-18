import { useField, FieldInputProps } from 'formik';
import { FormControl, InputLabel, Select, MenuItem, Chip, SelectChangeEvent, Input } from '@mui/material';

interface Option {
  value: string;
  label: string;
}

interface MultipleSelectProps {
  label: string;
  name: string;
  options: Option[];
}

const MultipleSelect = ({ label, name, options }: MultipleSelectProps) => {
  const [field, meta, helpers] = useField<string[]>(name);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    helpers.setValue(['event.target.value']);
  };

  return (
    <FormControl fullWidth error={meta.touched && !!meta.error}>
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        value={field.value}
        onChange={handleChange}
        input={<Input id={name} />}
        renderValue={(selected) => (
          <div>
            {(selected as string[]).map((value) => (
              <Chip key={value} label={options.find((option) => option.value === value)?.label} />
            ))}
          </div>
        )}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {meta.touched && !!meta.error && <div className="field-error">{meta.error}</div>}
    </FormControl>
  );
};