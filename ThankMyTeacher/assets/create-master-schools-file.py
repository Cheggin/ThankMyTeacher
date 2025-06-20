#!/usr/bin/env python3
"""
Script to create a master schools file by combining:
1. US colleges and universities (from us-colleges-and-universities.json)
2. K-12 schools (from schools_searchable.json)

This creates a comprehensive database of all educational institutions.
"""

import json
import os
from datetime import datetime
from typing import Dict, List, Set

def load_colleges_data() -> List[dict]:
    """
    Load and process US colleges and universities data
    """
    print("📖 Loading US colleges and universities data...")
    
    try:
        with open('assets/us-colleges-and-universities.json', 'r', encoding='utf-8') as f:
            colleges_data = json.load(f)
        
        print(f"📊 Loaded {len(colleges_data)} colleges/universities")
        
        # Process colleges into standardized format
        processed_colleges = []
        college_id_counter = 1
        
        for college in colleges_data:
            name = college.get('name', 'Unknown College').strip()
            city = college.get('city', '').strip()
            state = college.get('state', '').strip()
            
            # Skip entries without proper name
            if not name or name == 'Unknown College':
                continue
            
            # Create location string
            location_parts = []
            if city:
                location_parts.append(city)
            if state:
                location_parts.append(state)
            location = ', '.join(location_parts) if location_parts else 'Unknown Location'
            
            # Create standardized college entry
            college_entry = {
                'id': f'college_{college_id_counter}',
                'name': name,
                'location': location,
                'city': city,
                'state': state,
                'type': 'College/University',
                'level': 'Higher Education',
                'address': college.get('address', ''),
                'zip': college.get('zip', ''),
                'phone': college.get('phone', ''),
                'website': college.get('website', ''),
                'latitude': college.get('latitude'),
                'longitude': college.get('longitude'),
                'enrollment': college.get('enrollment', ''),
                'searchText': f"{name} {city} {state}".lower().strip()
            }
            
            processed_colleges.append(college_entry)
            college_id_counter += 1
        
        print(f"✅ Processed {len(processed_colleges)} colleges/universities")
        return processed_colleges
        
    except FileNotFoundError:
        print("❌ us-colleges-and-universities.json not found!")
        return []
    except Exception as e:
        print(f"❌ Error loading colleges data: {e}")
        return []

def load_k12_schools_data() -> List[dict]:
    """
    Load and process K-12 schools data
    """
    print("📖 Loading K-12 schools data...")
    
    try:
        with open('assets/schools_searchable.json', 'r', encoding='utf-8') as f:
            schools_data = json.load(f)
        
        schools = schools_data.get('schools', [])
        print(f"📊 Loaded {len(schools)} K-12 schools")
        
        # Process K-12 schools into standardized format
        processed_schools = []
        
        for school in schools:
            name = school.get('name', '').strip()
            
            # Skip entries without proper name
            if not name:
                continue
            
            # Create location string
            city = school.get('city', '').strip()
            state = school.get('state', '').strip()
            location_parts = []
            if city:
                location_parts.append(city)
            if state:
                location_parts.append(state)
            location = ', '.join(location_parts) if location_parts else 'Unknown Location'
            
            # Determine school level
            school_type = school.get('type', 'School')
            level = 'K-12 Education'
            
            # Create standardized school entry
            school_entry = {
                'id': school.get('id', f'school_{len(processed_schools) + 1}'),
                'name': name,
                'location': location,
                'city': city,
                'state': state,
                'type': school_type,
                'level': level,
                'address': school.get('address', ''),
                'zip': school.get('zip', ''),
                'phone': school.get('phone', ''),
                'website': school.get('website', ''),
                'latitude': school.get('location', {}).get('lat'),
                'longitude': school.get('location', {}).get('lon'),
                'enrollment': school.get('enrollment', ''),
                'searchText': f"{name} {city} {state}".lower().strip()
            }
            
            processed_schools.append(school_entry)
        
        print(f"✅ Processed {len(processed_schools)} K-12 schools")
        return processed_schools
        
    except FileNotFoundError:
        print("❌ schools_searchable.json not found!")
        return []
    except Exception as e:
        print(f"❌ Error loading K-12 schools data: {e}")
        return []

