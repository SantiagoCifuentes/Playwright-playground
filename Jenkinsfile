pipeline {
    agent any

    parameters {
        booleanParam(name: 'AUTHAPI', defaultValue: false, description: 'Set to true to run only authAPI tests (@authAPI)')
    }

    options {
        // discard old builds, keep last 10
        buildDiscarder(logRotator(numToKeepStr: '10'))
        // add timestamps to console output
        timestamps()
        // overall pipeline timeout
        timeout(time: 30, unit: 'MINUTES')
    }

    tools {
        nodejs "NODEJS"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    def cmd = 'npx playwright test --project=chromium --project=firefox'
                    // Using only chromium and firefox.
                    // WebKit is unstable on Windows CI for now.

                    if (params.AUTHAPI) {
                        echo 'Running authAPI tests only'
                        cmd += ' --grep @authAPI'
                    }

                    bat cmd
                }
            }
        }
        

    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**/*', fingerprint: true
            junit 'test-results/results.xml'
           
            publishHTML([
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Report',
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true
            ])

             // Publish Allure (requires Allure Jenkins plugin + Allure configured in Jenkins Global Tools)
           allure([
                includeProperties: false,
                jdk: '',
                results: [[path: 'allure-results']]
                ])
            echo 'Pipeline finished.'
        }
        failure {
            echo 'Tests failed.'
        }
        success {
            echo 'All tests passed.'
        }
    }
}