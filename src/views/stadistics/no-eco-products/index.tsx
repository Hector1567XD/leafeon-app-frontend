import Table from "./table";
import { FunctionComponent } from "react";
import { styled } from "styled-components";
import MainCard from "components/cards/MainCard";
import SelectField from "components/SelectField";
import useNoEcoProducts from "./use-no-eco-products";
import { Typography, FormControl } from "@mui/material";
import useAgenciesOptions from "core/agencies/use-agencies-options";

const USE_AUTOCOMPLETE = false;

const NoEcoProductsPage: FunctionComponent<Props> = ({ className }) => {
  const agenciesOptions = useAgenciesOptions();
  const { items, agencyRif, setAgencyRif } = useNoEcoProducts();
  const currentAgencySelected = agencyRif.length
    ? agenciesOptions.find((item) => item.value === agencyRif)?.label
    : "globales";
  return (
    <MainCard
      className={className}
      headerClass={"page-header"}
      title={
        <div className={"page-header"}>
          <Typography variant="h3" className={"title-header"}>
            Productos ecologicos {currentAgencySelected}
          </Typography>
          <FormControl className={"field-form-header-container"}>
            <SelectField
              className="field-form-header"
              fullWidth={true}
              name="agencyRif"
              onChange={(e) => {
                setAgencyRif("" + e.target.value!);
              }}
              label="Agencia"
              options={agenciesOptions}
              helperText={""}
              error={false}
              isAutocomplete={USE_AUTOCOMPLETE}
              value={agencyRif}
            />
          </FormControl>
        </div>
      }
    >
      <Table items={items} />
    </MainCard>
  );
};

interface Props {
  className?: string;
}

export default styled(NoEcoProductsPage)`
  width: 100%;
  display: flex;
  flex-direction: column;
  .field-form-header-container {
    width: 300px;
  }
  .page-header {
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }
`;
