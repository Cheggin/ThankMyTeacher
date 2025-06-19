// school.service.ts
import schoolsData from './schools_names_merged.json';

/**
 * Defines the simplified structure for a single school object
 * based on the new data format.
 */
export interface School {
  id: string;
  name: string;
  location: string; // e.g., "MARLBOROUGH, MA"
}

/**
 * The school data is loaded directly from the imported JSON file.
 * The 'as School[]' part tells TypeScript to treat the imported data,
 * which is an array at its root, as an array of School objects.
 */
const schools: School[] = schoolsData as School[];

/**
 * Searches the list of schools based on a query string.
 * The search is case-insensitive and checks both the school's name and location.
 *
 * @param query - The search term entered by the user.
 * @returns An array of School objects that match the search query.
 */
export const searchSchools = (query: string): School[] => {
  if (!query) {
    return [];
  }

  const lowercasedQuery = query.toLowerCase().trim();

  return schools.filter(school => {
    // Combine the name and location to create a searchable string.
    const searchableText = `${school.name} ${school.location}`.toLowerCase();
    return searchableText.includes(lowercasedQuery);
  });
};
