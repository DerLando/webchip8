# use PowerShell instead of sh:
set shell := ["powershell.exe", "-c"]

# Build the current state for web
build:
	wasm-pack build

# Run the latest, built version locally
run:
	# There is a bug with webpack and newer versions of node...
	$Env:NODE_OPTIONS="--openssl-legacy-provider"
	start-process powershell -ArgumentList "-noexit", "-command cd www; npm run start"

test:
	wasm-pack test --chrome --headless