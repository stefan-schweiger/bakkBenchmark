# File:		mrna
# Author:	Stefan Schweiger ( 1526709 )
# Date:  	05.01.2017

OUTFILE=out/index.html
PROJFILES=*.c *.h makefile

CC=emcc
CFLAGS=-s WASM=1 -s ALLOW_MEMORY_GROWTH=1 -Os

SRC=../bakkBenchmark.C/src/*.c
 
all: $(OUTFILE)

$(OUTFILE):
	$(CC) $(SRC) $(CFLAGS) -o $(OUTFILE)

clean:
	rm -f *.o $(OUTFILE)
