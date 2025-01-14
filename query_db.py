import json
import sqlite3



def get_table_names(database_path: str) -> list:
    """
    Retrieve all table names from a SQLite database.

    :param database_path: Path to the SQLite database file
    :return: List of table names
    """
    try:
        # Connect to the SQLite database
        connection = sqlite3.connect(database_path)
        cursor = connection.cursor()

        # Query to get all table names
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tables = cursor.fetchall()

        # Extract table names from the result
        table_names = [table[0] for table in tables]
        return table_names

    except sqlite3.Error as e:
        print(f"An error occurred: {e}")
        return []

    finally:
        # Ensure the connection is closed
        connection.close()


def query_rows_by_unique_id(database_path: str, table_name: str, unique_id: str) -> list:
    """
    Query rows that match a specific unique_id from a SQLite database and return them as a list of dictionaries.

    :param database_path: Path to the SQLite database file
    :param table_name: Name of the table to query
    :param unique_id: The unique_id to search for
    :return: List of dictionaries with column names as keys and row values as values
    """
    try:
        # Connect to the SQLite database
        connection = sqlite3.connect(database_path)
        cursor = connection.cursor()

        # Get the column names
        cursor.execute(f"PRAGMA table_info({table_name});")
        columns = [col[1] for col in cursor.fetchall()]  # Column names are in the second field of each row
        print(columns)

        # Prepare the SQL query
        query = f"SELECT * FROM {table_name} WHERE unique_id = ?"
        cursor.execute(query, (unique_id,))

        # Fetch all matching rows
        rows = cursor.fetchall()

        # Convert rows to list of dictionaries
        result = [dict(zip(columns, row)) for row in rows]
        return result

    except sqlite3.Error as e:
        print(f"An error occurred: {e}")
        return []

    finally:
        # Ensure the connection is closed
        connection.close()


def find_matching_json_by_char_id(database_path: str, json_path: str, unique_id: str) -> dict:
    """
    Find a matching entry in a JSON file based on the char_id from a SQLite database row with the given unique_id.

    :param database_path: Path to the SQLite database file
    :param json_path: Path to the JSON file
    :param unique_id: The unique_id to search for in the database
    :return: The matching dictionary from the JSON file, or None if no match is found
    """
    try:
        # Step 1: Connect to the database and query for the row with the given unique_id
        connection = sqlite3.connect(database_path)
        cursor = connection.cursor()

        # import pdb; pdb.set_trace()

        # Query the row with the unique_id
        cursor.execute("SELECT char_id FROM characters WHERE unique_id = ?", (unique_id,))
        result = cursor.fetchone()

        if not result:
            print(f"No matching row found in the database for unique_id: {unique_id}")
            return None

        # Extract the char_id from the query result
        char_id = result[0]

        # Step 2: Load the JSON file
        with open(json_path, "r") as json_file:
            json_data = json.load(json_file)

        # Step 3: Search for a matching entry in the JSON data
        for entry in json_data:
            if entry.get("char_id") == char_id:
                return entry  # Return the matching dictionary

        # If no match is found
        print(f"No matching entry found in the JSON file for char_id: {char_id}")
        return None

    except sqlite3.Error as e:
        print(f"Database error: {e}")
        return None
    except (FileNotFoundError, json.JSONDecodeError) as e:
        print(f"Error loading JSON file: {e}")
        return None
    finally:
        # Close the database connection
        connection.close()
        # import pdb; pdb.set_trace()




if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument('--json_path', type=str, default='dldt_data/extracted_character_data_before_removing_flagged.json')
    parser.add_argument('--remove_chars_from_json_path', action='store_true')
    parser.add_argument('--unique_id_list_files', type=str, nargs='+', default='dldt_data/unique_id_flagged_for_deletion_2024-12-02.txt')
    parser.add_argument('--unique_id', type=str, help='Unique id for character in characters table')
    parser.add_argument('--print_tables', action='store_true')
    args = parser.parse_args()

    database_path = "database.sqlite"
    if args.print_tables:
        tables = get_table_names(database_path)

        if tables:
            print("Tables in the database:")
            for table in tables:
                print(table)
        else:
            print("No tables found in the database.")
        exit(0)
    table_name = 'characters'  # Replace with your actual table name
    #unique_id = args.unique_id  # Replace with the unique_id you want to search for

    #result = query_rows_by_unique_id(database_path, table_name, unique_id)
    #result = find_matching_json_by_char_id(database_path, args.json_path, args.unique_id)
    #print(result)

    if args.remove_chars_from_json_path:
        all_chars = json.load(open(args.json_path))
        print(f'Total chars before removing:', len(all_chars))
        unique_ids = [
            '_'.join([line.strip().split('_')[0].capitalize(), line.strip().split('_')[1]])
            for fname in args.unique_id_list_files
            for line in open(fname)
        ]
        for uid in unique_ids:
            #print(uid)
            char_dict = find_matching_json_by_char_id(database_path, args.json_path, uid)
            if char_dict is None:
                print(f'No matching char_dict in json for unique_id:', uid)
            else:
                try:
                    all_chars.remove(char_dict)
                except ValueError as e:
                    print(f'Error: {uid} not in {args.json_path}')
        print(f'Total chars after removing:', len(all_chars))
        with open(f'dldt_data/extracted_character_data.json', 'w') as f:
           json.dump(all_chars, f, indent=4)

