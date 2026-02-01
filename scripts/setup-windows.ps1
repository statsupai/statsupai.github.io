$ErrorActionPreference = "Stop"

# Friendly setup for Windows: installs Ruby + Jekyll + project gems.
# Safe to re-run; it skips steps that are already done.

# We use winget to install Ruby (no manual downloads).
if (-not (Get-Command winget -ErrorAction SilentlyContinue)) {
  Write-Host "winget is required. Install App Installer from Microsoft Store, then re-run." -ForegroundColor Yellow
  exit 1
}

# Ruby includes the `gem` command we need for Jekyll.
if (-not (Get-Command ruby -ErrorAction SilentlyContinue)) {
  Write-Host "Installing Ruby with DevKit via winget..."
  winget install RubyInstallerTeam.RubyWithDevKit
}

# Jekyll builds the site; Bundler installs Ruby dependencies.
Write-Host "Installing Jekyll and Bundler..."
& gem install jekyll bundler

# Install Ruby dependencies listed in Gemfile.
Write-Host "Installing project gems..."
& bundle install

Write-Host "Done. Start the preview with: bundle exec jekyll serve --livereload --host 127.0.0.1 --port 4000"