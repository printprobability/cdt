# Author: Jonathan Armoza
# Created: May 14, 2024
# Purpose: Takes in a list of one more Print & Probability character grouping
#          IDs and creates json content files (e.g. books, characters, and
#          groupings) for the Catalogue of Distinctive Type website

# Imports

# Built-ins
import json
import os
import requests
import sys
from uuid import UUID


# Globals

API_TOKEN_FILE_PATH = "{0}{1}ingest{1}bridges_files{1}api_token.txt".format(os.getcwd(), os.sep)
API_URLS = {

    "BOOKS": "https://printprobdb.psc.edu/api/books/",
    "CHARACTERS": "https://printprobdb.psc.edu/api/characters/",
    "GROUPINGS": "https://printprobdb.psc.edu/api/character_groupings/"
}
CERTIFICATE_FILE_PATH = "{0}{1}ingest{1}bridges_files{1}server.crt".format(os.getcwd(), os.sep)
DEFAULT_OUTPUT_DIRECTORY = "{0}{1}content{1}".format(os.getcwd(), os.sep)


# Classes

class API_Object:

    def __init__(self, p_grouping_id, p_api_url, p_object_txt_name):

        self.m_id = p_grouping_id
        self.m_object_txt_name = p_object_txt_name
        self.m_api_object = API_Object.get_api_object(p_api_url, p_grouping_id, p_object_txt_name)

    @property
    def api_object(self):
        return self.m_api_object
    @property
    def id(self):
        return self.m_id
    @property
    def object_name(self):
        return self.m_object_txt_name

    def output_to_file(self, p_output_directory):
        with open(f"{p_output_directory}{self.m_object_txt_name}_{self.m_id}.json", "w") as output_file:
            json.dump(self.m_api_object, output_file)

    def to_json(self):
        return None       

    @staticmethod
    def get_api_object(p_api_url, p_uuid, p_object_name):

        print(f"Retrieving data for {p_object_name}: {p_uuid}...")

        try:
            r = requests.get(
                f"{p_api_url}{p_uuid}/",
                headers=API_Object.headers,
                verify=CERTIFICATE_FILE_PATH
            )
            return r.json() if 200 == r.status_code and "application/json" == r.headers["Content-Type"] else None

        except requests.exceptions.HTTPError as err:

            print(f"Error fetching existing {p_object_name} for {p_uuid}: {err}")
            exit(0)

    @staticmethod
    def is_valid_uuid(p_uuid_to_test, p_version=4):

        try:
            uuid_obj = UUID(p_uuid_to_test, version=p_version)
        except ValueError:
            return False

        return str(uuid_obj) == p_uuid_to_test

    @staticmethod
    def _build_headers(token):

        return { "Authorization": "Token {}".format(token) }

    @staticmethod
    def _load_token(path_to_token):

        with open(path_to_token) as f:

            token = f.read()
            token = token.rstrip()

        return token        

    # Static fields
    headers = _build_headers(_load_token(API_TOKEN_FILE_PATH))

class Book(API_Object):

    # Static fields
    s_api_url = API_URLS["BOOKS"]
    s_object_txt_name = "book"
    
    def __init__(self, p_grouping_id):

        super().__init__(p_grouping_id, Book.s_api_url, Book.s_object_txt_name)
        
    def to_json(self):

        return {

            "id": self.m_api_object["id"],
            "eebo": self.m_api_object["eebo"],
            "vid": self.m_api_object["vid"],
            "tcp": self.m_api_object["tcp"],
            "estc": self.m_api_object["estc"],
            "label": self.m_api_object["label"],
            "ppPublisher": self.m_api_object["pp_publisher"],
            "ppAuthor": self.m_api_object["pp_author"],
            "pqPublisher": self.m_api_object["pq_publisher"],
            "pqTitle": self.m_api_object["pq_title"],
            "pqUrl": self.m_api_object["pq_url"],
            "pqAuthor": self.m_api_object["pq_author"],
            "pqYearVerbatim": self.m_api_object["pq_year_verbatim"],
            "pqYearEarly": self.m_api_object["pq_year_early"],
            "pqYearLate": self.m_api_object["pq_year_late"],
            "nSpreads": len(self.m_api_object["spreads"]),
            "coverPage": {
                "id": self.m_api_object["cover_page"]["id"],
                "label": self.m_api_object["cover_page"]["label"],
                "sequence": self.m_api_object["cover_page"]["sequence"],
                "side": self.m_api_object["cover_page"]["side"],
                "image": {
                    
                    "tif": self.m_api_object["cover_page"]["image"]["tif"],
                    "iiifBase": self.m_api_object["cover_page"]["image"]["iiif_base"],
                    "webUrl": self.m_api_object["cover_page"]["image"]["web_url"],
                    "thumbnail": self.m_api_object["cover_page"]["image"]["thumbnail"],
                    "fullTif": self.m_api_object["cover_page"]["image"]["full_tif"]
                }
            },
            "isEeboBook": self.m_api_object["is_eebo_book"],
            "repository": self.m_api_object["repository"],
            "ppPrinter": self.m_api_object["pp_printer"],
            "colloqPrinter": self.m_api_object["colloq_printer"],
            "ppNotes": self.m_api_object["pp_notes"]
        }

