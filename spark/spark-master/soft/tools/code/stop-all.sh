#!/bin/bash
#----------------------stop elasticsearch---------------------
pnuke -h $PSSH_HOME/bin/hosts.txt java
pnuke -h $PSSH_HOME/bin/hosts.txt redis-server
pnuke -h $PSSH_HOME/bin/hosts.txt python
pnuke -h $PSSH_HOME/bin/hosts.txt node
