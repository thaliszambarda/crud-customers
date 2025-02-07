import { http, HttpResponse } from "msw";

export interface ICustomersData {
  id: number;
  customer: string;
  status?: string;
  corporateReason: string;
  cnpj: string;
  phone?: string;
  stateRegistration?: string;
  executive: string;
  multiSite: string;
  type: string;
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number?: string;
  complement?: string;
}

const STORAGE_KEY = "customers";

const getInitialData = () => {
  const storedData = localStorage.getItem(STORAGE_KEY);
  return storedData ? JSON.parse(storedData) : [];
};

let customers: ICustomersData[] = getInitialData();

const saveToLocalStorage = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
};

export const getCustomersMock = http.get<never, typeof customers>(
  "/api/customers",
  async () => {
    return HttpResponse.json(customers);
  }
);

export const getCustomerByIdMock = http.get<
  { id: string },
  (typeof customers)[0]
>("/api/customer/:id", async ({ params }) => {
  const id = parseInt(params.id);
  const customer = customers.find((c: (typeof customers)[0]) => c.id === id);
  if (!customer) {
    return HttpResponse.json(
      { message: "Customer not found" },
      { status: 404 }
    );
  }
  return HttpResponse.json(customer);
});

export const createCustomerMock = http.post<never, (typeof customers)[0]>(
  "/api/customers",
  async ({ request }) => {
    const customerData = await request.json();
    const newCustomer = { ...customerData, id: customers.length + 1 };
    customers.push(newCustomer);
    saveToLocalStorage();
    return HttpResponse.json(newCustomer, { status: 201 });
  }
);

export const updateCustomerMock = http.put<
  { id: string },
  (typeof customers)[0]
>("/api/customer/:id", async ({ params, request }) => {
  const updatedData = await request.json();
  const id = parseInt(params.id);
  const customerIndex = customers.findIndex(
    (c: (typeof customers)[0]) => c.id === id
  );
  if (customerIndex === -1) {
    return HttpResponse.json(
      { message: "Customer not found" },
      { status: 404 }
    );
  }
  customers[customerIndex] = { ...customers[customerIndex], ...updatedData };
  saveToLocalStorage();
  return HttpResponse.json(customers[customerIndex]);
});

export const deleteCustomerMock = http.delete<{ id: string }, never>(
  "/api/customer/:id",
  async ({ params }) => {
    const id = parseInt(params.id);
    const customerIndex = customers.findIndex(
      (c: (typeof customers)[0]) => c.id === id
    );

    if (customerIndex === -1) {
      return HttpResponse.json("Customer not found", { status: 404 });
    }

    customers[customerIndex].status = "Inativo";
    saveToLocalStorage();

    return new HttpResponse(null, { status: 204 });
  }
);
