import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { EmployeeEdit } from 'core/employees/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/employees`;

export default async function getEmployee(employeeDni: string): Promise<EmployeeEdit> {
  try {
    const response = await axios.get<EmployeeEdit>(
        `${URL}/${employeeDni}`, {
        headers: {
          Authorization: `Bearer ${store.getState().auth.token}`,
        }
      }
    );
    return response.data;
  } catch (error: unknown) {
    console.log(error);
    throw new BackendError(error);
  }
}
