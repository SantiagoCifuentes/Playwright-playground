# Playwright Playground

Playwright + TypeScript playground for:
- UI E2E tests using the Page Object Model (POM)
- API tests (GET, POST, PUT, PATCH, DELETE, auth, mocking)
- Multi-browser execution (Chromium, Firefox, WebKit)
- Test reports with HTML, Allure, and JUnit

The project is designed as a **learning and experimentation space for QA automation practices** including UI testing, API validation, and pipeline execution.

## Stack

- Playwright Test
- TypeScript (strict mode)
- Faker (dynamic test data)
- Allure Playwright reporter

## Project Structure

```text
src/
	fixtures/      # custom Playwright fixtures
	pages/         # page objects (Home, Login, Register, Cart)
	interface/     # request/response typings
	utils/         # helper utilities for API payloads

tests/
	sauce_demo_tests/      # UI tests against Shopify demo page
	api_requests_tests/    # API test scenarios

test-data/
	users.json             # user test data for UI tests
	api-requests/          # static/dynamic API payload templates
```

## Architecture Diagram

flowchart TB

Tests[UI & API Tests]

Framework[Playwright Framework\nFixtures • Page Objects • API Utils]

Targets[Application Under Test\nSauce Demo / Dummy APIs]

Reports[Test Reports\nHTML • Allure • JUnit]

Tests --> Framework
Framework --> Targets
Tests --> Reports

## Prerequisites

- Node.js 20+
- npm

## Installation

```bash
npm ci
npx playwright install --with-deps
```

## Environment Variables

Create/update `.env` in the project root:

```dotenv
TEST_EXECUTION_ENV=qa
HOME_URL=https://sauce-demo.myshopify.com/
```

## Running Tests

Run all tests:

```bash
npx playwright test
```

Run only API tests:

```bash
npx playwright test tests/api_requests_tests
```

Run only UI tests:

```bash
npx playwright test tests/sauce_demo_tests
```

Run by tag (example):

```bash
npx playwright test --grep @unique-ids
```

Run auth API tests (matches CI pattern):

```bash
npx playwright test --grep authAPI
```

## Reports

Configured in `playwright.config.ts`:
- Line reporter (console)
- HTML reporter (`playwright-report/`)
- Allure reporter (`allure-results/`)
- JUnit XML (`test-results/results.xml`)

Open HTML report:

```bash
npx playwright show-report
```

## CI/CD Pipelines

This project includes multiple CI/CD definitions:

- Azure DevOps: `azure-devops-pipeline.yml`
- GitHub Actions (auto): `.github/workflows/playwright_auto.yml`
- GitHub Actions (manual): `.github/workflows/playwright_manual.yml`
- Jenkins Declarative Pipeline: `Jenkinsfile`

### Jenkins (`Jenkinsfile`)

- Declarative pipeline with `agent any` and Node tool `NODEJS`
- Parameter: `AUTHAPI` (boolean). When true, tests run with `--grep @authAPI`
- Windows-oriented execution (`bat` commands)
- Test command:
	- Default: `npx playwright test --project=chromium --project=firefox`
	- With parameter: adds `--grep @authAPI`
- Stages:
	1. Checkout
	2. Install dependencies (`npm ci`)
	3. Install Playwright browsers (`npx playwright install`)
	4. Run tests
- Post actions:
	- Archive `playwright-report/**/*`
	- Publish JUnit from `test-results/results.xml`
	- Publish HTML report (`playwright-report/index.html`)
	- Publish Allure results from `allure-results`

### GitHub Actions Auto (`.github/workflows/playwright_auto.yml`)

- Triggers: `push` and `pull_request` on `main` and `master`
- Runner: `ubuntu-latest`
- Timeout: 60 minutes
- Steps:
	1. Checkout
	2. Setup Node (`lts/*`)
	3. `npm ci`
	4. `npx playwright install --with-deps`
	5. Run tests with `npx playwright test --grep-invert @unique-ids`
	6. Upload `playwright-report/` artifact (retention 30 days)

### GitHub Actions Manual (`.github/workflows/playwright_manual.yml`)

- Triggers:
	- `workflow_dispatch` (manual)
	- `push` and `pull_request` on `main` and `master` (so it is not manual-only)
- Runner: `ubuntu-latest`
- Timeout: 60 minutes
- Steps:
	1. Checkout
	2. Setup Node (`lts/*`)
	3. `npm ci`
	4. `npx playwright install --with-deps`
	5. Run tests with `npx playwright test --grep @authAPI`
	6. Upload `playwright-report/` artifact (retention 30 days)

### Azure DevOps (`azure-devops-pipeline.yml`)

- Triggers: CI on `main` and PR validation targeting `main`
- Pool: `Default`
- Steps:
	1. Install Node 20.x (`NodeTool@0`)
	2. `npm ci`
	3. `npx playwright install --with-deps`
	4. Run tests with `npx playwright test --grep authAPI` and `CI=true`
	5. Publish JUnit results (`PublishTestResults@2`) from `test-results/results.xml`
	6. Publish `playwright-report` artifact (`PublishPipelineArtifact@1`)

### CI Notes

- Unified JUnit path across Playwright, Jenkins, and Azure DevOps: `test-results/results.xml`
- GitHub Actions workflows currently upload only `playwright-report/` artifacts (no JUnit/Allure publish steps)
- Test scope differs by pipeline:
	- Jenkins default: Chromium + Firefox
	- GitHub auto: excludes `@unique-ids`
	- GitHub manual and Azure: auth-focused runs (`authAPI`)
- PR validation is defined in Azure/GitHub YAML files; Jenkins PR builds depend on Jenkins job configuration (for example, Multibranch/webhook settings), not only on `Jenkinsfile`

## Notes

- Some tests intentionally document known behavior/limitations (for example, expected failures or mocked request constraints).
- API tests target public demo services (DummyJSON and JSONPlaceholder), so response behavior is subject to those services.
