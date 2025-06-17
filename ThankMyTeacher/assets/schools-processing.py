import json
import re
from datetime import datetime

def process_school_data():
    try:
        # Read the raw data
        with open('/Users/reagan/Documents/GitHub/ThankMyTeacher/ThankMyTeacher/assets/us-public-schools.json', 'r', encoding='utf-8') as f:
            raw_data = f.read()
        
        # Try different parsing strategies
        schools = []
        
        # Strategy 1: Try parsing as regular JSON
        try:
            data = json.loads(raw_data)
            if isinstance(data, list):
                schools = data
            else:
                schools = [data]
        except:
            # Strategy 2: Parse as comma-separated JSON objects
            # Remove trailing commas and spaces
            cleaned = raw_data.strip()
            
            # If it looks like comma-separated objects, wrap in array
            if cleaned.startswith('{') and cleaned.endswith('}'):
                # Split by '},{'  pattern to handle comma-separated objects
                objects = re.split(r'\}\s*,\s*\{', cleaned)
                
                # Add back the braces we removed during split
                for i, obj in enumerate(objects):
                    if i == 0:
                        obj = obj + '}'
                    elif i == len(objects) - 1:
                        obj = '{' + obj
                    else:
                        obj = '{' + obj + '}'
                    
                    try:
                        school = json.loads(obj)
                        schools.append(school)
                    except Exception as e:
                        print(f"Failed to parse object {i}: {e}")
        
        print(f"Successfully parsed {len(schools)} schools")
        
        # Process schools into searchable format
        searchable_schools = []
        
        for i, school in enumerate(schools):
            if not school or 'name' not in school:
                continue
                
            processed = {
                'id': school.get('ncesid') or school.get('objectid') or f'school_{i}',
                'name': school.get('name', 'Unknown School'),
                'address': school.get('address', ''),
                'city': school.get('city', ''),
                'state': school.get('state', ''),
                'zip': school.get('zip', ''),
                'type': determine_school_type(
                    school.get('level'),
                    school.get('st_grade'),
                    school.get('end_grade')
                ),
                'enrollment': school.get('enrollment', 'N/A'),
                'phone': school.get('telephone', ''),
                'website': school.get('website', ''),
                'location': {
                    'lat': float(school.get('latitude', 0)) if school.get('latitude') else None,
                    'lon': float(school.get('longitude', 0)) if school.get('longitude') else None
                },
                'searchText': f"{school.get('name', '')} {school.get('city', '')} {school.get('state', '')}".lower().strip()
            }
            
            searchable_schools.append(processed)
        
        # Sort by name
        searchable_schools.sort(key=lambda x: x['name'])
        
        # Create output
        output = {
            'metadata': {
                'total': len(searchable_schools),
                'lastUpdated': datetime.now().isoformat() + 'Z',
                'source': 'NCES School Data'
            },
            'schools': searchable_schools
        }
        
        # Write searchable file
        with open('schools_searchable.json', 'w', encoding='utf-8') as f:
            json.dump(output, f, indent=2)
        
        print(f"✅ Successfully processed {len(searchable_schools)} schools")
        print(f"📁 Output saved to: schools_searchable.json")
        
        # Show sample
        print("\nSample of processed schools:")
        for school in searchable_schools[:3]:
            print(f"- {school['name']} ({school['city']}, {school['state']})")
        
        # Create names-only file
        names_only = [
            {
                'id': school['id'],
                'name': school['name'],
                'location': f"{school['city']}, {school['state']}"
            }
            for school in searchable_schools
        ]
        
        with open('schools_names.json', 'w', encoding='utf-8') as f:
            json.dump(names_only, f, indent=2)
        
        print(f"\n📁 Names-only file saved to: schools_names.json")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()

def determine_school_type(level, start_grade, end_grade):
    """Determine school type from level and grade information"""
    if level:
        level_upper = str(level).upper()
        if 'ELEMENTARY' in level_upper:
            return 'Elementary School'
        if 'MIDDLE' in level_upper:
            return 'Middle School'
        if 'HIGH' in level_upper:
            return 'High School'
        if level_upper == 'OTHER' and start_grade and end_grade:
            try:
                start = int(start_grade)
                end = int(end_grade)
                if end <= 5:
                    return 'Elementary School'
                elif 6 <= start <= 8 and end <= 8:
                    return 'Middle School'
                elif start >= 9:
                    return 'High School'
                elif start <= 5 and end >= 9:
                    return 'K-12 School'
            except:
                pass
    return 'School'

if __name__ == '__main__':
    process_school_data()