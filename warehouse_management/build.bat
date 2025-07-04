@echo off

set /p skipTests=Do you want to skip tests? (Y/N): 

if /I "%skipTests%"=="Y" (
    echo Skipping tests...
    mvn clean install -DskipTests
) else (
    echo Running tests...
    mvn clean install
)