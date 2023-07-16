import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Employee } from 'core/employees/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/employees`;

export default async function editEmployee(employeeDni: string, body: EmployeePayload): Promise<Employee> {
  try {
    const response = await axios.put<Employee>(
      `${URL}/${employeeDni}`, body, {
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

export type EmployeePayload = Omit<Employee, 'employeeDni' | 'createdAt'>;
