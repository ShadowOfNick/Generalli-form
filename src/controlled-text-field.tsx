import React from 'react';
import { styled } from '@mui/system';
import { Control, Controller} from 'react-hook-form';
import { MenuItem, TextField, TextFieldVariants } from '@mui/material';

interface ControlledTextFieldProps {
  name: string;
  control: Control | any;
  defaultValue?: string;
  rules?: Record<string, unknown>;
  label: string;
  variant?: TextFieldVariants;
  error?: boolean;
  helperText?: string;
  selectOptions?: { label: string; value: string }[];
  onBlur: () => void;
  customOnChange: () => void;
};

const StyledTextField = styled(TextField)`
  && {
    font-family: 'Helvetica Neue', sans-serif;
    font-size: 14px;
    margin-bottom: 24px;
    width: 100%;

    .Mui-error {
      margin-left: 0; /* Remove left margin for error messages */
    }
  }
`;

const StyledMenuItem = styled(MenuItem)`
  && {
    &:hover,
    &:focus {
      background-color: #FBF4F4 ;
    }
  }
`;


export const ControlledTextField: React.FC<ControlledTextFieldProps> = ({
  name,
  control,
  defaultValue = '',
  rules,
  label,
  variant = 'outlined',
  error = undefined,
  helperText = undefined,
  selectOptions = undefined,
  onBlur,
  customOnChange,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field }) => (
        <StyledTextField
          {...field}
          label={label}
          variant={variant}
          error={!!error}
          helperText={helperText}
          onBlur={onBlur}
          select={selectOptions !== undefined}
          onChange={(e) => {
            field.onChange(e);
            customOnChange();
          }}
        >
          {selectOptions &&
            selectOptions.map((option) => (
              <StyledMenuItem key={option.value} value={option.value}>
                {option.label}
              </StyledMenuItem>
            ))}
        </StyledTextField>
      )}
    />
  );
};
