import {
  createCustomerMock,
  deleteCustomerMock,
  getCustomerByIdMock,
  getCustomersMock,
  updateCustomerMock,
} from "./crud-customers-mock";

export const handlers = [
  getCustomersMock,
  getCustomerByIdMock,
  createCustomerMock,
  deleteCustomerMock,
  updateCustomerMock,
];
