import json
import re
from datetime import datetime

def merge_colleges_into_schools():
    """
    Merge US colleges and universities data into a new merged schools file.
    Maintains the same format: {id, name, location}
    """
    try:
        print("🔄 Starting merge process...")
        
        # Read existing schools data
        print("📖 Reading existing schools_names.json...")
        with open('/Users/reagan/Documents/GitHub/ThankMyTeacher/ThankMyTeacher/assets/schools_names.json', 'r', encoding='utf-8') as f:
            existing_schools = json.load(f)
        
        print(f"📊 Found {len(existing_schools)} existing schools")
        
        # Read US colleges data
        print("📖 Reading us-colleges-and-universities.json...")
        with open('/Users/reagan/Documents/GitHub/ThankMyTeacher/ThankMyTeacher/assets/us-colleges-and-universities.json', 'r', encoding='utf-8') as f:
            colleges_data = json.load(f)
        
        print(f"📊 Found {len(colleges_data)} colleges/universities")
        
        # Process colleges into the same format as schools
        new_colleges = []
        college_id_counter = len(existing_schools) + 1
        
        for college in colleges_data:
            # Extract college information
            name = college.get('name', 'Unknown College')
            city = college.get('city', '')
            state = college.get('state', '')
            
            # Create location string
            location_parts = []
            if city:
                location_parts.append(city)
            if state:
                location_parts.append(state)
            location = ', '.join(location_parts) if location_parts else 'Unknown Location'
            
            # Create college entry in same format as schools
            college_entry = {
                'id': f'college_{college_id_counter}',
                'name': name,
                'location': location
            }
            
            new_colleges.append(college_entry)
            college_id_counter += 1
        
        print(f"✅ Processed {len(new_colleges)} colleges")
        
        # Merge existing schools with new colleges
        merged_schools = existing_schools + new_colleges
        
        # Sort by name for better organization
        merged_schools.sort(key=lambda x: x['name'].lower())
        
        print(f"📊 Total schools after merge: {len(merged_schools)}")
        
        # Write merged data to a new file
        output_filename = '/Users/reagan/Documents/GitHub/ThankMyTeacher/ThankMyTeacher/assets/schools_names_merged.json'
        with open(output_filename, 'w', encoding='utf-8') as f:
            json.dump(merged_schools, f, indent=2)
        
        print(f"✅ Successfully wrote merged data to: {output_filename}")
        
        # Show statistics
        print(f"\n📈 Statistics:")
        print(f"   - Original schools: {len(existing_schools)}")
        print(f"   - New colleges: {len(new_colleges)}")
        print(f"   - Total after merge: {len(merged_schools)}")
        
        # Show sample of new colleges
        print(f"\n🎓 Sample of new colleges added:")
        for college in new_colleges[:5]:
            print(f"   - {college['name']} ({college['location']})")
        
        # Show sample of merged data
        print(f"\n📚 Sample of merged data (first 3 entries):")
        for school in merged_schools[:3]:
            print(f"   - {school['name']} ({school['location']})")
        
        print(f"\n✅ Merge completed successfully!")
        
    except FileNotFoundError as e:
        print(f"❌ File not found: {e}")
        print("Make sure both schools_names.json and us-colleges-and-universities.json exist in the same directory.")
    except json.JSONDecodeError as e:
        print(f"❌ JSON parsing error: {e}")
        print("Check that both files contain valid JSON.")
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == '__main__':
    merge_colleges_into_schools() 