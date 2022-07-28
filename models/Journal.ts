import { Clients } from "./Clients";
import { JournalLine } from "./JournalLine";
import * as yup from "yup";
import App from "../App";

interface JournalDTO {
  code: string;
  account: string;
  amount: number;
  operation: string;
}

class Journal {
  date: Date;
  client: Clients;
  concept: string;
  lines: JournalLine[];

  constructor(date: Date, client: Clients, concept: string) {
    this.date = date;
    this.client = client;
    this.concept = concept;
    this.lines = [];
  }

  getTotalDebit(): number {
    return this.lines.reduce((acc, line) => acc + line.debit, 0);
  }

  getTotalCredit(): number {
    return this.lines.reduce((acc, line) => acc + line.credit, 0);
  }

  validateTotalsAreEquals(): boolean {
    return this.getTotalCredit() === this.getTotalDebit();
  }

  addLine(journalDto: JournalDTO) {
    let schema = yup.object().shape({
      code: yup.string().required(),
      account: yup.string().required(),
      amount: yup.number().required(),
      operation: yup.string().max(1).required(),
    });

    const validatedData = schema.validateSync(journalDto);

    if (journalDto.operation === "C") {
      this.lines.push(
        new JournalLine(
          validatedData.code,
          validatedData.account,
          0,
          validatedData.amount,
          this
        )
      );
    } else {
      this.lines.push(
        new JournalLine(
          validatedData.code,
          validatedData.account,
          validatedData.amount,
          0,
          this
        )
      );
    }
  }

  deleteLine() {
    const linesCopy: JournalLine[] = this.lines.slice();
    console.log(`Initial lines`, linesCopy);
    //Removing lines
    let newArrays: JournalLine[];

    newArrays = this.lines.filter((a, index) => index != 2);

    console.log(`Deleted lines`, newArrays);
  }
}

export { Journal };
