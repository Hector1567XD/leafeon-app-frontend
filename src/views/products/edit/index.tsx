import { FunctionComponent, useCallback } from "react";
// material-ui
import {
  setErrorMessage,
  setIsLoading,
  setSuccessMessage,
} from "store/customizationSlice";
import useProductById from "core/products/use-product-by-id";
import editProduct from "services/products/edit-product";
import BackendError from "exceptions/backend-error";
import MainCard from "components/cards/MainCard";
import useProductId from "./use-product-id";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router";
import Form, { FormValues } from "../form";
import styled from "styled-components";
import { useAppDispatch } from "store";
import { FormikHelpers } from "formik";

const EditProduct: FunctionComponent<Props> = ({ className }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const productId = useProductId();
  const product = useProductById(productId);
  const onSubmit = useCallback(
    async (
      values: any,
      { setErrors, setStatus, setSubmitting }: FormikHelpers<FormValues>
    ) => {
      try {
        dispatch(setIsLoading(true));
        setErrors({});
        setStatus({});
        setSubmitting(true);
        await editProduct(productId!, values);
        navigate("/products");
        dispatch(
          setSuccessMessage(`Producto ${values.shortNameProduct} editado correctamente`)
        );
      } catch (error) {
        if (error instanceof BackendError) {
          setErrors({
            ...error.getFieldErrorsMessages(),
            submit: error.getMessage(),
          });
          dispatch(setErrorMessage(error.getMessage()));
        }
        setStatus({ success: false });
      } finally {
        dispatch(setIsLoading(false));
        setSubmitting(false);
      }
    },
    [dispatch, navigate, productId]
  );

  return (
    <div className={className}>
      <MainCard>
        <Typography variant="h3" component="h3">
          Productos
        </Typography>
      </MainCard>
      {product && (
        <Form
          initialValues={{
            shortNameProduct: product.shortNameProduct,
            description: product.description,
            price: product.price,
            provider: product.provider,
            supplyLineId: product.supplyLineId,
            isEcological: product.isEcological,
            submit: null,
          }}
          title={"Editar producto"}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};

interface Props {
  className?: string;
}

export default styled(EditProduct)`
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
