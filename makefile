# Makefile

# Define the Python virtual environment name
VENV_NAME =. imgtotxtenv

# Define the paths to the backend and frontend directories
BACKEND_DIR = backend
FRONTEND_DIR = frontend

setup-backend:
	python3 -m venv $(VENV_NAME)
	$(VENV_NAME)/bin/activate
	pip install -r $(BACKEND_DIR)/requirements.txt

run-backend:
	cd $(BACKEND_DIR) && \
	uvicorn main:app --reload
venv:
	$(VENV_NAME)/bin/activate


setup-frontend:
	cd $(FRONTEND_DIR) && bun install

run-frontend:
	cd $(FRONTEND_DIR) && bun start

run-all:
	setup-backend run-backend setup-frontend run-frontend
