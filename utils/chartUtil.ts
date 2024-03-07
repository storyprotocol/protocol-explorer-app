interface DataItem {
  [key: string]: any;
}

interface Occurrence {
  [key: string]: number;
}

interface ResultItem {
  [key: string]: string | number;
}

interface Groups {
  [key: string]: {
    [key: string]: number;
  };
}

interface Result {
  keys: string[];
  index: string;
  results: object[];
}

export function calculateOccurrences(data: DataItem[], keyProp: string): ResultItem[] {
  const occurrences: Occurrence = {};

  for (const item of data) {
    const value: string = item[keyProp];
    if (occurrences[value]) {
      occurrences[value]++;
    } else {
      occurrences[value] = 1;
    }
  }

  const result: ResultItem[] = [];
  for (const [value, total] of Object.entries(occurrences)) {
    result.push({ [keyProp]: value, total });
  }

  return result;
}

export function groupAndCalculateTotal(data: DataItem[], firstKeyProp: string, secondKeyProp: string): Result {
  const groups: Groups = {};
  const keys: Set<string> = new Set();

  for (const item of data) {
    const firstKeyValue: string = item[firstKeyProp];
    const secondKeyValue: string = item[secondKeyProp];

    keys.add(secondKeyValue);

    if (!groups[firstKeyValue]) {
      groups[firstKeyValue] = {};
    }

    if (!groups[firstKeyValue][secondKeyValue]) {
      groups[firstKeyValue][secondKeyValue] = 1;
    } else {
      groups[firstKeyValue][secondKeyValue]++;
    }
  }

  const results: object[] = [];
  for (const [firstKey, secondGroup] of Object.entries(groups)) {
    const resultItem: { [key: string]: any } = { [firstKeyProp]: firstKey };
    for (const [secondKey, total] of Object.entries(secondGroup)) {
      resultItem[secondKey] = total;
    }
    results.push(resultItem);
  }

  return { keys: Array.from(keys), index: firstKeyProp, results };
}
