#! /usr/bin/awk -f

BEGIN { NR=0; print "{" }

{ sub(/\r/,"\n"); printf "  \"%s\": \"%s\",\n", NR, $1;  }

END { printf "  \"MAX\": %s\n}", NR }
