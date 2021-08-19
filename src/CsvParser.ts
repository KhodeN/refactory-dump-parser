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

    const [headRow, ...rows] = notEmptyRows;
    const headers = CsvParser.parseRow(headRow);

    return rows.map((row) => {
      const values = CsvParser.parseRow(row);

      return headers.reduce((acc: any, header, i) => {
        if (!header) {
          return acc;
        }

        acc[header] = values[i];

        return acc;
      }, {} as T);
    });
  }
}
