# dldt


## How to delete characters from database

1. Prepare a list of character ids such as the following:


unique_id_flagged_for_deletion_2024-12-02.txt:
```
everingham_A1679.002
everingham_A1679.004
maxwell_F1667.001
maxwell_F1667.003
```

2. Run the query_db.py script with a wildcard for `--unique_id_list_file` that matches ALL ids to be deleted (including ones in the past!):
```bash
python3 query_db.py --remove_chars_from_json_path --unique_id_list_files dldt_data/unique_id_flagged_for_deletion_202*

```

3. Update and relaunch the site using the instructions below.


## How to update and relaunch the website

```bash
sudo docker compose stop client
sudo rm -r -f .nuxt .output/ node_modules/
npm install && npm run migrate
sudo docker compose start client
```


## How to dump the character database filepaths to a text file

```bash
python3 query_db.py --dump_cached_char_paths dldt_data/cached_char_paths.txt --remove_chars_from_json_path --unique_id_list_files dldt_data/unique_id_flagged_for_deletion_202*
```
