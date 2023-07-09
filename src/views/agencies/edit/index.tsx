import { FunctionComponent, useCallback } from 'react';
// material-ui
import MainCard from 'components/cards/MainCard';
import {  Typography } from '@mui/material';
import styled from 'styled-components';
import BackendError from 'exceptions/backend-error';
import { useNavigate } from 'react-router';
import { setSuccessMessage } from 'store/customizationSlice';
import { useAppDispatch } from '../../../store/index';
import Form from '../form';
import editAgency from 'services/agencies/edit-agency';
import useAgencyByRif from './use-agency-by-rif';
import useAgencyRif from './use-agency-rif';
import useCityById from 'core/cities/use-city-by-id';

const EditState: FunctionComponent<Props> = ({className}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const agencyRif = useAgencyRif();
  const agency = useAgencyByRif(agencyRif);
  const city = useCityById(agency?.cityId || null);

  const onSubmit = useCallback(async (values: any, { setErrors, setStatus, setSubmitting }: any) => {
    console.log(values)
    try {
      setErrors({});
      setStatus({});
      setSubmitting(true);
      await editAgency(agencyRif!, values);
      navigate('/agencies');
      dispatch(setSuccessMessage(`Agencia ${values.businessName} editada correctamente`));
    } catch (error) {
      if (error instanceof BackendError) {
        setErrors({
          ...error.getFieldErrorsMessages(),
          submit: error.getMessage()
        });
      }
      setStatus({ success: false });
    } finally {
      setSubmitting(false);
    }
  }, [dispatch, navigate, agencyRif]);

  return (
    <div className={className}>
      <MainCard>
        <Typography variant="h3" component="h3">
          Agencias
        </Typography>
      </MainCard>
      {
        agency && city && (
          <Form
            initialValues={{
              businessName: agency.businessName,
              agencyRif: agency.agencyRif,
              cityId: agency.cityId,
              stateId: city.stateId,
              managerDni: agency.managerDni,
              submit: null
            }}
            isUpdate={true}
            title={'Editar agencia'}
            onSubmit={onSubmit}
          />
        )
      }
    </div>
  );
};

interface Props {
  className?: string;
}

export default styled(EditState)`
  display: flex;
  flex-direction: column;

  .flex-column {
    display: flex;
    flex-direction: column;
  }

  .form-data {
    margin-top: 16px;
  }

  .form-header-card {
    width: 100%;
  }

  .form-header {
    width: 100%;
    display: flex;
    flex-direction: row;
  }
`;
