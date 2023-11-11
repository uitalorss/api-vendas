import { Request, Response } from 'express';
import { CreateCustomerService } from '../services/CreateCustomerService';
import { ListCustomersService } from '../services/ListCustomersService';
import { DeleteCustomerService } from '../services/DeleteCustomerService';
import { UpdateCustomerService } from '../services/UpdateCustomerService';
import { GetCustomerService } from '../services/GetCustomerService';

export class CustomerController {
  public async createCustomer(req: Request, res: Response) {
    const { name, email } = req.body;
    const createCustomerService = new CreateCustomerService();
    await createCustomerService.execute({ name, email });
    return res.status(201).json({ message: 'Cliente cadastrado com sucesso.' });
  }

  public async listCustomers(req: Request, res: Response) {
    const listCustomersService = new ListCustomersService();
    const customers = await listCustomersService.execute();
    return res.status(200).json(customers);
  }

  public async deleteCustomer(req: Request, res: Response) {
    const { id } = req.params;
    const deleteCustomerService = new DeleteCustomerService();
    await deleteCustomerService.execute({ id });
    return res.status(204).send();
  }

  public async updateCustomer(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email } = req.body;

    const updateCustomerService = new UpdateCustomerService();
    await updateCustomerService.execute({ id, name, email });
    return res.status(204).send();
  }

  public async getCustomer(req: Request, res: Response) {
    const { id } = req.params;
    const getCustomerService = new GetCustomerService();
    const customer = await getCustomerService.execute({ id });
    return res.status(200).json(customer);
  }
}
