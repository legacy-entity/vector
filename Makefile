
build: index.js
	@component-build --dev

component: component.json
	@component-install --dev

clean:
	rm -rf components

.PHONY: clean
