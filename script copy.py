import sys
from hestia_earth.utils.table import pivot_csv
import csv

with open('./tests/sample.csv', 'r') as file:
    reader = csv.reader(file)
    print(pivot_csv(file))
