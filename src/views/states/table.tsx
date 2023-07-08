import {
    Button,
} from '@mui/material';
import { IconTrash, IconEdit } from '@tabler/icons';
import DynamicTable from 'components/DynamicTable';
// Own
import { State } from 'core/states/types';

function createData(stateId: number, name: string, createdAt: string): State {
    return { stateId, name, createdAt };
}

const rows = [
    createData(1, 'Frozen yoghurt', '2021-10-01'),
    createData(2, 'Frozen yoghurt', '2021-10-01'),
    createData(3, 'Frozen yoghurt', '2021-10-01'),
    createData(4, 'Frozen yoghurt', '2021-10-01'),
];

export default function BasicTable() {
    return (
        <DynamicTable headers={[
            { columnLabel: 'Id', fieldName: 'stateId', cellAlignment: 'left' },
            { columnLabel: 'Nombre', fieldName: 'name', cellAlignment: 'left' },
            { columnLabel: 'Creación', fieldName: 'createdAt', cellAlignment: 'right' }
        ]} rows={rows} components={[
            (row) =>
            <Button color="primary" startIcon={<IconEdit />}>
                Editar
            </Button>,
            (row) =>
            <Button color="secondary" startIcon={<IconTrash />}>
                Eliminar
            </Button>
        ]} />
    );
}
