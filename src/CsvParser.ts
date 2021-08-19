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

    return result.map(v => v.trim());
  }

  public static parseSection<T>(text: string): T[] {
    return [];
  }
}