def remove_duplicates(schools: List[dict]) -> List[dict]:
    """
    Remove duplicate schools based on name and location
    """
    print("🔍 Removing duplicates...")
    
    seen = set()
    unique_schools = []
    duplicates_removed = 0
    
    for school in schools:
        # Create a unique key based on name and location
        key = f"{school['name'].lower()}_{school['location'].lower()}"
        
        if key not in seen:
            seen.add(key)
            unique_schools.append(school)
        else:
            duplicates_removed += 1
    
    print(f"✅ Removed {duplicates_removed} duplicates")
    print(f"📊 Final count: {len(unique_schools)} unique schools")
    
    return unique_schools

def create_master_schools_file():
    """
    Main function to create the master schools file
    """
    print("🚀 Starting master schools file creation...")
    
    # Load colleges data
    colleges = load_colleges_data()
    if not colleges:
        print("❌ No colleges data loaded")
        return
    
    # Load K-12 schools data
    k12_schools = load_k12_schools_data()
    if not k12_schools:
        print("❌ No K-12 schools data loaded")
        return
    
    # Combine all schools
    all_schools = colleges + k12_schools
    print(f"📊 Combined total: {len(all_schools)} schools")
    
    # Remove duplicates
    unique_schools = remove_duplicates(all_schools)
    
    # Sort by name for better organization
    unique_schools.sort(key=lambda x: x['name'].lower())
    
    # Create statistics
    colleges_count = len([s for s in unique_schools if s['level'] == 'Higher Education'])
    k12_count = len([s for s in unique_schools if s['level'] == 'K-12 Education'])
    
    schools_with_coords = len([s for s in unique_schools if s.get('latitude') and s.get('longitude')])
    schools_without_coords = len([s for s in unique_schools if not s.get('latitude') or not s.get('longitude')])
    
    # Create the master file
    master_data = {
        'metadata': {
            'total': len(unique_schools),
            'colleges': colleges_count,
            'k12_schools': k12_count,
            'withCoordinates': schools_with_coords,
            'withoutCoordinates': schools_without_coords,
            'lastUpdated': datetime.now().isoformat() + 'Z',
            'source': 'US Colleges + NCES K-12 Schools'
        },
        'schools': unique_schools
    }
    
    # Save the master file
    output_filename = 'assets/schools_master.json'
    with open(output_filename, 'w', encoding='utf-8') as f:
        json.dump(master_data, f, indent=2)
    
    print(f"\n✅ Master schools file created: {output_filename}")
    
    # Show statistics
    print(f"\n📈 Statistics:")
    print(f"   - Total schools: {len(unique_schools)}")
    print(f"   - Colleges/Universities: {colleges_count}")
    print(f"   - K-12 Schools: {k12_count}")
    print(f"   - With coordinates: {schools_with_coords}")
    print(f"   - Without coordinates: {schools_without_coords}")
    
    # Show sample of each type
    print(f"\n🎓 Sample colleges/universities:")
    colleges_sample = [s for s in unique_schools if s['level'] == 'Higher Education'][:3]
    for school in colleges_sample:
        print(f"   - {school['name']} ({school['location']})")
    
    print(f"\n🏫 Sample K-12 schools:")
    k12_sample = [s for s in unique_schools if s['level'] == 'K-12 Education'][:3]
    for school in k12_sample:
        print(f"   - {school['name']} ({school['location']})")
    
    # Create a simplified version for the map (with coordinates only)
    map_schools = [s for s in unique_schools if s.get('latitude') and s.get('longitude')]
    
    map_data = {
        'metadata': {
            'total': len(map_schools),
            'lastUpdated': datetime.now().isoformat() + 'Z',
            'source': 'Master Schools Database (with coordinates only)'
        },
        'schools': map_schools
    }
    
    map_filename = 'assets/schools_master_map.json'
    with open(map_filename, 'w', encoding='utf-8') as f:
        json.dump(map_data, f, indent=2)
    
    print(f"\n🗺️ Map-ready file created: {map_filename}")
    print(f"   - Schools with coordinates: {len(map_schools)}")
    
    print(f"\n🎉 Master schools file creation completed successfully!")

if __name__ == '__main__':
    create_master_schools_file() 