import sys
from hestia_earth.utils.table import pivot_csv
import csv
from io import StringIO

try:
    table = pivot_csv(sys.argv[1])

    # creating empty stream
    buffer = StringIO()

    # adding data to stream
    table.to_csv(buffer, index =False)

    # printing stream
    print(buffer.getvalue())

except Exception as e:
    print(str(e), file=sys.stderr)
    # print(str(e))
