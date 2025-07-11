import os
import mysql.connector

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
    sum = cursor.fetchall()

    print(sum)
    for row in champions:
        print(f"id={row[0]}, weight={row[1]}")

    cursor.close()
    conn.close()

main()
