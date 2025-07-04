@echo off
setlocal enabledelayedexpansion

xcopy /Y app-config\local-application.properties target\

set JARFILE=

for %%F in (target\*.jar) do (
    set JARFILE=%%F
)

java -jar "!JARFILE!" --spring.config.location=file:./target/local-application.properties