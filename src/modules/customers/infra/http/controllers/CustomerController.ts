import { CreateCustomerService } from '@modules/customers/services/CreateCustomerService';
import { DeleteCustomerService } from '@modules/customers/services/DeleteCustomerService';
import { GetCustomerService } from '@modules/customers/services/GetCustomerService';
import { ListCustomersService } from '@modules/customers/services/ListCustomersService';
import { UpdateCustomerService } from '@modules/customers/services/UpdateCustomerService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class CustomerController {
  public async createCustomer(req: Request, res: Response) {
    const { name, email } = req.body;

    const createCustomerService = container.resolve(CreateCustomerService);

    await createCustomerService.execute({ name, email });
    return res.status(201).json({ message: 'Cliente cadastrado com sucesso.' });
  }

  public async listCustomers(req: Request, res: Response) {
    const listCustomersService = container.resolve(ListCustomersService);

    const customers = await listCustomersService.execute();
    return res.status(200).json(customers);
  }

  public async deleteCustomer(req: Request, res: Response) {
    const { id } = req.params;

    const deleteCustomerService = container.resolve(DeleteCustomerService);

    await deleteCustomerService.execute({ id });
    return res.status(204).send();
  }

  public async updateCustomer(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email } = req.body;

    const updateCustomerService = container.resolve(UpdateCustomerService);

    await updateCustomerService.execute({ id, name, email });
    return res.status(204).send();
  }

  public async getCustomer(req: Request, res: Response) {
    const { id } = req.params;

    const getCustomerService = container.resolve(GetCustomerService);

    const customer = await getCustomerService.execute({ id });
    return res.status(200).json(customer);
  }
}
