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
    rand = int(random.randrange(sum, (sum + 1)))

    pointer = int(0) 
    for row in champions:
        pointer += row[1]
        if pointer >= rand:
            print(f"Total weight: {sum}, random number: {rand}")
            print(f"pointer {pointer} found: id {row[0]}, weight: {row[1]}")
            break

    cursor.close()
    conn.close()

main()
