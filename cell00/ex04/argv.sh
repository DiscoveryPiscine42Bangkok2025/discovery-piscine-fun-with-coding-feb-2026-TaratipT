#!/bin/bash

# Check if any arguments were provided
if [ $# -eq 0 ]; then
    echo "No arguments supplied"
else
    # Counter to track how many we have printed
    count=1
    for arg in "$@"; do
        # Exit the loop if we've already printed 3 arguments
        if [ $count -gt 3 ]; then
            break
        fi
        echo "$arg"
        ((count++))
    done
fi