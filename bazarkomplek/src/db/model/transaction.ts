import { getCollection } from "../config";

export default class Transactions {
  static transactionCollection() {
    return getCollection("Transactions");
  }
  static async getTransactionsWithPagination(
    dataPerPage: number,
    page: string,
    filter: string
  ): Promise<Event[]> {
    const agg = [
      {
        $match: {
          name: {
            $regex: filter,
            $options: "i",
          },
        },
      },
      {
        $skip: (+page - 1) * dataPerPage,
      },
      {
        $limit: dataPerPage,
      },
    ];
    const cursor = this.transactionCollection().aggregate(agg);
    const events = (await cursor.toArray()) as Event[];
    return events;
  }
  static async getAllEvents({
    page,
    filter,
  }: {
    page: string;
    filter: string;
  }) {
    const result = await this.getTransactionsWithPagination(4, page, filter);
    return result;
  }
}
