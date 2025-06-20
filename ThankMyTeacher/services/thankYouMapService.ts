import { supabase } from '../assets/supabase';
import schoolsData from '../assets/schools_master_map.json';

export interface SchoolMapData {
  id: string;
  name: string;
  location: string;
  latitude: number;
  longitude: number;
  thankYouCount: number;
}

interface SchoolFromFile {
  id: string;
  name: string;
  location: string;
  latitude: number;
  longitude: number;
}

interface SchoolsDataFile {
  metadata: any;
  schools: SchoolFromFile[];
}

/**
 * Get schools data from the imported JSON file
 */
const getSchoolsData = (): SchoolFromFile[] => {
  try {
    console.log('📚 Loading schools data from imported JSON...');
    const data = schoolsData as SchoolsDataFile;
    const schools = data.schools || [];
    console.log(`✅ Loaded ${schools.length} schools from file`);
    return schools;
  } catch (error) {
    console.error('❌ Error loading schools data:', error);
    return [];
  }
};

/**
 * Find a school in the schools data by name
 */
const findSchoolInData = (schoolName: string, schoolsData: SchoolFromFile[]): SchoolFromFile | null => {
  if (!schoolName) return null;
  
  const normalizedSearchName = schoolName.toLowerCase().trim();
  console.log(`🔍 Searching for school: "${schoolName}"`);
  
  // Try exact match first
  const exactMatch = schoolsData.find(school => 
    school.name.toLowerCase() === normalizedSearchName
  );
  
  if (exactMatch) {
    console.log(`✅ Exact match found: ${exactMatch.name}`);
    return exactMatch;
  }
  
  // Try partial match
  const partialMatch = schoolsData.find(school => 
    school.name.toLowerCase().includes(normalizedSearchName) ||
    normalizedSearchName.includes(school.name.toLowerCase())
  );
  
  if (partialMatch) {
    console.log(`✅ Partial match found: ${partialMatch.name}`);
    return partialMatch;
  }
  
  console.log(`❌ No match found for: "${schoolName}"`);
  return null;
};

/**
 * Fetch aggregated thank you data for the map
 * Gets school names from thank_yous table and looks up coordinates in schools_master_map.json
 */
export const fetchThankYouMapData = async (): Promise<SchoolMapData[]> => {
  try {
    console.log('🗺️ Fetching thank you map data...');
    
    // Get schools data from the imported JSON file
    const schoolsData = getSchoolsData();
    if (schoolsData.length === 0) {
      console.error('❌ No schools data loaded');
      return [];
    }
    
    // Fetch thank you data from Supabase
    console.log('📖 Fetching thank you data from database...');
    
    const { data: thankYouData, error: thankYouError } = await supabase
      .from('thank_yous')
      .select('*');

    if (thankYouError) {
      console.error('❌ Error fetching thank you data:', thankYouError);
      return [];
    }

    console.log(`📊 Raw thank you data:`, thankYouData);

    if (!thankYouData || thankYouData.length === 0) {
      console.log('📭 No thank you data found');
      return [];
    }

    console.log(`📊 Found ${thankYouData.length} thank you records`);

    // Group thank yous by school and find coordinates
    const schoolMap = new Map<string, SchoolMapData>();
    let foundCoordinates = 0;
    let missingCoordinates = 0;

    for (const thankYou of thankYouData) {
      console.log(`\n🔍 Processing thank you:`, {
        id: thankYou.id,
        school_name: thankYou.school_name,
        teacher_name: thankYou.teacher_name,
        user_id: thankYou.user_id
      });
      
      const schoolName = thankYou.school_name?.trim();
      
      if (!schoolName) {
        console.log(`⚠️  Skipping thank you with no school name`);
        continue;
      }
      
      const schoolKey = schoolName;
      
      if (!schoolMap.has(schoolKey)) {
        // Look up this school in the schools data
        const schoolFromFile = findSchoolInData(schoolName, schoolsData);
        
        if (schoolFromFile) {
          schoolMap.set(schoolKey, {
            id: schoolFromFile.id,
            name: schoolName,
            location: schoolFromFile.location,
            latitude: schoolFromFile.latitude,
            longitude: schoolFromFile.longitude,
            thankYouCount: 1
          });
          foundCoordinates++;
          console.log(`✅ Found coordinates for: ${schoolName} (${schoolFromFile.latitude}, ${schoolFromFile.longitude})`);
        } else {
          // School not found in file - use mock coordinates for now
          const mockLat = 37.0902 + (Math.random() - 0.5) * 10;
          const mockLng = -95.7129 + (Math.random() - 0.5) * 20;
          
          schoolMap.set(schoolKey, {
            id: schoolKey,
            name: schoolName,
            location: schoolName,
            latitude: mockLat,
            longitude: mockLng,
            thankYouCount: 1
          });
          missingCoordinates++;
          console.log(`⚠️  No coordinates found for: ${schoolName} (using mock data: ${mockLat}, ${mockLng})`);
        }
      } else {
        // Increment thank you count for existing school
        const existing = schoolMap.get(schoolKey)!;
        existing.thankYouCount += 1;
        console.log(`📈 Incremented count for existing school: ${schoolName} (now ${existing.thankYouCount})`);
      }
    }

    const result = Array.from(schoolMap.values());
    
    console.log(`\n📊 Final Results:`);
    console.log(`   - Total thank you records: ${thankYouData.length}`);
    console.log(`   - Unique schools: ${result.length}`);
    console.log(`   - Schools with real coordinates: ${foundCoordinates}`);
    console.log(`   - Schools with mock coordinates: ${missingCoordinates}`);
    console.log(`   - Final result:`, result);
    
    return result;
    
  } catch (error) {
    console.error('❌ Exception fetching thank you map data:', error);
    return [];
  }
};

/**
 * Fetch thank you data for a specific school
 */
export const fetchSchoolThankYous = async (schoolId: string) => {
  try {
    const { data, error } = await supabase
      .from('thank_yous')
      .select('*')
      .eq('school_id', schoolId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ Error fetching school thank yous:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('❌ Exception fetching school thank yous:', error);
    return [];
  }
}; 