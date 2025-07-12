import os
import mysql.connector
import random

MYSQL_ROOT_PASSWORD = os.environ['MYSQL_ROOT_PASSWORD']
MYSQL_NAME = os.environ['MYSQL_NAME']

def main():
    conn = mysql.connector.connect(
        host="mysql",
        user="root",
        password=MYSQL_ROOT_PASSWORD,
        database=MYSQL_NAME
    )
    cursor = conn.cursor()

    cursor.execute("SELECT id, weight FROM champions")
    champions = cursor.fetchall()

    cursor.execute("SELECT SUM(weight) FROM champions")
    sum = int(cursor.fetchone()[0])
    rand = int(random.randrange(1, (sum + 1)))


    pointer = int(0) 
    championId = None
    for row in champions:
        pointer += row[1]
        if pointer >= rand:
            print(f"Total weight: {sum}, random number: {rand}")
            print(f"pointer {pointer} found: id {row[0]}, weight: {row[1]}")
            championId = int(row[0])
            break


    # TODO: Clean this up, separate into more readable functions, try/catch, etc
    if championId is not None:
        # Insert selected daily champion
        cursor.execute(f"INSERT INTO classic_daily (champion_id) VALUES ({championId})")
        conn.commit()

        # Reset selected champion's weight
        cursor.execute(f"UPDATE champions SET weight = 1 WHERE id = {championId}")
        conn.commit()

        # Increment all other champion's weight
        cursor.execute(f"UPDATE champions SET weight = weight + 1 where id != {championId}")
        conn.commit()

    cursor.close()
    conn.close()

main()
