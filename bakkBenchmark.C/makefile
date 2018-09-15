# File:		mrna
# Author:	Stefan Schweiger ( 1526709 )
# Date:  	05.01.2017

OUTFILE=benchmark
PROJFILES=*.c *.h makefile

CC=clang
CFLAGS=-std=c99 -pedantic -Wall -O3

SRC=src/*.c
 
all: $(OUTFILE)

$(OUTFILE):
	$(CC) $(SRC) $(CFLAGS) -o out/$(OUTFILE)

clean:
	rm -f *.o out/$(OUTFILE)
