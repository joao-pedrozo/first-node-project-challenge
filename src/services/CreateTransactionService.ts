import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: RequestDTO): Transaction {
    const balance = this.transactionsRepository.getBalance();
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    if (transaction.type === 'outcome' && balance.total < transaction.value) {
      throw Error('Your balance is not enough to make this operation');
    }

    return transaction;
  }
}

export default CreateTransactionService;
