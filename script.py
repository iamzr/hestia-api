import sys
from hestia_earth.utils.table import pivot_csv
import csv
from io import StringIO

with open('./tests/sample.csv', 'r') as file:
    table = pivot_csv(file)

    # creating empty stream
    buffer = StringIO()

    # adding data to stream
    table.to_csv(buffer, index =False)

    # printing stream
    print(buffer.getvalue())


