.PHONY: jekyll-clean clean jekyll-preview preview jekyll-rebuild rebuild setup-macos setup-windows

# Clean out Jekyll caches and generated files.
jekyll-clean:
	bundle exec jekyll clean
	rm -rf .jekyll-cache .sass-cache _site .bundle

# Shorthand alias for cleaning.
clean: jekyll-clean

# Local dev server with live reload + faster incremental rebuilds.
jekyll-preview:
	bundle exec jekyll serve --livereload --incremental --host 127.0.0.1 --port 4000

# Shorthand alias for preview.
preview: jekyll-preview

# Full clean + fresh server (no incremental build).
jekyll-rebuild: jekyll-clean
	bundle exec jekyll serve --livereload --host 127.0.0.1 --port 4000

# Shorthand alias for rebuild.
rebuild: jekyll-rebuild

# One-command setup for macOS (installs Ruby/Jekyll + project gems).
setup-macos:
	@bash scripts/setup-macos.sh

# One-command setup for Windows (PowerShell script).
setup-windows:
	@echo "Run this in PowerShell:"
	@echo "  powershell -ExecutionPolicy Bypass -File scripts\\setup-windows.ps1"
