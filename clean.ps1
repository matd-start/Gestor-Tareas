# Script para limpiar node_modules y dist/build
# Ejecuta en la raíz del proyecto

# Elimina node_modules y dist/build en backend y frontend
Remove-Item -Recurse -Force node_modules
Remove-Item -Recurse -Force client\node_modules
Remove-Item -Recurse -Force dist
Remove-Item -Recurse -Force build
Remove-Item -Recurse -Force client\dist
Remove-Item -Recurse -Force client\build

Write-Host "Carpetas node_modules, dist y build eliminadas."
