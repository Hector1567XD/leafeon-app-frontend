type QueryParams = Record<string, string | number | boolean>;

export default function addQueryParams(url: string, queryParams: QueryParams): string {
  const urlObj = new URL(url);
  Object.entries(queryParams).forEach(([key, value]) => {
    urlObj.searchParams.append(key, String(value));
  });
  return urlObj.toString();
}
