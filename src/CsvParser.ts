export class CsvParser {
  public static parseRow(text: string): string[] {
    const result = [];

    let current = "";
    let insideQuotas = false;
    for (const char of text) {
      switch (char) {
        case ",":
          if (insideQuotas) {
            current += char;
          } else {
            result.push(current);
            current = "";
          }
          break;

        case '"':
          insideQuotas = !current;
          break;

        default:
          current += char;
          break;
      }
    }

    result.push(current); // last value

    return result.map((v) => v.trim());
  }

  public static parseSection<T>(text: string): T[] {
    const notEmptyRows = text
      .split("\n")
      .filter((row) => row.length > 0 && !row.startsWith(","));

    const result: T[] = [];

    const [headRow, ...rows] = notEmptyRows;
    let headers = CsvParser.parseRow(headRow);

    for (const row of rows) {
      const values = CsvParser.parseRow(row);
      if (values[0].toLowerCase() === "sid") {
        headers = values;
        continue;
      }

      const record = headers.reduce((acc: any, header, i) => {
        if (!header) {
          return acc;
        }

        acc[header] = values[i];

        return acc;
      }, {} as T);

      result.push(record);
    }

    return result;
  }

  public static parseFile<T>(text: string): T[] {
    return CsvParser.parseSection(text); // TODO Split to sections
  }
}
