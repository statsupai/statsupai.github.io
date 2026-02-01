#!/usr/bin/env bash
set -euo pipefail

# Friendly setup for macOS: installs Ruby + Jekyll + project gems.
# Safe to re-run; it skips steps that are already done.

# Homebrew is the package manager we use for installing Ruby tooling.
if ! command -v brew >/dev/null 2>&1; then
  echo "Homebrew is required. Install it first with:"
  echo "  /bin/bash -c \"$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\""
  exit 1
fi

# rbenv manages Ruby versions without touching the system Ruby.
if ! command -v rbenv >/dev/null 2>&1; then
  echo "Installing rbenv and ruby-build..."
  brew install rbenv ruby-build
fi

# This prints shell setup for rbenv; some shells require a restart.
echo "Initialize rbenv (restart your terminal after this step if prompted):"
if command -v rbenv >/dev/null 2>&1; then
  rbenv init || true
fi

# Project Ruby version (update here if we standardize on a new one).
RUBY_VERSION="3.3.4"
if ! rbenv versions --bare | grep -q "^${RUBY_VERSION}$"; then
  echo "Installing Ruby ${RUBY_VERSION}..."
  rbenv install "${RUBY_VERSION}"
fi

rbenv global "${RUBY_VERSION}"

# Jekyll builds the site; Bundler installs Ruby dependencies.
echo "Installing Jekyll and Bundler..."
if command -v gem >/dev/null 2>&1; then
  gem install jekyll bundler
else
  echo "Ruby gem command not found. Restart your terminal, then rerun this script."
  exit 1
fi

# Install Ruby dependencies listed in Gemfile.
echo "Installing project gems..."
bundle install

echo "Done. Start the preview with: make preview"