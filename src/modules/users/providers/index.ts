import { container } from 'tsyringe';
import { IHashProvider } from './HashProvider/models/IHashProvider';
import { HashProvider } from './HashProvider/implementations/HashProvider';

container.registerSingleton<IHashProvider>('HashProvider', HashProvider);
