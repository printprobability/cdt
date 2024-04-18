# Author: Jonathan Armoza
# Created: April 11, 2024
# Purpose: Since Nuxt 3 currently has some difficulty generating dynamic routes
# for static site generation in nuxt.config.ts, this Python script will generate
# those routes and they will be imported into the config

# Imports

# Built-ins
import glob
import json
import os


# Globals
ASSETS_DIRECTORY = f"{os.getcwd()}{os.sep}assets{os.sep}"
CONTENT_DIRECTORY = f"{os.getcwd()}{os.sep}content{os.sep}"


# Main script

def get_content_route_ids(p_route_name):

    route_ids = []
    for json_filepath in glob.glob(CONTENT_DIRECTORY + p_route_name + os.sep + "*.json"):
        with open(json_filepath, "r") as input_file:
            json_data = json.load(input_file)
        route_ids.append(json_data["id"])

    return route_ids

def main():

    route_types = ["characters", "books", "groupings"]
    json_output = { rt: get_content_route_ids(rt) for rt in route_types }

    with open(ASSETS_DIRECTORY + "cdt_routes.json", "w") as output_file:
        json.dump(json_output, output_file)

if "__main__" == __name__:
    main()

