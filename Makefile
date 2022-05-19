.DEFAULT_GOAL := help

help: ## Shows help message.
	@printf "\033[1m%s\033[36m %s\033[32m %s\033[0m \n\n" "Development environment for" "VAI" "Integration";
	@awk 'BEGIN {FS = ":.*##";} /^[a-zA-Z_-]+:.*?##/ { printf " \033[36m make %-25s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST);
	@echo

init: requirements vioneta-agro-install## Install requirements
	pre-commit install-hooks --config .github/pre-commit-config.yaml;

requirements:
	sudo apt update && sudo apt install -y libxml2-dev libxslt-dev bash curl jq libpcap0.8
	python3 -m pip --disable-pip-version-check install -U "pip>=8.0.3,<20.3"
	python3 -m pip --disable-pip-version-check install -U setuptools wheel
	python3 -m pip --disable-pip-version-check install --ignore-installed -r requirements.txt
	@bash manage/install_frontend

start: ## Start the HA with the integration
	@bash manage/integration_start;

test: ## Run pytest
	@python3 -m pytest tests -rxf -x -v -l --cov=./ --cov-report=xml

lint: ## Run linters
	set -e
	isort .
	jq -r -e -c . tests/fixtures/*.json
	pre-commit install-hooks --config .github/pre-commit-config.yaml;
	pre-commit run --hook-stage manual --all-files --config .github/pre-commit-config.yaml;
	bellybutton lint
	vulture . --min-confidence 75 --ignore-names policy

coverage: ## Display coverage report
	@python3 -m pytest tests -rxf -x -v -l --cov=./ --cov-report=xml > /dev/null
	@coverage report --skip-covered

update: ## Pull main from hacs/integration
	git pull ;

bump-frontend: ## Bump the HACS frontend
	@bash manage/bump_frontend;

update-base-repositories: ## Update stored base repositories
	@python3 manage/update_default_repositories.py;

clear-storage:
	rm -rf config/.storage/vais
	rm config/.storage/vais*

vioneta-agro-install: ## Install the latest dev version of Home Assistant
	python3 -m pip --disable-pip-version-check install -U "pip>=8.0.3,<20.3";
	python3 -m pip --disable-pip-version-check install -U setuptools wheel;
	python3 -m pip --disable-pip-version-check \
		install --upgrade git+https://github.com/Vioneta/vioneta-core.git@dev;

vioneta-agro-install-old: ## Install the oldest version of Home Assistant
	python3 -m pip --disable-pip-version-check install -U "pip>=8.0.3,<20.3";
	python3 -m pip --disable-pip-version-check install -U setuptools wheel;
	python3 -m pip --disable-pip-version-check \
		install --upgrade git+https://github.com/Vioneta/vioneta-core.git@2022.4.6;

vioneta-agro-update: vioneta-install ## Alias for 'vioneta-agro-install'