class Character(API_Object):

    # Static fields
    s_api_url = API_URLS["CHARACTERS"]
    s_object_txt_name = "character"
    
    def __init__(self, p_grouping_id):

        super().__init__(p_grouping_id, Character.s_api_url, Character.s_object_txt_name)

    @property
    def book(self):
        return self.m_api_object["book"]["id"]
        
    def to_json(self):

        return {

            "id": self.m_api_object["id"],
            "label": self.m_api_object["label"],
            "sequence": self.m_api_object["sequence"],
            "characterClass": self.m_api_object["character_class"],
            "classProbability": self.m_api_object["class_probability"],
            "book": self.m_api_object["book"]["id"],
            "page": {

                "id": self.m_api_object["page"]["id"],
                "label": self.m_api_object["page"]["label"],
                "sequence": self.m_api_object["page"]["sequence"],
                "side": self.m_api_object["page"]["side"],
                "image": {

                    "tif": self.m_api_object["page"]["image"]["tif"],
                    "iiifBase": self.m_api_object["page"]["image"]["iiif_base"],
                    "webUrl": self.m_api_object["page"]["image"]["web_url"],
                    "thumbnail": self.m_api_object["page"]["image"]["thumbnail"],
                    "fullTif": self.m_api_object["page"]["image"]["full_tif"]
                }
            },
            "image": {

                "webUrl": self.m_api_object["image"]["web_url"],
                "thumbnail": self.m_api_object["image"]["thumbnail"],
                "buffer": self.m_api_object["image"]["buffer"]
            },
            "absoluteCoords": {

                "x": self.m_api_object["absolute_coords"]["x"],
                "y": self.m_api_object["absolute_coords"]["y"],
                "w": self.m_api_object["absolute_coords"]["w"],
                "h": self.m_api_object["absolute_coords"]["h"]
            }
        }

class Grouping(API_Object):

    # Static fields
    s_api_url = API_URLS["GROUPINGS"]
    s_object_txt_name = "character grouping"
    
    def __init__(self, p_grouping_id):

        super().__init__(p_grouping_id, Grouping.s_api_url, Grouping.s_object_txt_name)

    @property
    def characters(self):
        return [entry["id"] for entry in self.m_api_object["characters"]]
        
    def to_json(self):

        return {

            "id": self.m_api_object["id"],
            "label": self.m_api_object["label"],
            "notes": self.m_api_object["notes"],
            "characters": [character["id"] for character in self.m_api_object["characters"]]
        }

# Utility functions
def format_path(original_path):

    '''Make sure given path ends with system folder separator'''
    return original_path if original_path.endswith(os.sep) else original_path + os.sep


# Main script

def main(p_grouping_ids, p_output_directory):

    print("Retrieving data from API...")

    # 1. Create a list of character grouping objects from the database
    character_ids = []
    character_objects = []
    grouping_objects = []
    for grouping_id in p_grouping_ids:

        # A. Get the grouping object from the database
        grouping_obj = Grouping(grouping_id)
        grouping_objects.append(grouping_obj)

        # B.Accrue a list of characters
        character_ids.extend(grouping_obj.characters)

    # 2. Create a list of character objects from the database
    character_ids = list(set(character_ids))
    character_objects = [Character(character_id) for character_id in character_ids]

    # 3. Create a list of book objects where the characters are featured
    book_ids = list(set([character.book for character in character_objects]))
    book_objects = [Book(book_id) for book_id in book_ids]

    print(f"Writing json data for catalogue to subdirectories in {p_output_directory}...")

    # 4. Write all objects to the appropriate subdirectories in the output directory

    object_info = {

        "books": book_objects,
        "characters": character_objects,
        "groupings": grouping_objects
    }
    for subdir in object_info:

        # A. Make sure all subdirectories exist
        if not os.path.exists(p_output_directory + subdir):
            os.makedirs(p_output_directory + subdir)

        # B. Write out all json objects to file in this subdirectory
        for obj in object_info[subdir]:
            json_data_str = json.dumps(obj.to_json(), indent=4)

            output_filename = f"{p_output_directory}{subdir}{os.sep}{obj.id}.json"
            print(f"Writing {output_filename}...")
            with open(output_filename, "w") as output_file:
                output_file.write(json_data_str)

if "__main__" == __name__:

    print("Catalogue of Distinctive Type Ingestion Script")

    # 0. Check command line argument validity

    # Must have an ID/ID file filepath or ID/ID file filepath + output directory
    if len(sys.argv) != 2 and len(sys.argv) != 3:
        print("Usage: python ingest_groupings.py <grouping ID|text file filepath>")

    # 1. Prepare arguments for the script

    grouping_ids = []
    output_directory = DEFAULT_OUTPUT_DIRECTORY
    
    # A. Single grouping ID is input
    if API_Object.is_valid_uuid(sys.argv[1]):
        grouping_ids.append(sys.argv[1])

    # B. Path to text file containing mulitple grouping IDs is input
    if os.path.exists(sys.argv[1]):
        with open(sys.argv[1], "r") as input_file:
            input_lines = input_file.readlines()
            for line in lines:
                possible_id = line.strip()
                if not API_Object.is_valid_uuid(line.strip()):
                    print(f"{possible_id} is not a valid UUID")
                else:
                    grouping_ids.append(possible_id)

    # C. Output directory, if given
    if len(sys.argv) == 3:
        output_directory = format_path(sys.argv[2])

    print(f"Arguments:\n\tgrouping_ids: {grouping_ids}\n\toutput_directory: {output_directory}")

    # 2. Main script
    main(grouping_ids, output_directory)