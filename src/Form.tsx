import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Button,
  Typography,
  Box,
  CssBaseline,
} from '@mui/material';
import { styled } from '@mui/system';
import { ControlledTextField } from './controlled-text-field';

interface FormData {
  name: string;
  email: string;
  phoneNumber: string;
  lang: string;
};

const StyledButton = styled(Button)`
  && {
    background-color: #CA5F5C;
    color: #fff;
    font-size: 14px;

    &:disabled {
      background-color: #e2e2e2;
      color: #bcbcbc;
    }
  }
`;

const RightAlignedBox = styled(Box)`
  text-align: right;
`;

const Form: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    getValues,
    trigger,
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      phoneNumber: '',
      lang: '',
    },
  });

  const [touchedFields, setTouchedFields] = useState<string[]>([]);

  const isFormEmpty = () => {
    const values = getValues();
    return Object.keys(values).some((key) => !values[key as keyof FormData]);
  };

  const hasErrors = () => {
    return Object.keys(errors).length > 0;
  };

  useEffect(() => {
    if (touchedFields.length > 0) {
      trigger(touchedFields as any); // Cast to any to satisfy TypeScript
    }
  }, [touchedFields, trigger]);

  const handleTouchedFields = (fieldName: keyof FormData) => {
    if (!touchedFields.includes(fieldName)) {
      setTouchedFields([...touchedFields, fieldName]);
    }
    trigger(fieldName);
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  return (
    <CssBaseline>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h5" mt={2} mb={2}>Generali Formulář</Typography>
        <ControlledTextField
          name="name"
          control={control}
          defaultValue=""
          rules={{ required: 'Toto pole je povinné' }}
          label="Jméno"
          variant="outlined"
          error={!!errors.name}
          helperText={errors.name?.message}
          onBlur={() => handleTouchedFields('name')}
          customOnChange={() => handleTouchedFields('name')}
        />
        <ControlledTextField
          name="phoneNumber"
          control={control}
          defaultValue=""
          rules={{
            required: 'Toto pole je povinné',
            pattern: {
              value: /^[0-9]+$/,
              message: 'Telefonní číslo může obsahovat pouze čísla',
            },
          }}
          label="Telefonní číslo"
          variant="outlined"
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber?.message}
          onBlur={() => handleTouchedFields('phoneNumber')}
          customOnChange={() => handleTouchedFields('phoneNumber')}
        />
        <ControlledTextField
          name="email"
          control={control}
          defaultValue=""
          rules={{
            required: 'Toto pole je povinné',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: 'Neplatný e-mailový formát',
            },
          }}
          label="E-mail"
          variant="outlined"
          error={!!errors.email}
          helperText={errors.email?.message}
          onBlur={() => handleTouchedFields('email')}
          customOnChange={() => handleTouchedFields('email')}
        />
        <ControlledTextField
          name="lang"
          control={control}
          defaultValue=""
          rules={{ required: 'Toto pole je povinné' }}
          label="Hlavni jazyk"
          variant="outlined"
          error={!!errors.lang}
          helperText={errors.lang?.message}
          selectOptions={[
            { label: 'Vyberte možnost', value: '' },
            { label: 'Čeština', value: 'CZ' },
            { label: 'Angličtina', value: 'EN' },
            { label: 'Slovenština', value: 'SK' },
          ]}
          onBlur={() => handleTouchedFields('lang')}
          customOnChange={() => handleTouchedFields('lang')}
        />
        <RightAlignedBox>
          <StyledButton
            type="submit"
            disabled={isSubmitting || isFormEmpty() || hasErrors()}
          >
            Odeslat
          </StyledButton>
        </RightAlignedBox>
      </form>
    </CssBaseline>
  );
};

export default Form;
